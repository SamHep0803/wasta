import { Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { MdOutlineRadar } from "react-icons/md";

interface SummaryProps {
	onlineATC: number;
	departures: number;
	arrivals: number;
}

export const Summary: React.FC<SummaryProps> = ({
	onlineATC,
	departures,
	arrivals,
}) => {
	return (
		<Flex
			h="45%"
			m={4}
			backgroundColor="teal.400"
			flexDir="column"
			color="white"
		>
			<Flex>
				<Heading size="lg" mt={4} ml={6}>
					Arabian vACC
				</Heading>
			</Flex>
			<Flex alignItems="center" justifyContent="space-between" h="100%">
				<Flex flexDir="column" alignItems="center" mx="auto">
					<Icon as={MdOutlineRadar} w={14} h={14} color="white" />
					<Heading size="md" textAlign="center">
						Online ATC: {onlineATC}
					</Heading>
				</Flex>
				<Flex flexDir="column" alignItems="center" mx="auto">
					<Icon as={FaPlaneDeparture} w={14} h={14} color="white" />
					<Heading size="md" textAlign="center">
						Departures: {departures}
					</Heading>
				</Flex>
				<Flex flexDir="column" alignItems="center" mx="auto">
					<Icon as={FaPlaneArrival} w={14} h={14} color="white" />
					<Heading size="md" textAlign="center">
						Arrivals: {arrivals}
					</Heading>
				</Flex>
			</Flex>
		</Flex>
	);
};
