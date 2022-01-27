import { Flex } from "@chakra-ui/react";
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
import { Events } from "../components/Events";
import { Online } from "../components/Online";
import { Sidebar } from "../components/Sidebar";
import { Summary } from "../components/Summary";
import { Controller } from "../interfaces/Controller";
import { Event } from "../interfaces/Event";
import { User } from "../interfaces/User";

interface IndexPageProps {
	initialOnline: string;
	initialDepartures: string;
	initialArrivals: string;
}

const IndexPage: NextPage<IndexPageProps> = ({
	initialOnline,
	initialArrivals,
	initialDepartures,
}) => {
	const [user, setUser] = useState<User>();
	const [onlineATC, setOnlineATC] = useState<Controller[]>(
		initialOnline && initialOnline !== "undefined"
			? JSON.parse(initialOnline)
			: []
	);
	const [departures, setDepartures] = useState(
		initialDepartures && initialOnline !== "undefined"
			? parseInt(initialDepartures)
			: 0
	);
	const [arrivals, setArrivals] = useState(
		initialArrivals && initialArrivals !== "undefined"
			? parseInt(initialArrivals)
			: 0
	);
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
		}, 120000);

		return () => {
			clearInterval(refresh);
		};
	}, []);

	const getOnline = async () => {
		const online = await getOnlinevACCATCAPI();
		Cookie.set("online", JSON.stringify(online));
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
					backgroundColor="bg.900"
					flexDir="column"
				>
					<Summary
						onlineATC={onlineATC.length}
						departures={departures}
						arrivals={arrivals}
					/>
					<Flex h="100%" mb={4} mx={4}>
						<Online onlineATC={onlineATC} />
						<Events events={events} />
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
