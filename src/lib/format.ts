// Las fechas del contenido son días sin hora: se formatean en UTC para no desplazarlas de mes
const month = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric', timeZone: 'UTC' });

interface Period {
	startDate?: Date;
	endDate?: Date;
	datePrecision?: 'month' | 'year';
}

export function formatPeriod({ startDate, endDate, datePrecision = 'month' }: Period): string {
	if (!startDate) return '';
	const format = (date: Date) =>
		datePrecision === 'year' ? String(date.getUTCFullYear()) : month.format(date).replace('.', '');
	if (!endDate) return `${format(startDate)} – actualidad`;
	const [start, end] = [format(startDate), format(endDate)];
	return start === end ? start : `${start} – ${end}`;
}
