import { Flex, Heading, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { MdOutlineRadar } from "react-icons/md";
import {
	getArrivalsAPI,
	getDeparturesAPI,
	getOnlinevACCATCAPI,
} from "../api/api";
import { Sidebar } from "../components/Sidebar";
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
				<Flex flex={1} w="100%" h="100%" backgroundColor="#18181f">
					<Flex
						w="100%"
						h={200}
						m={4}
						backgroundColor="teal.400"
						// borderRadius={8}
						flexDir="column"
						color="white"
					>
						<Flex>
							<Heading size="lg" mt={4} ml={6} w="100%">
								Arabian vACC
							</Heading>
						</Flex>
						<Flex alignItems="center" justifyContent="space-between" h="100%">
							<Flex flexDir="column" w="100%" alignItems="center">
								<Icon as={MdOutlineRadar} w={14} h={14} color="white" />
								<Heading size="md" textAlign="center">
									Online ATC: {onlineATC}
								</Heading>
							</Flex>
							<Flex flexDir="column" w="100%" alignItems="center">
								<Icon as={FaPlaneDeparture} w={14} h={14} color="white" />
								<Heading size="md" textAlign="center">
									Departures: {departures}
								</Heading>
							</Flex>
							<Flex flexDir="column" w="100%" alignItems="center">
								<Icon as={FaPlaneArrival} w={14} h={14} color="white" />
								<Heading size="md" textAlign="center">
									Arrivals: {arrivals}
								</Heading>
							</Flex>
						</Flex>
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
