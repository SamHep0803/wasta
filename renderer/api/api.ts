import axios from "axios";
import { Controller } from "../interfaces/Controller";
import { Pilot } from "../interfaces/Pilot";
import { User } from "../interfaces/User";
import { checkCallsign } from "../utils/checkCallsign";
import { Event } from "../interfaces/Event";
import { removeDuplicates } from "../utils/removeDuplicates";

export const getUser = async (accessToken: string): Promise<User | null> => {
	try {
		const response = await axios.get("http://localhost:18723/getUser", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data as User;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getOnlinevACCATCAPI = async (): Promise<Controller[]> => {
	try {
		const response = await axios.get("http://localhost:18723/getOnlinevACCATC");
		let online: Controller[] = [];
		const controllers = response.data as Controller[];
		controllers.forEach((controller) => {
			if (controller.facility !== 0) {
				if (checkCallsign(controller.callsign)) {
					online.push(controller);
				}
			}
		});
		if (!online) {
			return [];
		}
		return online;
	} catch (error) {
		console.error(error);
	}
};

export const getDeparturesAPI = async (): Promise<Pilot[]> => {
	try {
		const response = await axios.get("http://localhost:18723/getPilots");
		let departures: Pilot[] = [];
		const pilots = response.data as Pilot[];
		pilots.forEach((pilot) => {
			if (pilot.flight_plan) {
				if (checkCallsign(pilot.flight_plan.departure)) {
					departures.push(pilot);
				}
			}
		});
		if (!departures) {
			return [];
		}
		return departures;
	} catch (error) {
		console.error(error);
	}
};

export const getArrivalsAPI = async (): Promise<Pilot[]> => {
	try {
		const response = await axios.get("http://localhost:18723/getPilots");
		let arrivals: Pilot[] = [];
		const pilots = response.data as Pilot[];
		pilots.forEach((pilot) => {
			if (pilot.flight_plan) {
				if (checkCallsign(pilot.flight_plan.arrival)) {
					arrivals.push(pilot);
				}
			}
		});
		if (!arrivals) {
			return [];
		}
		return arrivals;
	} catch (error) {
		console.error(error);
	}
};

export const getEventsAPI = async (): Promise<Event[]> => {
	try {
		const response = await axios.get("http://localhost:18723/getEvents");
		let accEvents: Event[] = [];
		const events = response.data as Event[];
		events.forEach((event) => {
			event.organisers.forEach((organiser) => {
				if (organiser.division === "MENA") {
					event.airports.forEach((airport) => {
						if (checkCallsign(airport.icao)) {
							accEvents.push(event);
						}
					});
				}
			});
		});
		if (!accEvents) {
			return [];
		}
		return removeDuplicates(accEvents);
	} catch (error) {
		console.error(error);
	}
};
