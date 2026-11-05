import { getCollection } from 'astro:content';

export const disciplineLabels = { design: 'Diseño', code: 'Código', quality: 'Calidad' };
export const contextLabels = { professional: 'Profesional', academic: 'Académico', personal: 'Personal' };

// Lo que se muestra en la web: los borradores no aparecen ni generan página
export async function getPublishedProjects() {
	const projects = await getCollection('projects', ({ data }) => !data.draft);
	return projects.sort((a, b) => a.data.order - b.data.order);
}
