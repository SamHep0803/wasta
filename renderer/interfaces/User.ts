export interface User {
	cid: string;
	personal: Personal;
	vatsim: Vatsim;
	oauth: Oauth;
	status?: number;
}

interface Oauth {
	token_valid: string;
}

interface Personal {
	name_first: string;
	name_last: string;
	name_full: string;
	email: string;
	country: Country;
}

interface Country {
	id: string;
	name: string;
}

interface Vatsim {
	rating: Rating;
	pilotrating: Rating;
	division: Country;
	region: Country;
	subdivision: Country;
}

interface Rating {
	id: number;
	long: string;
	short: string;
}
