import { Flex, Heading, Text } from "@chakra-ui/react";
import cookie from "cookie";
import Cookie from "js-cookie";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
	getArrivalsAPI,
	getDeparturesAPI,
	getEventsAPI,
	getOnlinevACCATCAPI,
} from "../api/api";
import { Sidebar } from "../components/Sidebar";
import { Summary } from "../components/Summary";
import { Controller } from "../interfaces/Controller";
import { Event } from "../interfaces/Event";
import { User } from "../interfaces/User";

interface IndexPageProps {
	initialOnline: number;
	initialDepartures: number;
	initialArrivals: number;
}

const IndexPage: NextPage<IndexPageProps> = ({
	initialOnline,
	initialArrivals,
	initialDepartures,
}) => {
	const [user, setUser] = useState<User>();
	const [onlineATC, setOnlineATC] = useState<Controller[]>([]);
	const [departures, setDepartures] = useState(0);
	const [arrivals, setArrivals] = useState(0);
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const localUser = window.localStorage.getItem("user");
		if (!localUser) {
			window.location.href = "/login";
		}
		setUser(JSON.parse(window.localStorage.getItem("user")));

		getOnline();
		getDepartures();
		getArrivals();
		getEvents();
		const refresh = setInterval(async () => {
			getOnline();
			getDepartures();
			getArrivals();
			console.log("call");
		}, 10000);

		return () => {
			clearInterval(refresh);
		};
	}, []);

	const getOnline = async () => {
		const online = await getOnlinevACCATCAPI();
		Cookie.set("online", JSON.stringify(online.length));
		setOnlineATC(online);
	};

	const getDepartures = async () => {
		const departures = await getDeparturesAPI();
		Cookie.set("departures", departures.length.toString());
		setDepartures(departures.length);
	};

	const getArrivals = async () => {
		const arrivals = await getArrivalsAPI();
		Cookie.set("arrivals", arrivals.length.toString());
		setArrivals(arrivals.length);
	};

	const getEvents = async () => {
		const events = await getEventsAPI();
		// console.log(JSON.stringify(events));
		// Cookie.set("events", JSON.stringify(events));
		setEvents(events);
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
						onlineATC={initialOnline ? initialOnline : onlineATC.length}
						departures={initialDepartures ? initialDepartures : departures}
						arrivals={initialArrivals ? initialArrivals : arrivals}
					/>
					<Flex h="100%" mb={4} mx={4}>
						<Flex mr={2} backgroundColor="#13141c" w="50%" h="100%">
							<Flex
								backgroundColor="#101118"
								h="10%"
								w="100%"
								alignItems="center"
							>
								<Heading size="md" ml={4} color="teal.300">
									Online ATC
								</Heading>
							</Flex>
						</Flex>
						<Flex
							ml={2}
							backgroundColor="#13141c"
							w="50%"
							h="100%"
							flexDir="column"
						>
							<Flex
								backgroundColor="#101118"
								h="10%"
								w="100%"
								alignItems="center"
							>
								<Heading size="md" ml={4} color="teal.300">
									Events (local time)
								</Heading>
							</Flex>
							{events.map((event) => (
								<Flex
									key={event.id}
									backgroundColor="#13141c"
									h="10%"
									w="100%"
									alignItems="center"
									px={2}
									borderBottom="1px"
									borderColor="teal.900"
								>
									<Flex alignItems="baseline">
										<Heading size="sm" ml={4} mr={2} color="teal.300">
											{event.name}
										</Heading>
										<Text
											fontSize="sm"
											mx={2}
											color="teal.300"
											style={{ textDecoration: "underline" }}
										>
											{new Date(event.start_time).toLocaleDateString(["en-UK"])}
										</Text>
										<Text fontSize="sm" mx={1} color="teal.300">
											{new Date(event.start_time).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</Text>
										{"-"}
										<Text fontSize="sm" mx={1} color="teal.300">
											{new Date(event.end_time).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</Text>
									</Flex>
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		);
	}

	return null;
};

export default IndexPage;

IndexPage.getInitialProps = ({ req }) => {
	const cookies = cookie.parse(
		req ? req.headers.cookie || "" : document.cookie
	);

	return {
		initialOnline: cookies.online,
		initialDepartures: cookies.departures,
		initialArrivals: cookies.arrivals,
	};
};

//INPROG: finish prototype dashboard page
//TODO: begin work on SOPs page
