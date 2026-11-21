import { expect, test } from '@playwright/test';

test.describe('entrada de la portada', () => {
	test.use({ reducedMotion: 'no-preference' });

	test('la primera visita de la sesión monta el wireframe y después deja todo usable', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('data-wf', '');
		// El contenido real está en el DOM desde el principio
		await expect(page.getByRole('heading', { level: 1 })).toContainText('interfaces');
		// Al terminar, ninguna animación temporal sigue en marcha (las ligadas al scroll no terminan) y el botón se puede pulsar
		await page.waitForFunction(() => document.getAnimations().filter((a) => a.timeline instanceof DocumentTimeline).every((a) => a.playState === 'finished'), null, { timeout: 8000 });
		await page.getByRole('link', { name: 'Ver proyectos' }).click();
		await expect(page).toHaveURL(/#proyectos$/);
	});

	test('en la misma sesión no se repite', async ({ page }) => {
		await page.goto('/');
		await page.goto('/');
		await expect(page.locator('html')).not.toHaveAttribute('data-wf', '');
	});
});

test('con movimiento reducido no hay entrada animada', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('html')).not.toHaveAttribute('data-wf', '');
});
