import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Controller } from "../interfaces/Controller";
import { RatingBadge } from "./RatingBadge";

interface OnlineProps {
	onlineATC: Controller[];
}

export const Online: React.FC<OnlineProps> = ({ onlineATC }) => {
	return (
		<Flex mr={2} backgroundColor="#13141c" w="50%" h="100%" flexDir="column">
			<Flex backgroundColor="#101118" h="10%" w="100%" alignItems="center">
				<Heading size="md" ml={4} color="teal.300">
					Online ATC
				</Heading>
			</Flex>
			{onlineATC.length > 0 ? (
				onlineATC.map((controller) => (
					<Flex
						key={controller.cid}
						h="10%"
						w="100%"
						alignItems="center"
						borderBottom="1px"
						borderColor="teal.900"
					>
						<Heading size="md" ml={4} color="teal.300">
							{controller.callsign}
						</Heading>
						<Heading size="sm" ml={4} color="teal.300">
							{controller.name}
						</Heading>
						<RatingBadge rating={controller.rating} ml="auto" mr={4} />
					</Flex>
				))
			) : (
				<Flex
					h="10%"
					w="100%"
					alignItems="center"
					// borderBottom="1px"
					// borderColor="teal.900"
				>
					<Heading size="md" ml={4} color="teal.300">
						No ATC online
					</Heading>
				</Flex>
			)}
		</Flex>
	);
};
