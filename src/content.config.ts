import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string() });

// Solo http/https: z.url() a secas acepta "TODO: ..." como URL válida
const projectLink = z.object({
	label: z.string(),
	url: z.url({ protocol: /^https?$/ }),
	kind: z.enum(['live', 'repo', 'prototype', 'document', 'video']),
});

const metric = z.object({
	value: z.string(), // "65 %", "+15", "6/6"
	label: z.string(),
});

// Casos de estudio del portfolio
const projects = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			client: z.string(),
			summary: z.string().max(240),
			// Qué partes del perfil demuestra
			disciplines: z.array(z.enum(['design', 'code', 'quality'])).min(1),
			context: z.enum(['professional', 'academic', 'personal']),
			startDate: z.coerce.date().optional(), // obligatoria al publicar
			endDate: z.coerce.date().optional(),
			recognition: z.string().optional(),
			role: z.array(z.string()).min(1),
			tools: z.array(z.string()),
			tags: z.array(z.string()),
			// Resumen para las tarjetas; la narrativa va en el cuerpo
			problem: z.string(),
			solution: z.string(),
			outcome: z.string(),
			metrics: z.array(metric).default([]),
			cover: z.object({ src: image(), alt: z.string() }).optional(),
			links: z.array(projectLink).default([]),
			featured: z.boolean().default(false),
			order: z.number(),
			draft: z.boolean().default(false),
		}).refine((project) => project.draft || project.startDate, {
			path: ['startDate'],
			message: 'Un proyecto publicado necesita startDate; si aún no la sabes, usa draft: true',
		}),
});

// Trayectoria profesional: una entrada por puesto
const experience = defineCollection({
	loader: file('./src/data/experience.yaml'),
	schema: z.object({
		role: z.string(),
		company: z.string(),
		via: z.string().optional(),
		location: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(), // sin fecha = actualidad
		// Si la fuente solo da años, no se muestra un mes inventado
		datePrecision: z.enum(['month', 'year']).default('month'),
		highlights: z.array(z.string()),
		metrics: z.array(metric).default([]),
		stack: z.array(z.string()).default([]),
	}),
});

// Textos generales: hero, sobre mí, habilidades, contacto
const site = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
	schema: z.object({
		title: z.string(),
		seo_title: z.string(),
		description: z.string().max(170),
		hero: z.object({
			eyebrow: z.string(),
			headline: z.string(),
			headline_accent: z.string(),
			intro: z.string(),
			cta_primary: link,
			cta_secondary: link,
		}),
		projects_intro: z.string(),
		skills: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
		tools: z.array(z.string()),
		contact: z.object({
			intro: z.string(),
			email: z.email(),
			linkedin: z.url({ protocol: /^https?$/ }),
			github: z.url({ protocol: /^https?$/ }),
		}),
	}),
});

export const collections = { projects, experience, site };
