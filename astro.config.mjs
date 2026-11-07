// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Activa la URL canónica y la imagen OpenGraph
	site: 'https://davidib.com',
	// Español en la raíz e inglés bajo /en/
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: { prefixDefaultLocale: false },
	},
	// Los pares de idiomas ya se declaran con hreflang en cada página
	integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Schibsted Grotesk',
			cssVariable: '--font-schibsted',
			weights: [400, 500, 600, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
