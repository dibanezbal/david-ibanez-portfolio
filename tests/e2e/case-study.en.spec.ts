import { expect, test } from '@playwright/test';

test.use({ locale: 'en-US' });

test('a home card leads to its case study', async ({ page }) => {
	await page.goto('/en/');
	await page.getByRole('heading', { level: 3, name: /^LaButxaka/ }).getByRole('link').click();

	await expect(page).toHaveURL(/\/en\/projects\/labutxaka$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^LaButxaka/);
	await expect(page.getByRole('heading', { level: 2, name: 'Development' })).toBeVisible();
});

test('the card external link does not open the case', async ({ page }) => {
	await page.goto('/en/');
	const demo = page.getByRole('link', { name: 'Try the demo' });
	await expect(demo).toHaveAttribute('href', 'https://labutxaka-demo.netlify.app/#resumen');
	await demo.click({ trial: true, timeout: 3_000 });
});

test('the case shows its details, content and links', async ({ page }) => {
	await page.goto('/en/projects/joan-pere-jove');
	const facts = page.getByRole('complementary', { name: 'Project details' });

	await expect(facts).toContainText('Feb 2026 – Jun 2026');
	await expect(facts).toContainText('Honors');
	await expect(facts.getByRole('link', { name: 'See the live site' })).toHaveAttribute('href', 'https://joanperejove.com/en/');
	await expect(page.getByRole('table')).toContainText('Get to Filmografia');
	await expect(page.getByRole('heading', { level: 2, name: 'From Figma to production' })).toBeVisible();
});

test('you can move from one case to the next', async ({ page }) => {
	await page.goto('/en/projects/joan-pere-jove');
	await page.getByRole('navigation', { name: 'Next project' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/en\/projects\/labutxaka$/);

	await page.getByRole('navigation', { name: 'Next project' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/en\/projects\/unpispas$/);

	await page.getByRole('navigation', { name: 'Next project' }).getByRole('link').click();
	await expect(page).toHaveURL(/\/en\/projects\/joan-pere-jove$/);
});

async function openNavigation(page: import('@playwright/test').Page) {
	const button = page.getByRole('button', { name: 'Menu' });
	if (await button.isVisible()) await button.click();
}

test('the main navigation goes back to the English home from a case', async ({ page }) => {
	await page.goto('/en/projects/labutxaka');
	await openNavigation(page);
	await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Experience' }).click();
	await expect(page).toHaveURL(/\/en\/#experience$/);
	await expect(page.getByRole('heading', { level: 2, name: 'Experience' })).toBeInViewport();
});

test('the contact link works inside the case', async ({ page }) => {
	await page.goto('/en/projects/labutxaka');
	await openNavigation(page);
	await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Contact' }).click();
	await expect(page).toHaveURL(/\/en\/projects\/labutxaka#contact$/);
	await expect(page.getByRole('link', { name: 'dibanezbal@gmail.com' })).toBeInViewport();
});

test('the About page has the full text and the portrait', async ({ page }) => {
	await page.goto('/en/');
	await page.getByRole('link', { name: 'Read more about me' }).click();
	await expect(page).toHaveURL(/\/en\/about$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('About me');
	await expect(page.getByText('Bilbao, 1990.')).toBeVisible();
	await expect(page.getByRole('img', { name: /^Portrait of David Ibáñez in profile/ })).toBeVisible();
});

test('the draft queer-as-book has no English page', async ({ request }) => {
	const response = await request.get('/en/projects/queer-as-book');
	expect(response.status()).toBe(404);
});

for (const id of ['joan-pere-jove', 'labutxaka', 'unpispas']) {
	test(`${id} se mantiene igual visualmente (en)`, async ({ page }) => {
		await page.goto(`/en/projects/${id}`);
		await page.evaluate(async () => {
			await document.fonts.ready;
			for (const image of document.images) {
				image.loading = 'eager';
				await image.decode();
			}
		});
		await expect(page).toHaveScreenshot(`${id}-en.png`, { fullPage: true, maxDiffPixelRatio: 0.01 });
	});
}
