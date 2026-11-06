import { defineConfig, devices } from '@playwright/test';

// Puerto propio para no chocar con `astro dev` ni probar por error un servidor de desarrollo
const PORT = 4322;

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: `http://127.0.0.1:${PORT}`,
		trace: 'retain-on-failure',
		// El idioma del navegador decide la versión de la web: por defecto se prueba la española
		locale: 'es-ES',
	},
	// Se prueba la salida de producción, no el servidor de desarrollo
	webServer: {
		// --ignore-lock: mantiene el servidor en primer plano para que Playwright lo cierre al acabar.
		// Sin él, Astro lo manda a segundo plano si detecta que lo lanza un agente de IA.
		command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT} --ignore-lock`,
		url: `http://127.0.0.1:${PORT}`,
		reuseExistingServer: false,
		timeout: 120_000,
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /links\.spec\.ts/ },
		{ name: 'mobile', use: { ...devices['Pixel 7'] }, testIgnore: /links\.spec\.ts/ },
		// Depende de webs externas: va aparte con `npm run test:links`
		{ name: 'links', testMatch: /links\.spec\.ts/ },
	],
});
