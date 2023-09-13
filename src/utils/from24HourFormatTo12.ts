export default function formatTime(input: string): string {
	const timeRegex = /^\d{2}:\d{2}$/; // Matches 'HH:mm' format
	const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // Matches 'YYYY-MM-DD HH:mm:ss' format

	let formattedTime = "";

	if (timeRegex.test(input)) {
		// Parse 'HH:mm' format
		const [hours, minutes] = input.split(":");
		const date = new Date();
		date.setHours(parseInt(hours, 10));
		date.setMinutes(parseInt(minutes, 10));
		formattedTime = date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	} else if (dateTimeRegex.test(input)) {
		// Parse 'YYYY-MM-DD HH:mm:ss' format
		const date = new Date(input);
		formattedTime = date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	}

	return formattedTime;
}
