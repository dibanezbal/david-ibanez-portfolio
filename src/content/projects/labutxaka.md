---
title: "LaButxaka: tus finanzas, sin complicaciones"
client: "Proyecto propio · Aplicación interactiva (UOC)"
summary: "Aplicación web de finanzas personales diseñada y desarrollada de principio a fin: de los flujos en FigJam a una arquitectura MVC en PHP con base de datos relacional y componentes Shoelace personalizados."
disciplines: ["design", "code", "quality"]
context: "academic"
startDate: 2026-01-01
endDate: 2026-01-31
role:
  - "UX/UI"
  - "Prototipado"
  - "Desarrollo full-stack"
  - "Testing"
tools: ["Figma", "FigJam", "PHP", "SQL", "HTML", "CSS", "JavaScript", "Shoelace", "Git", "GitHub"]
tags: ["Web App", "Full-stack", "MVC", "Web Components", "Responsive", "UX Writing", "Onboarding"]
problem: "Las apps de finanzas suelen ser complejas o tener demasiadas funciones para quien solo quiere saber en qué se le va el dinero."
solution: "Una app enfocada en lo esencial (movimientos, cuentas, categorías, resumen), clara en desktop y en móvil."
outcome: "Aplicación funcional en producción, con vídeo demo y tutorial interactivo, que uso a diario para gestionar las finanzas de casa."
cover:
  src: "../../assets/projects/labutxaka.png"
  alt: "Pantalla Resumen de LaButxaka: saldos por cuenta, balance del mes, últimos movimientos y gastos por categoría."
links:
  - label: "Probar la demo"
    url: "https://labutxaka-demo.netlify.app/#resumen"
    kind: "live"
featured: true
order: 2
---

## En resumen

*Butxaca* es "bolsillo" en catalán. LaButxaka es una aplicación web para llevar tus finanzas personales de forma autónoma: añades, editas y eliminas movimientos, los organizas por cuentas y categorías, y ves un resumen de cómo vas.

La diseñé y la desarrollé yo de principio a fin, y es probablemente el proyecto donde más se ve el puente entre las dos partes: cada pantalla de Figma tiene detrás un controlador, un modelo y una tabla en la base de datos.

- **Problema:** las apps de finanzas suelen pecar de complejas o de tener demasiadas funciones para quien solo quiere saber en qué se le va el dinero.
- **Solución:** una app enfocada en lo esencial (movimientos, cuentas, categorías, resumen), clara en desktop y en móvil.
- **Resultado:** aplicación funcional en producción, con vídeo demo y tutorial interactivo para el usuario.

---

## Planteamiento

Antes de abrir Figma hice un **benchmarking** de otras apps de finanzas para ver qué patrones de interfaz e interacción funcionaban y cuáles sobraban. A partir de ahí monté un mapa conceptual, una planificación por fases y los **flujos de usuario** para las tres acciones clave: crear, editar y eliminar un movimiento.

Dibujar esos flujos al principio me ahorró mucho después: cada caja del diagrama acabó siendo, casi literalmente, una ruta o un método del controlador.

## Diseño

Creé un **user persona** y un **moodboard** para tener claro para quién diseñaba y qué atmósfera quería transmitir. Con eso definí la guía de estilos (tipografía, paleta y logotipo).

Después, lo de siempre y por buenas razones:

1. **Wireframes** en baja fidelidad para validar estructura y flujos sin distraerme con el estilo.
2. **Prototipo de alta fidelidad** en Figma con la guía de estilos aplicada y los flujos prototipados.

## Desarrollo

Aquí es donde el proyecto se pone interesante para mí.

**Stack:** PHP y SQL en el backend, HTML, CSS y JavaScript vanilla en el frontend, y componentes de **Shoelace** (web components) personalizados para que encajaran con la guía de estilos en lugar de parecer una librería genérica.

**Arquitectura MVC.** La elegí pensando en el futuro: añadir formularios para gestionar cuentas y categorías, filtros u ordenaciones tiene que ser sumar piezas, no reescribir. Separar modelo, vista y controlador me obligó también a pensar el diseño como un conjunto de componentes reutilizables.

El proceso, en orden:

- Esquema de la **base de datos relacional** (movimientos, categorías, cuentas y usuarios).
- MVC para los movimientos, que es el corazón de la app.
- Controladores y modelos para el resto de secciones.
- Maquetación desktop: páginas de **Movimientos** y **Resumen**.
- Maquetación mobile y adaptación responsive a tablet.
- **Testing:** pruebas en desarrollo y smoke test en producción.

Personalizar Shoelace fue una buena lección de design engineering: no basta con que el componente funcione, tiene que sentirse parte del mismo sistema que diseñaste en Figma. Ajustar sus variables y partes para respetar la paleta y la tipografía fue donde más se juntaron las dos mitades del proyecto.

## Cómo lo presenté al usuario

Una app no termina cuando funciona: alguien tiene que entender cómo usarla. Elegí dos formatos complementarios:

- **Un vídeo** cercano y visual, que enseña lo que hace la app sin entrar en tecnicismos.
- **Un tutorial interactivo** al que el usuario puede volver cuando tenga dudas mientras la usa.

El vídeo orienta; el tutorial acompaña a largo plazo.

## Lo que aprendí

- **Los flujos de usuario son documentación técnica.** Bien hechos, son medio camino hacia la arquitectura.
- **Una librería de componentes no es un design system.** Shoelace me dio la base accesible y funcional, pero la identidad la puse yo, adaptándolo a mis tokens.
- **Pensar en escalabilidad cambia cómo diseñas.** Saber que habría más formularios en el futuro me hizo diseñar patrones, no pantallas sueltas.
- **Siguientes pasos:** gestión de cuentas y categorías desde la propia interfaz, filtros y ordenación de movimientos.
