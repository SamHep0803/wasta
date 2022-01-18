import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getOnlinevACCATC } from "../api/api";
import { Sidebar } from "../components/Sidebar";
import { User } from "../interfaces/User";

const IndexPage = () => {
	const [user, setUser] = useState<User>();
	const [onlineATC, setOnlineATC] = useState(0);

	useEffect(() => {
		const localUser = window.localStorage.getItem("user");
		if (!localUser) {
			window.location.href = "/login";
		}
		setUser(JSON.parse(window.localStorage.getItem("user")));
	}, []);

	getOnlinevACCATC();

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
					>
						<Heading size="md" mt={4} ml={6}>
							UAE ACC Arrivals
						</Heading>
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
