export const checkCallsign = (callsign: string): boolean => {
	if (
		callsign.startsWith("OM") ||
		callsign.startsWith("OT") ||
		callsign.startsWith("OB") ||
		callsign.startsWith("OO")
	) {
		return true;
	}
	return false;
};
