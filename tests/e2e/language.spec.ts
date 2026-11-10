import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Español y demás lenguas de España: español. Cualquier otro idioma: inglés.
for (const locale of ['es-ES', 'es-MX', 'ca-ES', 'gl-ES', 'eu-ES']) {
	test.describe(`Navegador en ${locale}`, () => {
		test.use({ locale });

		test('la raíz se queda en español', async ({ page }) => {
			await page.goto('/');
			await expect(page.locator('html')).toHaveAttribute('lang', 'es');
			expect(new URL(page.url()).pathname).toBe('/');
		});

		test('una URL en inglés pasa a su equivalente en español', async ({ page }) => {
			await page.goto('/en/projects/labutxaka');
			await expect(page).toHaveURL(/\/proyectos\/labutxaka\/?$/);
			await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		});
	});
}

for (const locale of ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP']) {
	test.describe(`Browser in ${locale}`, () => {
		test.use({ locale });

		test('the root moves to English', async ({ page }) => {
			await page.goto('/');
			await expect(page).toHaveURL(/\/en\/$/);
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		});
	});
}

test.describe('Equivalent pages', () => {
	test.use({ locale: 'en-US' });

	for (const [from, to] of [
		['/proyectos/unpispas', /\/en\/projects\/unpispas\/?$/],
		['/sobre-mi', /\/en\/about\/?$/],
		['/#experiencia', /\/en\/#experience$/],
	] as const) {
		test(`${from} goes to its English page`, async ({ page }) => {
			await page.goto(from);
			await expect(page).toHaveURL(to);
		});
	}

	test('a missing page shows the English 404', async ({ page }) => {
		await page.goto('/no-existe');
		await expect(page).toHaveURL(/\/en\/404/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(/This page doesn.t exist/);
	});

	test('without JavaScript each URL keeps its language', async ({ browser }) => {
		const context = await browser.newContext({ locale: 'en-US', javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		expect(new URL(page.url()).pathname).toBe('/');
		await context.close();
	});
});

test('una página inexistente muestra la 404 en español', async ({ page }) => {
	const response = await page.goto('/no-existe');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página no existe.');
});

test.describe('Selector de idioma', () => {
	test('lleva a la misma página en inglés y la elección manda sobre el navegador', async ({ page }) => {
		await page.goto('/proyectos/labutxaka');
		await page.getByRole('link', { name: 'EN, versión en inglés' }).click();
		await expect(page).toHaveURL(/\/en\/projects\/labutxaka\/?$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');

		// Navegador en español, pero la elección guardada es inglés
		await page.goto('/');
		await expect(page).toHaveURL(/\/en\/$/);

		await page.getByRole('link', { name: 'ES, Spanish version' }).click();
		expect(new URL(page.url()).pathname).toBe('/');
		await page.goto('/en/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	});

	test('se usa con el teclado y declara el idioma de destino', async ({ page }) => {
		await page.goto('/');
		const selector = page.getByRole('link', { name: 'EN, versión en inglés' });
		await expect(selector).toHaveAttribute('hreflang', 'en');
		await expect(selector).toHaveAttribute('lang', 'en');
		await selector.focus();
		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/\/en\/$/);
	});
});

test.describe('Accesibilidad del 404 y del menú en inglés', () => {
	test.use({ locale: 'en-US' });

	test('the English 404 has no axe violations', async ({ page }) => {
		await page.goto('/en/404');
		const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
		expect(violations.map(({ id }) => id)).toEqual([]);
	});

	test('the open mobile menu has no axe violations', async ({ page }) => {
		await page.goto('/en/');
		const button = page.getByRole('button', { name: 'Menu' });
		test.skip(!(await button.isVisible()), 'Solo en móvil');
		await button.click();
		await page.waitForFunction(() => {
			// Las animaciones ligadas al scroll nunca "terminan" mientras no se sale de su rango: se llevan al final para medir el contraste con el contenido ya visible
			for (const a of document.getAnimations()) if (a.timeline && !(a.timeline instanceof DocumentTimeline)) a.finish();
			return document.getAnimations().every((a) => a.playState === 'finished');
		});
		const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
		expect(violations.map(({ id }) => id)).toEqual([]);
	});

	test('the theme button speaks English', async ({ page }) => {
		await page.goto('/en/');
		const theme = page.locator('#cambiar-tema');
		const label = await theme.getAttribute('aria-label');
		expect(label).toMatch(/^(Dark|Light) mode$/);
		await theme.click();
		expect(await theme.getAttribute('aria-label')).toMatch(/^(Dark|Light) mode$/);
		expect(await theme.getAttribute('aria-label')).not.toBe(label);
	});
});
