---
title: "unPisPas"
client: "unPisPas · Cloud POS and QR ordering for hospitality"
summary: "Frontend for the unPisPas website, a cloud POS and QR ordering system for bars and restaurants, built from a Figma file. The design was sent by the client."
disciplines: ["code"]
context: "freelance"
startDate: 2026-01-01
endDate: 2026-05-31
role:
  - "Frontend development"
tools: ["Figma", "HTML", "CSS", "JavaScript", "JSON"]
tags: ["Frontend", "Figma to Code", "Accessibility", "Responsive", "Components", "Multilingual"]
hook: "The marketing website for a cloud POS, built from the Figma file the client sent."
detail: "Frontend only, in plain HTML, CSS and JavaScript, in contact with the client and the designer."
cover:
  src: "../../assets/projects/unpispas/web-escritorio.webp"
  alt: "Desktop screenshot of the unPisPas website."
  label: "Desktop, client's website"
mobile:
  src: "../../assets/projects/unpispas/web-movil.webp"
  alt: "Mobile screenshot of the unPisPas website."
links:
  - label: "See the live site"
    url: "https://www.unpispas.es/en/"
    kind: "live"
  - label: "Demo shared with the client"
    url: "https://unpispas-test.netlify.app/"
    kind: "prototype"
order: 3
---

## In short

unPisPas is a cloud POS and QR ordering system for bars, cafés and restaurants. My part was building the frontend of its website from a finished Figma design. **The design was sent by the client.**

## What I did

I built the website in plain HTML, CSS and JavaScript: responsive, with reusable components, dropdown navigation and a language selector.

I left the website ready for six languages, with each one's content injected from JSON. I also prepared a scaffold: when you run it, it generates a new language with the same pages and imports its content from JSON, so adding languages doesn't require rebuilding the layout.

During development, from January to May 2026, I was in contact with the client and the designer. The main changes I asked design for were about accessibility. In everything else I stuck to what was in Figma.

For example, the yellow text on the highlighted button didn't pass contrast on the white background: it came to 1.53:1. I talked to the designer about the accessibility problem: she suggested changing the text to black, and the client confirmed it.

<figure class="figure-stack">

![Row of circular buttons from the Figma design, with the TPV en la nube (cloud POS) button marked in yellow and its text also in yellow on a white background.](../../assets/projects/unpispas/botones-diseno.webp)

![Contrast checker with yellow FFCA0A on white FFFFFF: a ratio of 1.53 to 1, which fails WCAG AA and AAA for normal and large text.](../../assets/projects/unpispas/contraste-amarillo.webp)

<figcaption>The highlighted button in the design and its contrast check: 1.53:1, short of WCAG AA.</figcaption>

</figure>

## Where my work ended

My part ended with sending the repository, the test URL, a full accessibility audit and the documentation for modifying and running the scaffold. The client published the website in October 2026.
