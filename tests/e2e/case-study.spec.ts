import { expect, test } from '@playwright/test';

test('una tarjeta de la home lleva a su caso de estudio', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('heading', { level: 3, name: /^LaButxaka/ }).getByRole('link').click();

	await expect(page).toHaveURL(/\/proyectos\/labutxaka$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^LaButxaka/);
	await expect(page.getByRole('heading', { level: 2, name: 'Desarrollo' })).toBeVisible();
});

test('el enlace externo de la tarjeta no abre el caso', async ({ page }) => {
	await page.goto('/');
	const demo = page.getByRole('link', { name: 'Probar la demo' });
	await expect(demo).toHaveAttribute('href', 'https://labutxaka-demo.netlify.app/#resumen');
	// El clic de prueba falla si el enlace que cubre toda la tarjeta queda por encima
	await demo.click({ trial: true, timeout: 3_000 });
});

test('el caso muestra su ficha, su contenido y sus enlaces', async ({ page }) => {
	await page.goto('/proyectos/joan-pere-jove');
	const facts = page.getByRole('complementary', { name: 'Ficha del proyecto' });

	await expect(facts).toContainText('feb 2026 – jun 2026');
	await expect(facts).toContainText('Matrícula de Honor');
	await expect(facts.getByRole('link', { name: 'Ver la web publicada' })).toHaveAttribute(
		'href',
		'https://joanperejove.com/',
	);
	await expect(page.getByRole('table')).toContainText('Llegar a Filmografía');
	await expect(page.getByRole('heading', { level: 2, name: 'De Figma a producción' })).toBeVisible();
});

test('se puede pasar de un caso al siguiente', async ({ page }) => {
	await page.goto('/proyectos/joan-pere-jove');
	await page.getByRole('navigation', { name: 'Siguiente proyecto' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/proyectos\/labutxaka$/);

	await page.getByRole('navigation', { name: 'Siguiente proyecto' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/proyectos\/unpispas$/);

	await page.getByRole('navigation', { name: 'Siguiente proyecto' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/proyectos\/joan-pere-jove$/);
});

// En móvil el menú está plegado: lo abrimos antes de usar los enlaces
async function abrirNavegacion(page: import('@playwright/test').Page) {
	const boton = page.getByRole('button', { name: 'Menú' });
	if (await boton.isVisible()) await boton.click();
}

test('la navegación principal vuelve a la home desde un caso', async ({ page }) => {
	await page.goto('/proyectos/labutxaka');
	await abrirNavegacion(page);
	await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Experiencia' }).click();
	await expect(page).toHaveURL(/\/#experiencia$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Experiencia' })).toBeInViewport();
});

test('el enlace de contacto funciona dentro del caso', async ({ page }) => {
	await page.goto('/proyectos/labutxaka');
	await abrirNavegacion(page);
	await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Contacto' }).click();
	await expect(page).toHaveURL(/\/proyectos\/labutxaka#contacto$/);
	await expect(page.getByRole('link', { name: 'dibanezbal@gmail.com' })).toBeInViewport();
});

for (const draft of ['queer-as-book']) {
	test(`el borrador ${draft} no genera página`, async ({ request }) => {
		const response = await request.get(`/proyectos/${draft}`);
		expect(response.status()).toBe(404);
	});
}

for (const id of ['joan-pere-jove', 'labutxaka', 'unpispas']) {
	test(`${id} se mantiene igual visualmente`, async ({ page }) => {
		await page.goto(`/proyectos/${id}`);
		await page.evaluate(async () => {
			await document.fonts.ready;
			for (const image of document.images) {
				image.loading = 'eager';
				await image.decode();
			}
		});
		await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true, maxDiffPixelRatio: 0.01 });
	});
}

test('el índice del caso lleva a su apartado y funciona en móvil', async ({ page }) => {
	await page.goto('/proyectos/joan-pere-jove');
	const isPhone = page.viewportSize()!.width < 1024;
	const nav = page.getByRole('navigation', { name: 'Apartados del caso' });
	if (isPhone) {
		const summary = nav.locator('summary');
		await summary.focus();
		await page.keyboard.press('Enter');
	}
	const link = nav.getByRole('link').nth(1);
	await link.click();
	await expect(page).toHaveURL(/#.+$/);
	await expect(page.getByRole('heading', { level: 2 }).nth(1)).toBeInViewport();
	if (isPhone) {
		await expect(nav.locator('details')).not.toHaveAttribute('open', '');
	} else {
		await expect(link).toHaveAttribute('aria-current', 'true');
	}
});

test('en móvil el caso empieza pronto: una captura y la ficha plegada', async ({ page }) => {
	await page.goto('/proyectos/joan-pere-jove');
	test.skip(page.viewportSize()!.width >= 640, 'Solo por debajo de 640 px');
	await expect(page.locator('main figure:visible img').first()).toHaveAttribute('alt', /móvil/i);
	await expect(page.locator('dt:visible', { hasText: 'Mi papel' })).toHaveCount(1);
	await expect(page.locator('dt:visible', { hasText: 'Herramientas' })).toHaveCount(0);
	const top = await page.getByRole('heading', { level: 2 }).first().evaluate((h) => h.getBoundingClientRect().top + scrollY);
	// Con la barra de métricas (hasta 4 cifras y su nota) el primer apartado queda más abajo; sin ellas, por debajo de 1400
	expect(top).toBeLessThan(1700);
});

test('el índice marca cada apartado al hacer scroll, también los que llevan acentos', async ({ page }) => {
	await page.goto('/proyectos/joan-pere-jove');
	test.skip(page.viewportSize()!.width < 1024, 'El índice lateral solo se ve en escritorio');
	const headings = page.locator('.case-prose h2[id]');
	for (const heading of await headings.all()) {
		const id = await heading.getAttribute('id');
		await heading.evaluate((h) => window.scrollTo({ top: h.getBoundingClientRect().top + scrollY - 150, behavior: 'instant' }));
		await expect(page.locator(`[data-indice] a[aria-current="true"]:visible`)).toHaveAttribute('href', `#${id}`);
	}
});
