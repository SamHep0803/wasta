import axios from "axios";
import { User } from "../interfaces/User";

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
