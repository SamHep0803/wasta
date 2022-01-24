// make a function that converts milliseconds into HH:MM
export const msToTime = (ms: number) => {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const minutesLeft = minutes % 60;

	const formattedMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
	const formattedHours = hours < 10 ? `0${hours}` : hours;

	return `${formattedHours}:${formattedMinutes}`;
};
