import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

const PROJECTS_DIR = join(process.cwd(), 'src/content/projects');

// Rechazan peticiones automáticas aunque el enlace funcione: revisar a mano
const BLOCKS_BOTS = new Set(['www.behance.net']);

const entries = readdirSync(PROJECTS_DIR)
	.filter((name) => /\.mdx?$/.test(name))
	.flatMap((name) => {
		const [, frontmatter = ''] = readFileSync(join(PROJECTS_DIR, name), 'utf8').split('---');
		return [...frontmatter.matchAll(/^\s*url:\s*"([^"]+)"/gm)].map((match) => ({ name, url: match[1] }));
	});

for (const { name, url } of entries) {
	test(`${name}: ${url}`, async ({ request }) => {
		test.skip(BLOCKS_BOTS.has(new URL(url).hostname), 'El sitio bloquea peticiones automáticas');
		const response = await request.get(url, { timeout: 20_000 });
		expect(response.status()).toBeLessThan(400);
	});
}
