import { Flex } from "@chakra-ui/react";
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
				<Flex flex={1} w="100%" h="100%" backgroundColor="#18181f"></Flex>
			</Flex>
		);
	}

	return null;
};

export default BriefingPage;
