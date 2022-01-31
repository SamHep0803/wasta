import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Controller } from "../interfaces/Controller";
import { msToTime } from "../utils/msToTime";
import { RatingBadge } from "./RatingBadge";

interface OnlineProps {
	onlineATC: Controller[];
}

export const Online: React.FC<OnlineProps> = ({ onlineATC }) => {
	return (
		<Flex mr={2} backgroundColor="#111111" w="50%" h="100%" flexDir="column">
			<Flex backgroundColor="#0f0f0f" h="10%" w="100%" alignItems="center">
				<Heading size="md" ml={4} color="text">
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
						<Flex alignItems="baseline" w="100%">
							<Heading size="sm" ml={4} color="text">
								{controller.callsign}
							</Heading>
							<Heading size="xs" ml={4} color="text">
								{controller.name}
							</Heading>
							<Heading size="xs" ml={4} color="#cccccc">
								{msToTime(
									Date.now() - new Date(controller.logon_time).getTime()
								)}
							</Heading>
							<RatingBadge rating={controller.rating} ml="auto" mr={4} />
						</Flex>
					</Flex>
				))
			) : (
				<Flex h="10%" w="100%" alignItems="center">
					<Heading size="xs" ml={4} color="text" fontWeight="light">
						No ATC online
					</Heading>
				</Flex>
			)}
		</Flex>
	);
};
