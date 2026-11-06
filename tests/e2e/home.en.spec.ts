import { expect, test } from '@playwright/test';

test.use({ locale: 'en-US' });

test.beforeEach(async ({ page }) => {
	await page.goto('/en/');
});

test('the skip link is the first focus stop', async ({ page }) => {
	await page.keyboard.press('Tab');
	const skipLink = page.getByRole('link', { name: 'Skip to content' });
	await expect(skipLink).toBeFocused();
	await expect(skipLink).toBeVisible();
});

test('the hero portrait loads optimized and does not shift the page', async ({ page }) => {
	const portrait = page.getByRole('img', { name: /^Black-and-white portrait of David Ibáñez/ });
	await expect(portrait).toBeVisible();
	await expect(portrait).toHaveJSProperty('complete', true);
	await expect(portrait).toHaveAttribute('width', /\d+/);
	await expect(portrait).toHaveAttribute('height', /\d+/);
	await expect(portrait).toHaveAttribute('srcset', /\.webp/);
	await expect(portrait).not.toHaveAttribute('loading', 'lazy');
});

test('the headline comes before the portrait', async ({ page }) => {
	const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
	const portrait = await page.getByRole('img', { name: /portrait/ }).boundingBox();
	const isMobile = page.viewportSize()!.width < 1024;
	if (isMobile) expect(heading!.y + heading!.height).toBeLessThanOrEqual(portrait!.y);
	else expect(heading!.x + heading!.width).toBeLessThanOrEqual(portrait!.x);
});

test('the hero button goes to its section and the CV is the English one', async ({ page }) => {
	await page.getByRole('link', { name: 'See projects' }).click();
	await expect(page).toHaveURL(/#projects$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Projects' })).toBeInViewport();

	if (await page.locator('#abrir-menu').isVisible()) await page.locator('#abrir-menu').click();
	await expect(page.getByRole('link', { name: 'Download CV (PDF)' })).toHaveAttribute('href', '/cv/David-Ibanez-CV-EN.pdf');
});

test('the English CV is published and the footer links to it', async ({ page, request }) => {
	await expect(page.getByRole('link', { name: 'Download CV', exact: true })).toHaveAttribute('href', '/cv/David-Ibanez-CV-EN.pdf');
	const response = await request.get('/cv/David-Ibanez-CV-EN.pdf');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('pdf');
});

test('shows published projects and hides drafts', async ({ page }) => {
	const titles = page.locator('article').getByRole('heading', { level: 3 });
	await expect(titles).toHaveText([/^Joan Pere Jové/, /^LaButxaka/, /^unPisPas/]);
	await expect(page.getByText('Queer as Book')).toHaveCount(0);
});

test('covers load and have alt text', async ({ page }) => {
	const covers = page.locator('article img');
	// Cada tarjeta tiene las dos capturas; por debajo de 640 px solo se ve la móvil
	const phone = page.viewportSize()!.width < 640;
	await expect(covers).toHaveCount(6);
	await expect(page.locator('article img:visible')).toHaveCount(phone ? 3 : 6);
	for (const cover of await page.locator('article img:visible').all()) {
		await cover.scrollIntoViewIfNeeded();
		await expect(cover).toHaveAttribute('alt', /\S/);
		await expect(cover).toHaveJSProperty('complete', true);
		expect(await cover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
	}
});

test('each role opens with the keyboard', async ({ page }) => {
	const jobs = page.locator('details');
	await expect(jobs).toHaveCount(6);

	const second = jobs.nth(1);
	await expect(second).not.toHaveAttribute('open', '');
	await second.locator('summary').focus();
	await page.keyboard.press('Enter');
	await expect(second).toHaveAttribute('open', '');
	await expect(second.getByRole('listitem').first()).toBeVisible();
});

test('the home page has no TODO links', async ({ page }) => {
	await expect(page.locator('a[href*="TODO"]')).toHaveCount(0);
});

test('no Spanish interface text is left on the home page', async ({ page }) => {
	const text = await page.locator('body').innerText();
	for (const leftover of ['Proyectos', 'Experiencia', 'Contacto', 'Ver el caso', 'Escritorio', 'Móvil', 'Descargar', 'actualidad', 'Sobre mí', 'Lo que aporto']) {
		expect(text, leftover).not.toContain(leftover);
	}
});

test('se mantiene igual visualmente (en)', async ({ page }) => {
	await page.evaluate(async () => {
		await document.fonts.ready;
		for (const image of document.images) {
			image.loading = 'eager';
			await image.decode();
		}
	});
	await expect(page).toHaveScreenshot('home-en.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
});
