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

test('los botones del hero llevan a sus secciones', async ({ page }) => {
	await page.getByRole('link', { name: 'Ver proyectos' }).click();
	await expect(page).toHaveURL(/#proyectos$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Proyectos' })).toBeInViewport();

	await page.getByRole('link', { name: 'Hablemos' }).click();
	await expect(page).toHaveURL(/#contacto$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Contacto' })).toBeInViewport();
});

test('muestra los proyectos publicados y oculta los borradores', async ({ page }) => {
	const titles = page.getByRole('heading', { level: 3 }).filter({ hasText: ':' });
	await expect(titles).toHaveText([/^Joan Pere Jové/, /^LaButxaka/]);
	await expect(page.getByText('Queer as Book')).toHaveCount(0);
	await expect(page.getByText('unPisPas')).toHaveCount(0);
});

test('las portadas cargan y tienen texto alternativo', async ({ page }) => {
	const covers = page.locator('article img');
	await expect(covers).toHaveCount(2);
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
	await expect(jobs.first()).toHaveAttribute('open', '');

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
