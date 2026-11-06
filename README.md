# david-ibanez-portfolio

Portfolio personal de David Ibáñez, hecho con [Astro](https://astro.build) y Tailwind CSS. Contenido en colecciones de Astro (`src/content`, `src/data`), casos de estudio en Markdown y pruebas con Playwright y axe.

## Comandos

```sh
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo en localhost:4321
npm run build        # generar la web en dist/
npm run test:e2e     # pruebas de navegación, accesibilidad y regresión visual
npm run test:links   # comprobación de enlaces externos
```

Las capturas de referencia de la regresión visual se generan en macOS; en otros sistemas, usa `--grep-invert "se mantiene igual visualmente"`.

## Despliegue

Al subir cambios a `main`, GitHub Actions ejecuta las pruebas, compila la web y la publica en GitHub Pages en [davidib.com](https://davidib.com).
