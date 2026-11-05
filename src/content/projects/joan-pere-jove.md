---
title: "Joan Pere Jové: de plantilla de WordPress a marca personal"
client: "Joan Pere Jové, compositor y director de cine"
summary: "Identidad visual completa y web bilingüe para un compositor que quería dar el salto de la afición a lo profesional. Del logotipo al tema de WordPress a medida, pasando por un test con usuarios."
disciplines: ["design", "code"]
context: "academic"
startDate: 2026-02-01
endDate: 2026-06-30
recognition: "Trabajo de Fin de Grado (UOC) · Matrícula de Honor (9,3/10)"
role:
  - "Diseño de identidad visual"
  - "UX/UI"
  - "Prototipado"
  - "Test con usuarios"
  - "Desarrollo del tema de WordPress"
tools: ["Figma", "FigJam", "Maze", "InDesign", "WordPress", "Polylang", "PHP", "HTML", "CSS", "JavaScript", "ClickUp", "Claude"]
tags: ["Branding", "UX Research", "UI Design", "Design System", "Accesibilidad", "Multilingüe", "WordPress"]
problem: "Presencia digital dispersa, sin coherencia visual, en dos idiomas mezclados."
solution: "Un sistema gráfico escalable (logo, tipografía, color, UI kit) aplicado a web, redes y papelería."
outcome: "Web bilingüe catalán/inglés, publicada y en uso."
metrics:
  - value: "6/6"
    label: "participantes llegan al formulario de contacto"
  - value: "5/6"
    label: "participantes encuentran la biografía"
cover:
  src: "../../assets/projects/joan-pere-jove.png"
  alt: "Portada de la web de Joan Pere Jové: su nombre sobre una foto suya leyendo una partitura, en tonos azul verdoso."
links:
  - label: "Ver la web publicada"
    url: "https://joanperejove.com/"
    kind: "live"
  - label: "Manual de identidad"
    url: "https://www.behance.net/gallery/251970149/Manual-de-identidad-visual-de-compositor-de-musica"
    kind: "document"
featured: true
order: 1
---

## En resumen

Joan Pere lleva más de diez años componiendo y tres dirigiendo cortometrajes. Tenía web, redes y tarjeta de visita, pero cada pieza iba por su lado. Me pidió rediseñar la web y, al analizarlo todo, vi que el problema era otro: **no había una marca que lo uniera**.

Así que el proyecto creció: identidad visual, manual de marca, prototipo web testeado con usuarios y, finalmente, la web en producción con un tema de WordPress hecho a medida.

