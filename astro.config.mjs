// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Al desplegar, añade `site` con la URL final: activa la URL canónica y la imagen OpenGraph
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Plus Jakarta Sans',
			cssVariable: '--font-jakarta',
			weights: [400, 500, 700, 800],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
