import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Añade aquí cada página nueva
const ROUTES = ['/', '/proyectos/joan-pere-jove', '/proyectos/labutxaka', '/proyectos/unpispas'];

for (const route of ROUTES) {
	test.describe(`Página ${route}`, () => {
		test('carga sin errores de consola ni recursos rotos', async ({ page, baseURL }) => {
			const problems: string[] = [];
			page.on('pageerror', (error) => problems.push(`JS: ${error.message}`));
			page.on('console', (message) => {
				if (message.type() === 'error') problems.push(`Consola: ${message.text()}`);
			});
			page.on('response', (response) => {
				if (response.url().startsWith(baseURL!) && response.status() >= 400) {
					problems.push(`${response.status()}: ${response.url()}`);
				}
			});

			const response = await page.goto(route, { waitUntil: 'networkidle' });

			expect(response?.status()).toBe(200);
			expect(problems).toEqual([]);
		});

		test('declara el español como idioma', async ({ page }) => {
			await page.goto(route);
			await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		});

		test('tiene título propio y metadescripción', async ({ page }) => {
			await page.goto(route);
			await expect(page).not.toHaveTitle(/Astro Basics/);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
		});

		test('tiene un único h1', async ({ page }) => {
			await page.goto(route);
			await expect(page.locator('h1')).toHaveCount(1);
		});

		test('no provoca scroll horizontal', async ({ page }) => {
			await page.goto(route);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
			);
			expect(overflow).toBeLessThanOrEqual(0);
		});

		test('sus enlaces internos responden', async ({ page, request, baseURL }) => {
			await page.goto(route);
			const hrefs = await page.locator('a[href]').evaluateAll((links) =>
				links.map((link) => (link as HTMLAnchorElement).href),
			);
			const internal = [...new Set(hrefs)]
				.filter((href) => href.startsWith(baseURL!))
				.map((href) => href.split('#')[0]);

			for (const href of new Set(internal)) {
				const response = await request.get(href);
				expect(response.status(), href).toBeLessThan(400);
			}
		});

		test('no tiene infracciones WCAG A/AA detectables con axe', async ({ page }) => {
			await page.goto(route);
			// El contraste se mide con el contenido ya visible: espera a que terminen las entradas
			await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished'));
			const { violations } = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
				.analyze();

			const summary = violations.map(({ id, impact, nodes }) => `${id} (${impact}): ${nodes.length}`);
			expect(summary).toEqual([]);
		});
	});
}