- **Problema:** presencia digital dispersa, sin coherencia visual, en dos idiomas mezclados.
- **Solución:** un sistema gráfico escalable (logo, tipografía, color, UI kit) aplicado a web, redes y papelería.
- **Resultado:** [joanperejove.com](https://joanperejove.com/), web bilingüe catalán/inglés, publicada y en uso.

---

## El punto de partida

La web era una plantilla de WordPress sin personalizar. El catalán y el inglés convivían en las mismas páginas, el menú no tenía una estructura clara y, en la portada, no quedaba claro quién era ni a qué se dedicaba. Las redes funcionaban como un catálogo sin estética común y la tarjeta de visita era, literalmente, un trozo de papel con su contacto.

Mi hipótesis era sencilla: si todo habla el mismo idioma visual, la percepción profesional mejora.

Trabajé con él como con cualquier cliente, con reuniones de revisión en cada fase y decisiones tomadas juntos. Me apoyé en **Design Thinking y codiseño**, porque al final quien tiene que sentirse identificado con la marca es él.

## Descubrir: qué hacen los demás y quién va a entrar

**Benchmarking.** Analicé ocho compositores y compositoras (de Barcelona y alrededores, con equilibrio de género, y Hans Zimmer como referencia internacional). Miré logotipo, paleta, tipografía y coherencia entre web y redes. La conclusión fue útil: casi todos usan la web como catálogo, pero muy pocos cuidan la consistencia visual. Ahí había hueco para diferenciarse.

**Dos personas, dos objetivos muy distintos:**

- **Paula, 37, productora audiovisual.** Busca compositor para un documental y quiere contactar rápido. Le frustran las webs desactualizadas.
- **Jorge, 26, estudiante de pedagogía musical.** Quiere descubrir música nueva desde el móvil, en el transporte. Le frustra no encontrar dónde darle al play.

Estas dos personas acabaron definiendo los dos flujos principales: contacto en desktop y escucha en mobile.

## Definir la identidad

**Moodboard.** Joan Pere lo tenía claro: nada de fondos oscuros ni de estética corporativa. Quería calma, Mediterráneo, azules, aguamarina, arena. Mi miedo era otro: que con esas palabras clave acabara pareciendo la web de un estudio de yoga o de un resort. Ese equilibrio guió muchas decisiones posteriores.

**Logotipo.** Al principio él no quería un isotipo con sus iniciales. Probé con figuras musicales hasta que juntando un **pentagrama y un vinilo** salió una J. Girándola 180º, aparecía la P. Le enseñé un boceto rápido, le encantó y a partir de ahí todo fluyó. Después vinieron las versiones horizontal, vertical y en negativo.

**Tipografía.** Livvic, a petición del cliente y alineada con el benchmarking (sans-serif). Es ligera, mezcla formas geométricas con matices humanistas y tiene muchos pesos, lo que me permitió construir jerarquía con una sola familia.

**Color, pensado como sistema.** Primario azul oceánico, secundario arena. Generé las variantes manteniendo tono y saturación y moviendo solo la luminosidad (0 / 50 / 100), lo que en la práctica es una escala de tokens. Evité el negro y el blanco puros: salen de los extremos del secundario. Los colores semánticos mantienen la saturación y cambian el tono.

**Accesibilidad desde el principio.** Validé las combinaciones con el contrast checker de WebAIM. El par primario/secundario pasaba AA y AAA en texto en negrita y gráficos, pero solo AA en texto regular. Lo dejé documentado como regla de uso: en texto normal, se sustituye por el blanco de la paleta.

## Arquitectura de la información

Hice inventario de la web existente y lo reorganicé con prioridades. Joan Pere quería posicionarse sobre todo como compositor de cine, así que separé el contenido en **Filmografía** y **Altres projectes**, cada uno con su página.

La portada tenía que responder a dos preguntas sin hacer scroll: *¿quién es?* y *¿qué hace?* Como dice Steve Krug, no leemos las páginas, las escaneamos.

Y los idiomas: catalán como principal, inglés como secundario, pero **cada uno en sus propias páginas**. Mejor para el usuario, mejor para el SEO y preparado para añadir más idiomas.

## Prototipar

Wireframes en Figma para validar los dos flujos (desktop y mobile) antes de meter nada de estilo. Retícula de 12 columnas en desktop y 4 en mobile, con gutter de 16px.

Luego el alta fidelidad, con un par de piezas que me parecen las más interesantes del proyecto:

- **Reproductor persistente** en la parte inferior de la pantalla, para unificar todos los audios y que puedas seguir navegando mientras escuchas.
- **Modal de proyecto** para ampliar información sin sacar al usuario de la página.
- **UI kit** con header, botones, tarjetas, formulario, modal, reproductor y footer, en versión desktop y mobile.

Las tarjetas de la filmografía fueron lo que más me costó. Pasaron por varias versiones porque son el centro del flujo: imagen, título, año y acción, todo visible antes de interactuar.

## Validar: IA con espíritu crítico y usuarios reales

**Análisis heurístico con Claude.** Conecté Figma con Claude y le pedí un análisis según las heurísticas de Nielsen. Me sirvió para ir rápido y detectar mejoras (filtros, paginación futura, iconos del footer), pero también **se equivocó**: vio una tipografía serif que no existía y señaló un "Dossier" que no estaba en el prototipo. La lección: la IA agiliza, pero hay que revisar cada conclusión. Lo complementé con un análisis propio basado en principios de la Gestalt.

**Test con usuarios en Maze.** Seis participantes: una diseñadora UX/UI senior, un productor audiovisual, tres personas con perfiles distintos y el propio cliente. Cuatro tareas basadas en el flujo de Paula:

| Tarea | Resultado |
| --- | --- |
| Llegar a Filmografía desde la portada | 5 de 6 sin dificultad, 1 neutral |
| Reproducir una pista | Problema detectado: Maze no renderizaba bien el reproductor |
| Encontrar la biografía | 5 de 6 con éxito |
| Contactar | 6 de 6 llegan al formulario |

Lo más valioso fue el feedback cualitativo: hacer más visible el botón de contacto, cambiar la foto de la biografía y, sobre todo, que **alguien buscó el selector de idioma en el header**. En la web publicada, el selector está justo ahí.

## Más allá de la web

Para demostrar que el sistema escala, lo apliqué a otras piezas: tarjeta de visita física con un QR que lleva a una **tarjeta virtual**, personalización de Instagram y una cabecera animada para YouTube. Todo recogido en el manual de identidad.

## De Figma a producción

Joan Pere ya sabía usar WordPress y quería seguir publicando él solo. Así que, en lugar de cambiarle de herramienta, desarrollé un **tema de WordPress a medida** a partir del prototipo, con la web bilingüe gestionada con Polylang y el selector de idioma en la cabecera, tal y como pedía el test.

Para mí esta es la parte que mejor resume lo que hago: diseñar pensando en cómo se va a construir y construir respetando lo que se ha diseñado.

## Lo que aprendí (y lo que haría distinto)

- **El encargo no siempre es el problema.** Me pidieron una web y lo que hacía falta era una marca.
- **Un buen sistema de color es un sistema de tokens.** Definir la paleta por luminosidad me facilitó mucho el paso a CSS.
- **La IA es una buena compañera de revisión, no un juez.** Útil para ir rápido, peligrosa si no la contrastas.
- **Mi UI kit no estaba listo para un handoff.** Quedó como un cajón desastre y le faltaban los estados del formulario. Hoy lo organizaría como una librería de componentes con variantes y estados desde el primer día.
- **Separar lo personal de lo profesional.** Joan Pere es también mi pareja, así que tuve que aprender cuándo estaba diseñando y cuándo estaba conviviendo. Ver al cliente contento con el resultado fue la mejor parte.
