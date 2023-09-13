function removeDuplicates(travelData: any, duplication: any) {
	const uniqueData = [];
	const keySet: string[] = [];

	for (const item of travelData) {
		const key = `${item[duplication]}`;
		//   console.log(88888888888888888);
		//   console.log(key,keySet);

		if (!keySet.includes(key)) {
			uniqueData.push(item);
			keySet.push(key);
		}
	}

	return uniqueData;
}

export default removeDuplicates;
