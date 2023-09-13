export default function changeFromHHmmFormatToDateFormate(
	date: string,
	time: string,
): string {
	const timeRegex = /^\d{2}:\d{2}$/; // Matches 'HH:mm' format
	const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // Matches 'YYYY-MM-DD HH:mm:ss' format
	let formattedDateTime = `${date} ${time}`;
	if (time.length > 5) {
		formattedDateTime = `${time}`;
	}

	// if (timeRegex.test(time) && dateTimeRegex.test(date)) {
	// 	formattedDateTime = `${date} ${time}`;
	// }
	return formattedDateTime;
}

const t = "2023-08-26 22:45:00";
