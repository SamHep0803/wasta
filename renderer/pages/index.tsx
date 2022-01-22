import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
	getArrivalsAPI,
	getDeparturesAPI,
	getOnlinevACCATCAPI,
} from "../api/api";
import { Sidebar } from "../components/Sidebar";
import { Summary } from "../components/Summary";
import { User } from "../interfaces/User";

const IndexPage = () => {
	const [user, setUser] = useState<User>();
	const [onlineATC, setOnlineATC] = useState(0);
	const [departures, setDepartures] = useState(0);
	const [arrivals, setArrivals] = useState(0);

	useEffect(() => {
		const localUser = window.localStorage.getItem("user");
		if (!localUser) {
			window.location.href = "/login";
		}
		setUser(JSON.parse(window.localStorage.getItem("user")));

		getOnline();
		getDepartures();
		getArrivals();
		const refresh = setInterval(async () => {
			getOnline();
			getDepartures();
			getArrivals();
		}, 60000);

		return () => {
			clearInterval(refresh);
		};
	}, []);

	const getOnline = async () => {
		const online = await getOnlinevACCATCAPI();
		setOnlineATC(online.length);
	};

	const getDepartures = async () => {
		const departures = await getDeparturesAPI();
		setDepartures(departures.length);
	};

	const getArrivals = async () => {
		const arrivals = await getArrivalsAPI();
		setArrivals(arrivals.length);
	};

	if (user) {
		return (
			<Flex overflowY="hidden" h="100%">
				<Sidebar user={user} />
				<Flex
					flex={1}
					w="100%"
					h="100%"
					backgroundColor="#18181f"
					flexDir="column"
				>
					<Summary
						onlineATC={onlineATC}
						departures={departures}
						arrivals={arrivals}
					/>
					<Flex h="100%" my={4}>
						<Flex mx={4} backgroundColor="#14141b" w="50%" h="100%"></Flex>
						<Flex mx={4} backgroundColor="#14141b" w="50%" h="100%"></Flex>
					</Flex>
				</Flex>
			</Flex>
		);
	}

	return null;
};

export default IndexPage;

//INPROG: finish prototype dashboard page
//TODO: begin work on SOPs page
