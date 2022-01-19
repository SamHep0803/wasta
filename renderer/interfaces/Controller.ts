export interface Controller {
	cid: number;
	name: string;
	callsign: string;
	frequency: number;
	facility: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	rating: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	server: string;
	visual_range: number;
	text_atis: string[];
	last_updated: string;
	logon_time: string;
}
