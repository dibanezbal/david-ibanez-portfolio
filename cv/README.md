# CV en PDF

Fuentes de los dos CV (`cv-es.html`, `cv-en.html`) y de la tipografía (`fonts/`, Schibsted Grotesk).
Los PDF que se publican están en `public/cv/`.

Para regenerarlos:

```bash
node cv/render.mjs cv/cv-es.html /tmp/cv-es.pdf
node cv/render.mjs cv/cv-en.html /tmp/cv-en.pdf
# Autor y palabras clave (solo macOS; conserva etiquetas, idioma y enlaces)
swift cv/set-metadata.swift /tmp/cv-es.pdf public/cv/David-Ibanez-CV-ES.pdf "CV de David Ibáñez, Design Engineer" "Design Engineer, UX Engineer, UI Developer, Figma, WCAG, Playwright"
swift cv/set-metadata.swift /tmp/cv-en.pdf public/cv/David-Ibanez-CV-EN.pdf "David Ibáñez's CV, Design Engineer" "Design Engineer, UX Engineer, UI Developer, Figma, WCAG, Playwright"
```

Requisitos de ATS que se mantienen: una columna, texto real (sin imágenes), 2 páginas, fuentes incrustadas, PDF etiquetado con idioma y enlaces clicables.
