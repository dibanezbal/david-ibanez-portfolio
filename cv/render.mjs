// Genera un PDF a partir de un HTML del CV: node cv/render.mjs cv/cv-es.html salida.pdf
import { chromium } from '@playwright/test';
import path from 'node:path';
const [, , input, output] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.resolve(input));
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true });
await browser.close();
