import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type ProjectEntry = CollectionEntry<'projects'> | CollectionEntry<'projectsEn'>;

// Lo que se muestra en la web: los borradores no aparecen ni generan página
export async function getPublishedProjects(lang: Lang = 'es'): Promise<ProjectEntry[]> {
	const projects: ProjectEntry[] = await getCollection(lang === 'en' ? 'projectsEn' : 'projects', ({ data }) => !data.draft);
	return projects.sort((a, b) => a.data.order - b.data.order);
}

export const getExperience = async (lang: Lang = 'es') => {
	const jobs: (CollectionEntry<'experience'> | CollectionEntry<'experienceEn'>)[] = await getCollection(lang === 'en' ? 'experienceEn' : 'experience');
	return jobs.sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
};
