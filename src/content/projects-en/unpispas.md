---
title: "unPisPas"
client: "unPisPas · Cloud POS and QR ordering for hospitality"
summary: "Frontend build of the unPisPas website from a Figma design by Julia Carrión: HTML, CSS and JavaScript, responsive, six languages and accessibility."
disciplines: ["code"]
context: "freelance"
startDate: 2026-01-01
endDate: 2026-03-31
role:
  - "Frontend development"
tools: ["Figma", "HTML", "CSS", "JavaScript", "JSON"]
tags: ["Frontend", "Figma to Code", "Accessibility", "Responsive", "Components", "Multilingual"]
hook: "Responsive build of a cloud POS marketing website, from a Figma design."
detail: "Frontend only, in plain HTML, CSS and JavaScript, in contact with the client and the designer."
cover:
  src: "../../assets/projects/unpispas/web-escritorio-en.webp"
  alt: "Desktop screenshot of the unPisPas website."
  label: "Desktop, client’s website"
mobile:
  src: "../../assets/projects/unpispas/web-movil-en.webp"
  alt: "Mobile screenshot of the unPisPas website."
links:
  - label: "See the live site"
    url: "https://www.unpispas.es/en/"
    kind: "live"
  - label: "Demo shared with the client"
    url: "https://unpispas-test.netlify.app/"
    kind: "prototype"
metrics:
  - value: "99 · 98"
    label: "Lighthouse performance, desktop · mobile"
  - value: "96"
    label: "Lighthouse accessibility, desktop and mobile"
  - value: "100"
    label: "Lighthouse best practices, desktop and mobile"
  - value: "100"
    label: "Lighthouse SEO, desktop and mobile"
metricsNote: "Chrome DevTools Lighthouse on the published site, measured on 11 November 2026. The score covers the whole site; my part is the frontend."
order: 3
---

## Summary

unPisPas is a cloud POS and QR ordering system for bars, cafés and restaurants. My part was the frontend: I built the website from a Figma file designed by <a href="https://www.trama22.com/" target="_blank" rel="noopener noreferrer">Julia Carrión</a>.

## What I did

I built the website in plain HTML, CSS and JavaScript: responsive, with reusable components, dropdown navigation and a language selector.

I left the website ready for six languages, with each one's content injected from JSON. I also prepared a scaffold: when you run it, it generates a new language with the same pages and imports its content from JSON, so adding languages doesn't require rebuilding the layout.

During development, from January to March 2026, I was in contact with the client and the designer. Most of what I asked the designer to change was about accessibility. Otherwise I stuck to the Figma design; the client asked for the home page copy changes.

<figure class="figure-pair">

![The unPisPas home page in Figma: dark header, a photo of a waiter with a tablet, a headline, a button reading Prueba 1 mes gratis and six circular icons below.](../../assets/projects/unpispas/figma-inicio.webp)

![The same home page on the live website, with a shorter headline, a button reading Pide una demo and the same six icons below.](../../assets/projects/unpispas/web-final-inicio.webp)

<figcaption>The home page in Figma and the same page on the live website, both in Spanish.</figcaption>

</figure>

For example, the yellow text on the highlighted button didn't pass contrast on the white background: it came to 1.53:1. I talked to the designer about the accessibility problem: she suggested changing the text to black, and the client confirmed it.

<figure class="figure-stack">

![Row of circular buttons from the Figma design, with the TPV en la nube (cloud POS) button marked in yellow and its text also in yellow on a white background.](../../assets/projects/unpispas/botones-diseno.webp)

![Contrast checker with yellow FFCA0A on white FFFFFF: a ratio of 1.53 to 1, which fails WCAG AA and AAA for normal and large text.](../../assets/projects/unpispas/contraste-amarillo.webp)

<figcaption>The highlighted button in the design and its contrast check: 1.53:1, short of WCAG AA.</figcaption>

</figure>

## Where my work ended

My part ended with sending the repository, the test URL, a full accessibility audit and the documentation for modifying and running the scaffold. The client published the website in October 2026.
