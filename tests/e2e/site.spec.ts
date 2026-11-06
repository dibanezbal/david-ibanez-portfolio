import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Añade aquí cada página nueva
const ROUTES = [
	{ route: '/', lang: 'es' },
	{ route: '/sobre-mi', lang: 'es' },
	{ route: '/proyectos/joan-pere-jove', lang: 'es' },
	{ route: '/proyectos/labutxaka', lang: 'es' },
	{ route: '/proyectos/unpispas', lang: 'es' },
	{ route: '/en/', lang: 'en' },
	{ route: '/en/about', lang: 'en' },
	{ route: '/en/projects/joan-pere-jove', lang: 'en' },
	{ route: '/en/projects/labutxaka', lang: 'en' },
	{ route: '/en/projects/unpispas', lang: 'en' },
];

for (const { route, lang } of ROUTES) {
	test.describe(`Página ${route}`, () => {
		test.use({ locale: lang === 'en' ? 'en-US' : 'es-ES' });

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

		test('declara su idioma', async ({ page }) => {
			await page.goto(route);
			await expect(page.locator('html')).toHaveAttribute('lang', lang);
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

		test('enlaza su versión en el otro idioma', async ({ page }) => {
			await page.goto(route);
			await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveCount(1);
			await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
			await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
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

test('tocar fuera cierra el menú móvil', async ({ page }) => {
	await page.goto('/');
	const button = page.locator('#abrir-menu');
	test.skip(!(await button.isVisible()), 'El menú desplegable solo existe en móvil');
	await button.click();
	await expect(button).toHaveAttribute('aria-expanded', 'true');
	await page.mouse.click(195, 700);
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(page.locator('#menu-principal')).toBeHidden();
});
