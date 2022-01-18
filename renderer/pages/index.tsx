import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { User } from "../interfaces/User";

const IndexPage = () => {
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
				<Flex
					flex={1}
					w="100%"
					h="100%"
					backgroundColor="#1a1a1d"
					color="white"
				></Flex>
			</Flex>
		);
	}

	return null;
};

export default IndexPage;
