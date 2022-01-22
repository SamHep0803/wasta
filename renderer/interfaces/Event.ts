export interface Event {
	id: number;
	type: string;
	vso_name: null;
	name: string;
	link: string;
	organisers: Organiser[];
	airports: Airport[];
	routes: Route[];
	start_time: Date;
	end_time: Date;
	short_description: string;
	description: string;
	banner: string;
}

interface Airport {
	icao: string;
}

interface Organiser {
	region: string;
	division: string;
	subdivision: null;
	organised_by_vatsim: boolean;
}

interface Route {
	departure: string;
	arrival: string;
	route: string;
}
