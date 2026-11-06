import { ui, type Lang } from '../i18n/ui';

interface Period {
	startDate?: Date;
	endDate?: Date;
	datePrecision?: 'month' | 'year';
}

export function formatPeriod({ startDate, endDate, datePrecision = 'month' }: Period, lang: Lang = 'es'): string {
	if (!startDate) return '';
	// Las fechas del contenido son días sin hora: se formatean en UTC para no desplazarlas de mes
	const month = new Intl.DateTimeFormat(ui[lang].dateLocale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
	const format = (date: Date) =>
		datePrecision === 'year' ? String(date.getUTCFullYear()) : month.format(date).replace('.', '');
	if (!endDate) return `${format(startDate)} – ${ui[lang].present}`;
	const [start, end] = [format(startDate), format(endDate)];
	return start === end ? start : `${start} – ${end}`;
}
