import express from "express";
import axios from "axios";
import cors from "cors";

export const startServer = async () => {
	const server = express();

	server.use(cors());

	server.get("/getUser", (req, res) => {
		const { authorization } = req.headers;

		const url = "https://auth-dev.vatsim.net/api/user";

		if (!authorization) {
			return res.send({ error: "No authorization header" });
		}

		axios
			.get(url, {
				headers: {
					Authorization: authorization,
					Accept: "application/json",
				},
			})
			.then((response) => {
				res.json(response.data.data);
			})
			.catch((error) => {
				res.send(error);
			});
	});

	server.get("/getOnlinevACCATC", (req, res) => {
		const url = "https://data.vatsim.net/v3/vatsim-data.json";

		axios
			.get(url)
			.then((response) => {
				res.json(response.data.controllers);
			})
			.catch((error) => {
				res.send(error);
			});
	});

	server.get("/getPilots", (req, res) => {
		const url = "https://data.vatsim.net/v3/vatsim-data.json";

		axios
			.get(url)
			.then((response) => {
				res.json(response.data.pilots);
			})
			.catch((error) => {
				res.send(error);
			});
	});

	server.get("/authx", (_req, _res) => {
		console.log("tahwsfawuihefuiaf");
	});

	await server.listen(18723, () => {
		return console.log("api listening on port 18723");
	});
};
