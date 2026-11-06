import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('el enlace para saltar al contenido es el primer foco', async ({ page }) => {
	await page.keyboard.press('Tab');
	const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
	await expect(skipLink).toBeFocused();
	await expect(skipLink).toBeVisible();
});

test('el retrato del hero carga optimizado y no hace saltar la página', async ({ page }) => {
	const portrait = page.getByRole('img', { name: /^Retrato en blanco y negro de David Ibáñez/ });
	await expect(portrait).toBeVisible();
	await expect(portrait).toHaveJSProperty('complete', true);
	await expect(portrait).toHaveAttribute('width', /\d+/);
	await expect(portrait).toHaveAttribute('height', /\d+/);
	await expect(portrait).toHaveAttribute('srcset', /\.webp/);
	await expect(portrait).not.toHaveAttribute('loading', 'lazy');
});

test('el titular aparece antes que el retrato', async ({ page }) => {
	const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
	const portrait = await page.getByRole('img', { name: /^Retrato/ }).boundingBox();
	const isMobile = page.viewportSize()!.width < 1024;
	if (isMobile) expect(heading!.y + heading!.height).toBeLessThanOrEqual(portrait!.y);
	else expect(heading!.x + heading!.width).toBeLessThanOrEqual(portrait!.x);
});

test('los botones del hero llevan a sus secciones', async ({ page }) => {
	await page.getByRole('link', { name: 'Ver proyectos' }).click();
	await expect(page).toHaveURL(/#proyectos$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Proyectos' })).toBeInViewport();

	await page.getByRole('link', { name: 'Hablemos' }).click();
	await expect(page).toHaveURL(/#contacto$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Contacto' })).toBeInViewport();
});

test('muestra los proyectos publicados y oculta los borradores', async ({ page }) => {
	const titles = page.locator('article').getByRole('heading', { level: 3 });
	await expect(titles).toHaveText([/^Joan Pere Jové/, /^LaButxaka/, /^unPisPas/]);
	await expect(page.getByText('Queer as Book')).toHaveCount(0);
});

test('las portadas cargan y tienen texto alternativo', async ({ page }) => {
	const covers = page.locator('article img');
	await expect(covers).toHaveCount(3);
	for (const cover of await covers.all()) {
		await cover.scrollIntoViewIfNeeded();
		await expect(cover).toHaveAttribute('alt', /\S/);
		await expect(cover).toHaveJSProperty('complete', true);
		expect(await cover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
	}
});

test('cada puesto se despliega con el teclado', async ({ page }) => {
	const jobs = page.locator('details');
	await expect(jobs).toHaveCount(6);

	const second = jobs.nth(1);
	await expect(second).not.toHaveAttribute('open', '');
	await second.locator('summary').focus();
	await page.keyboard.press('Enter');
	await expect(second).toHaveAttribute('open', '');
	await expect(second.getByRole('listitem').first()).toBeVisible();
});

test('la portada no se ha quedado con enlaces TODO', async ({ page }) => {
	await expect(page.locator('a[href*="TODO"]')).toHaveCount(0);
});

test('se mantiene igual visualmente', async ({ page }) => {
	await page.evaluate(async () => {
		await document.fonts.ready;
		for (const image of document.images) {
			image.loading = 'eager';
			await image.decode();
		}
	});
	await expect(page).toHaveScreenshot('home.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
});
