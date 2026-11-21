import { expect, test } from '@playwright/test';

test.describe('entrada de la portada', () => {
	test.use({ reducedMotion: 'no-preference' });

	test('cada carga de la portada monta el wireframe y después deja todo usable', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'run');
		// El contenido real está en el DOM desde el principio
		await expect(page.getByRole('heading', { level: 1 })).toContainText('interfaces');
		// Al terminar, ninguna animación temporal sigue en marcha (las ligadas al scroll no terminan) y el botón se puede pulsar
		await page.waitForFunction(() => document.getAnimations().filter((a) => a.timeline instanceof DocumentTimeline).every((a) => a.playState === 'finished'), null, { timeout: 8000 });
		await page.getByRole('link', { name: 'Ver proyectos' }).click();
		await expect(page).toHaveURL(/#proyectos$/);
	});

	test('se repite al volver a la portada desde un proyecto', async ({ page }) => {
		await page.goto('/proyectos/unpispas');
		await expect(page.locator('html')).not.toHaveAttribute('data-wf', 'run');
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'run');
	});

	test('la segunda vez en menos de una semana es la versión corta', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).not.toHaveAttribute('data-wf-short', '');
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'run');
		await expect(page.locator('html')).toHaveAttribute('data-wf-short', '');
	});

	test('al terminar el hero no se anima otra vez', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'done', { timeout: 8000 });
		const running = await page.evaluate(() =>
			[...document.querySelectorAll('main section:first-of-type *')].flatMap((e) => e.getAnimations({ subtree: false })).filter((a) => a.playState === 'running').length,
		);
		expect(running).toBe(0);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('un gesto la salta al instante', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'run');
		await page.mouse.click(10, 300);
		await expect(page.locator('html')).toHaveAttribute('data-wf', 'done');
	});
});

test('con movimiento reducido no hay entrada animada', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('html')).not.toHaveAttribute('data-wf', 'run');
});
