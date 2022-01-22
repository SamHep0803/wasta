export interface Pilot {
	cid: number;
	name: string;
	callsign: string;
	server: string;
	pilot_rating: number;
	latitude: number;
	longitude: number;
	altitude: number;
	groundspeed: number;
	transponder: string;
	heading: number;
	qnh_i_hg: number;
	qnh_mb: number;
	flight_plan: FlightPlan;
	logon_time: Date;
	last_updated: Date;
}

interface FlightPlan {
	flight_rules: string;
	aircraft: string;
	aircraft_faa: string;
	aircraft_short: string;
	departure: string;
	arrival: string;
	alternate: string;
	cruise_tas: string;
	altitude: string;
	deptime: string;
	enroute_time: string;
	fuel_time: string;
	remarks: string;
	route: string;
	revision_id: number;
	assigned_transponder: string;
}
