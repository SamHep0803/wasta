import axios from "axios";
import { Controller } from "../interfaces/Controller";
import { User } from "../interfaces/User";
import { checkCallsign } from "../utils/checkCallsign";

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

export const getOnlinevACCATC = async (): Promise<Controller[]> => {
	try {
		const response = await axios.get("http://localhost:18723/getOnlinevACCATC");
		let online: Controller[] = [];
		const controllers = response.data.controllers as Controller[];
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
