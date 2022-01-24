import { Avatar, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { User } from "../interfaces/User";

interface SidebarProps {
	user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
	const router = useRouter();

	const handleLogout = () => {
		window.localStorage.removeItem("user");
		window.localStorage.removeItem("access_token");
		window.location.href = "/login";
	};

	return (
		<Flex w="25%" h="100%" flexDir="column" backgroundColor="#1b1b1b">
			<Heading
				size="2xl"
				mt={4}
				mb={6}
				alignSelf="center"
				color="primary.400"
				fontWeight="extrabold"
			>
				wasta.
			</Heading>
			<Divider mb={6} />
			<Flex>
				<Flex bg="bg.800" w="100%" p={4} mb={6} mx={6} color="text">
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
				color="primary.300"
				variant="solid"
				size="sm"
				mb={6}
				mx={6}
				onClick={handleLogout}
			>
				Logout
			</Button>
			<Divider mb={4} />
			{/* <ButtonGroup
				isAttached
				spacing={0}
				alignSelf="center"
				w="100%"
				mb={4}
				px={6}
			>
				<Button variant="solid" colorScheme="teal" size="md" w="100%">
					Pilot
				</Button>
				<Button variant="outline" size="md" w="100%">
					ATC
				</Button>
			</ButtonGroup> */}
			<NextLink href="/">
				<Button
					as="a"
					variant={router.pathname === "/" ? "solid" : "ghost"}
					_hover={{
						color: "secondary.300",
					}}
					color={router.pathname === "/" ? "primary.400" : "white"}
					aria-label="Dashboard"
					mx={6}
					mb={2}
					fontSize="xl"
					size="lg"
					_focus={{}}
				>
					HOME
				</Button>
			</NextLink>
			<NextLink href="/briefing">
				<Button
					as="a"
					variant={router.pathname === "/briefing" ? "solid" : "ghost"}
					_hover={{
						color: "secondary.300",
					}}
					color={router.pathname === "/briefing" ? "primary.400" : "white"}
					aria-label="Briefing"
					mx={6}
					fontSize="xl"
					size="lg"
				>
					BRIEFING
				</Button>
			</NextLink>
		</Flex>
	);
};
