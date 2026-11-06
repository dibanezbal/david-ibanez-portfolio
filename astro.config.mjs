// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Activa la URL canónica y la imagen OpenGraph
	site: 'https://davidib.com',
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
