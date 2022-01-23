// make a function that remove duplicate elements by its "id" field in an array of objects

export const removeDuplicates = (arr: any[]) => {
	const unique = arr.filter((elem, index, self) => {
		return index === self.findIndex((t) => t.id === elem.id);
	});

	return unique;
};
