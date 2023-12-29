export const getFormattedDate = (date) =>
	`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const getLastWeek = (date, days) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
