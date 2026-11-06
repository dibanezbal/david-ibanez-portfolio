// Textos de interfaz y rutas por idioma. El contenido largo vive en las colecciones de src/content y src/data.
export type Lang = 'es' | 'en';

export const getLang = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'es');

export const ui = {
	es: {
		htmlLocale: 'es_ES',
		skip: 'Saltar al contenido',
		navLabel: 'Principal',
		navProjects: 'Proyectos',
		navExperience: 'Experiencia',
		navContact: 'Contacto',
		cvDownload: 'Descargar CV',
		cvDownloadLabel: 'Descargar CV (PDF)',
		cvFile: '/cv/David-Ibanez-CV-ES.pdf',
		langLabel: 'EN, versión en inglés',
		langShort: 'EN',
		themeDark: 'Modo oscuro',
		themeLight: 'Modo claro',
		menu: 'Menú',
		logoHome: 'David Ibáñez, inicio',
		featured: 'Proyectos destacados',
		projects: 'Proyectos',
		bring: 'Lo que aporto',
		experience: 'Experiencia',
		about: 'Sobre mí',
		aboutMore: 'Leer más sobre mí',
		seeCase: 'Ver el caso',
		desktop: 'Escritorio',
		mobile: 'Móvil',
		allProjects: 'Todos los proyectos',
		client: 'Cliente',
		period: 'Periodo y tipo',
		scope: 'Alcance',
		recognition: 'Reconocimiento',
		myRole: 'Mi papel',
		tools: 'Herramientas',
		topics: 'Temas',
		factsLabel: 'Ficha del proyecto',
		sectionsLabel: 'Apartados del caso',
		inThisCase: 'En este caso',
		nextProject: 'Siguiente proyecto',
		aboutTitle: 'Sobre mí · David Ibáñez',
		aboutDescription: 'Quién soy y cómo llegué al diseño, la calidad y el código.',
		aboutBack: 'Volver a la portada',
		aboutAlt: 'Retrato de David Ibáñez de perfil, con gorra, gafas y chaqueta de cremallera, sonriendo.',
		notFoundTitle: 'Página no encontrada · David Ibáñez',
		notFoundDescription: 'Esta página no existe o se ha movido.',
		notFoundHeading: 'Esta página no existe.',
		notFoundBody: 'Puede que la dirección esté mal escrita o que la página se haya movido. Desde aquí puedes volver a los proyectos o escribirme.',
		notFoundHome: 'Volver al inicio',
		notFoundProjects: 'Ver proyectos',
		present: 'actualidad',
		dateLocale: 'es-ES',
		disciplines: { design: 'Diseño', code: 'Código', quality: 'Calidad' },
		contexts: { professional: 'Profesional', freelance: 'Freelance', academic: 'Académico', personal: 'Personal' },
	},
	en: {
		htmlLocale: 'en_US',
		skip: 'Skip to content',
		navLabel: 'Main',
		navProjects: 'Projects',
		navExperience: 'Experience',
		navContact: 'Contact',
		cvDownload: 'Download CV',
		cvDownloadLabel: 'Download CV (PDF)',
		cvFile: '/cv/David-Ibanez-CV-EN.pdf',
		langLabel: 'ES, Spanish version',
		langShort: 'ES',
		themeDark: 'Dark mode',
		themeLight: 'Light mode',
		menu: 'Menu',
		logoHome: 'David Ibáñez, home',
		featured: 'Featured projects',
		projects: 'Projects',
		bring: 'What I bring',
		experience: 'Experience',
		about: 'About me',
		aboutMore: 'Read more about me',
		seeCase: 'See the case study',
		desktop: 'Desktop',
		mobile: 'Mobile',
		allProjects: 'All projects',
		client: 'Client',
		period: 'Period and type',
		scope: 'Scope',
		recognition: 'Recognition',
		myRole: 'My role',
		tools: 'Tools',
		topics: 'Topics',
		factsLabel: 'Project details',
		sectionsLabel: 'Case study sections',
		inThisCase: 'In this case study',
		nextProject: 'Next project',
		aboutTitle: 'About me · David Ibáñez',
		aboutDescription: 'Who I am and how I got into design, quality and code.',
		aboutBack: 'Back to the home page',
		aboutAlt: 'Portrait of David Ibáñez in profile, wearing a cap, glasses and a zip-up jacket, smiling.',
		notFoundTitle: 'Page not found · David Ibáñez',
		notFoundDescription: 'This page doesn’t exist or has moved.',
		notFoundHeading: 'This page doesn’t exist.',
		notFoundBody: 'The address may be misspelled or the page may have moved. From here you can go back to the projects or email me.',
		notFoundHome: 'Back to home',
		notFoundProjects: 'See projects',
		present: 'present',
		dateLocale: 'en-US',
		disciplines: { design: 'Design', code: 'Code', quality: 'Quality' },
		contexts: { professional: 'Professional', freelance: 'Freelance', academic: 'Academic', personal: 'Personal' },
	},
} as const;

// Rutas y anclas de cada idioma
export const routes = {
	es: { home: '/', project: (id: string) => `/proyectos/${id}`, about: '/sobre-mi', anchors: { projects: 'proyectos', bring: 'que-aporto', experience: 'experiencia', contact: 'contacto' } },
	en: { home: '/en/', project: (id: string) => `/en/projects/${id}`, about: '/en/about', anchors: { projects: 'projects', bring: 'what-i-bring', experience: 'experience', contact: 'contact' } },
} as const;

// Anclas equivalentes al cambiar de idioma
export const anchorMap: Record<string, string> = Object.fromEntries(
	(Object.keys(routes.es.anchors) as (keyof typeof routes.es.anchors)[]).flatMap((key) => [
		[routes.es.anchors[key], routes.en.anchors[key]],
		[routes.en.anchors[key], routes.es.anchors[key]],
	]),
);

/** Devuelve la misma página en el otro idioma; las páginas sin equivalente van a la portada del otro idioma. */
export function getAlternatePath(pathname: string): string {
	const slash = pathname.endsWith('/') && pathname !== '/';
	const path = slash ? pathname.slice(0, -1) : pathname;
	const withSlash = (alternate: string) => (slash && !alternate.endsWith('/') ? `${alternate}/` : alternate);

	if (path === '' || path === '/') return '/en/';
	if (path === '/en') return '/';
	if (path === '/sobre-mi') return withSlash('/en/about');
	if (path === '/en/about') return withSlash('/sobre-mi');
	if (path === '/404') return withSlash('/en/404');
	if (path === '/en/404') return withSlash('/404');
	const spanishCase = path.match(/^\/proyectos\/([^/]+)$/);
	if (spanishCase) return withSlash(`/en/projects/${spanishCase[1]}`);
	const englishCase = path.match(/^\/en\/projects\/([^/]+)$/);
	if (englishCase) return withSlash(`/proyectos/${englishCase[1]}`);
	return path.startsWith('/en') ? '/' : '/en/';
}
