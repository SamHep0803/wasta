export const checkCallsign = (callsign: string): boolean => {
	if (
		callsign.startsWith("OMAE") ||
		callsign.startsWith("OMSJ") ||
		callsign.startsWith("OMDB") ||
		callsign.startsWith("OMAA") ||
		callsign.startsWith("OTHH") ||
		callsign.startsWith("OBBI") ||
		callsign.startsWith("OBBB") ||
		callsign.startsWith("OOMS") ||
		callsign.startsWith("OOSA") ||
		callsign.startsWith("OOMM")
	) {
		return true;
	}
	return false;
};
