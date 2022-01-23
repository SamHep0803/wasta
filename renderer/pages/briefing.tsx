import {
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

	if (user) {
		return (
			<Flex overflowY="hidden" h="100%">
				<Sidebar user={user} />
				<Flex flex={1} w="100%" h="100%" backgroundColor="bg.900">
					<Flex w="100%">
						<Tabs variant="enclosed" mt={2} w="100%" ml={2}>
							<TabList>
								<Tab>One</Tab>
								<Tab>Two</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<p>one!</p>
								</TabPanel>
								<TabPanel>
									<p>two!</p>
								</TabPanel>
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
