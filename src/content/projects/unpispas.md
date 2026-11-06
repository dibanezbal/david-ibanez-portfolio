---
title: "unPisPas"
client: "unPisPas · TPV en la nube y pedidos por QR para hostelería"
summary: "Frontend de la web de unPisPas, un sistema de TPV en la nube y pedidos por QR para bares y restaurantes, montado a partir de un Figma. El diseño fue enviado por el cliente."
disciplines: ["code"]
context: "freelance"
startDate: 2026-01-01
endDate: 2026-05-31
role:
  - "Desarrollo frontend"
tools: ["Figma", "HTML", "CSS", "JavaScript", "JSON"]
tags: ["Frontend", "Figma to Code", "Accesibilidad", "Responsive", "Componentes", "Multilingüe"]
hook: "La web comercial de un TPV en la nube, montada a partir del Figma que envió el cliente."
detail: "Solo el frontend, en HTML, CSS y JavaScript puros, en contacto con el cliente y la diseñadora."
cover:
  src: "../../assets/projects/unpispas/web-escritorio.webp"
  alt: "Captura de escritorio de la web de unPisPas."
  label: "Escritorio, web del cliente"
mobile:
  src: "../../assets/projects/unpispas/web-movil.webp"
  alt: "Captura móvil de la web de unPisPas."
links:
  - label: "Ver la web publicada"
    url: "https://www.unpispas.es/es/"
    kind: "live"
  - label: "Demo compartida con el cliente"
    url: "https://unpispas-test.netlify.app/"
    kind: "prototype"
order: 3
---

## En resumen

unPisPas es un sistema de TPV en la nube y pedidos por QR para bares, cafeterías y restaurantes. Mi parte fue montar el frontend de su web a partir de un Figma ya diseñado. **El diseño fue enviado por el cliente.**

## Qué hice

Maqueté la web en HTML, CSS y JavaScript puros: responsive, con componentes reutilizables, navegación desplegable y selector de idioma.

Dejé la web preparada para seis idiomas, con el contenido de cada uno inyectado desde JSON. Además, preparé un scaffold: al ejecutarlo genera un idioma nuevo con las mismas páginas, importando su contenido desde JSON, así que añadir idiomas no requiere volver a maquetar.

Durante el desarrollo, de enero a mayo de 2026, estuve en contacto con el cliente y con la diseñadora. Los principales cambios que pedí a diseño fueron de accesibilidad. En todo lo demás respeté lo que estaba en Figma.

Por ejemplo, el texto amarillo del botón marcado no pasaba el contraste sobre el fondo blanco: daba 1,53:1. Hablé con la diseñadora sobre el problema de accesibilidad: sugirió cambiar el texto a negro, y el cliente lo confirmó.

<figure class="figure-stack">

![Fila de botones circulares del diseño en Figma, con el botón TPV en la nube marcado en amarillo y su texto también en amarillo sobre fondo blanco.](../../assets/projects/unpispas/botones-diseno.webp)

![Comprobador de contraste con el amarillo FFCA0A sobre blanco FFFFFF: ratio de 1,53 a 1, que no pasa WCAG AA ni AAA en texto normal ni grande.](../../assets/projects/unpispas/contraste-amarillo.webp)

<figcaption>El botón marcado en el diseño y su comprobación de contraste: 1,53:1, sin llegar a WCAG AA.</figcaption>

</figure>

## Hasta dónde llegó mi trabajo

Mi parte terminó con el envío del repositorio, la URL de test, una auditoría de accesibilidad completa y la documentación para modificar y ejecutar el scaffold. El cliente publicó la web en octubre de 2026.
