export const msToTime = (ms: number): string => {
	let seconds: number | string = Math.floor((ms / 1000) % 60);
	let minutes: number | string = Math.floor((ms / (1000 * 60)) % 60);

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${minutes}:${seconds}`;
};
