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
		<Flex w="25%" h="100%" flexDir="column" backgroundColor="#252530">
			<Heading size="2xl" mt={4} mb={6} alignSelf="center">
				wasta
			</Heading>
			<Divider mb={6} />
			<Flex>
				<Flex bg="#2c2c3a" w="100%" p={4} mb={6} mx={6}>
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
				color="teal.300"
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
					variant="ghost"
					backgroundColor={router.pathname === "/" ? "teal.800" : null}
					_hover={{
						backgroundColor: "teal.700",
					}}
					color="teal.300"
					aria-label="Dashboard"
					mx={6}
					mb={2}
				>
					Home
				</Button>
			</NextLink>
			<NextLink href="/briefing">
				<Button
					as="a"
					variant="ghost"
					backgroundColor={router.pathname === "/briefing" ? "teal.800" : null}
					_hover={{
						backgroundColor: "teal.700",
					}}
					color="teal.300"
					aria-label="Briefing"
					mx={6}
				>
					Briefing
				</Button>
			</NextLink>
		</Flex>
	);
};
