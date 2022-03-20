import {
	AspectRatio,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { User } from "../interfaces/User";

const BriefingPage = () => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const localUser = window.localStorage.getItem("user");
		if (!localUser) {
			window.location.href = "/login";
		}
		setUser(JSON.parse(window.localStorage.getItem("user")));
	}, []);

	const sectors = [
		{
			name: "OMAE",
			airports: [
				{
					name: "OMDB",
					url: "https://drive.google.com/file/d/1HuDI8l-5tGEJW9dfF6TAWbOLo_BiKqUj/preview",
					disabled: false,
				},
				{
					name: "OMSJ",
					url: "",
					disabled: true,
				},
				{
					name: "OMAA",
					url: "https://drive.google.com/file/d/1IYTHt-BhxfXomplVwxsqQ3my786yV-1r/preview",
					disabled: false,
				},
			],
			disabled: false,
		},
		{
			name: "OBBB",
			airports: [
				{
					name: "OTHH",
					url: "",
					disabled: true,
				},
				{
					name: "OBBI",
					url: "",
					disabled: true,
				},
			],
			disabled: true,
		},
		{
			name: "OOMM",
			airports: [
				{
					name: "OOMS",
					url: "",
					disabled: true,
				},
				{
					name: "OOSA",
					url: "",
					disabled: true,
				},
			],
			disabled: true,
		},
	];

	if (user) {
		return (
			<Flex overflowY="hidden" h="100%">
				<Sidebar user={user} />
				<Flex flex={1} w="100%" h="100%" backgroundColor="bg.900">
					<Flex w="100%">
						<Tabs mt={2} w="100%" ml={2} isFitted colorScheme="primary">
							<TabList>
								{sectors.map((sector) => (
									<Tab key={sector.name} isDisabled={sector.disabled}>
										{sector.name}
									</Tab>
								))}
							</TabList>
							<TabPanels>
								{sectors.map((sector) => (
									<TabPanel key={sector.name}>
										<Tabs colorScheme="primary">
											<TabList>
												{sector.airports.map((airport) => (
													<Tab key={airport.name} isDisabled={airport.disabled}>
														{airport.name}
													</Tab>
												))}
											</TabList>
											<TabPanels>
												{sector.airports.map((airport) => (
													<TabPanel key={airport.name} pb={2}>
														<AspectRatio
															ratio={16 / 11}
															maxW="850px"
															maxH="530px"
														>
															<iframe
																src={airport.url}
																width="640"
																height="480"
																frameBorder="0"
																allowFullScreen
															/>
														</AspectRatio>
													</TabPanel>
												))}
											</TabPanels>
										</Tabs>
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</Flex>
				</Flex>
			</Flex>
		);
	}

	return null;
};

export default BriefingPage;
