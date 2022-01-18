import { Avatar, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { User } from "../interfaces/User";

interface SidebarProps {
	user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
	const handleLogout = () => {
		window.localStorage.removeItem("user");
		window.localStorage.removeItem("access_token");
		window.location.href = "/login";
	};

	return (
		<Flex
			w="25%"
			h="100%"
			// position="absolute"
			left={0}
			right={0}
			top="24px"
			bottom={0}
			flexDir="column"
			backgroundColor="#242327"
		>
			<Heading size="2xl" mt={4} mb={6} alignSelf="center">
				wasta
			</Heading>
			<Flex>
				<Flex bg="#1e1e21" w="100%" p={4} mb={4} mx={6}>
					<Avatar
						name={user.personal.name_full}
						mr={3}
						alignSelf="center"
						size="sm"
					/>
					<Flex flexDir="column">
						<Heading size="md">{user.personal.name_full}</Heading>
						<Heading size="xs">
							{user.cid} - {user.vatsim.rating.short}
						</Heading>
					</Flex>
				</Flex>
			</Flex>
			<Button
				color="#da9703"
				borderColor="#da9703"
				variant="solid"
				size="sm"
				mb={4}
				mx={6}
				onClick={handleLogout}
			>
				Logout
			</Button>
		</Flex>
	);
};
