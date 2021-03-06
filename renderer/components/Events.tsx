import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Event } from "../interfaces/Event";

interface EventsProps {
	events: Event[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
	const [zuluToggle, setZuluToggle] = useState(false);

	return (
		<Flex ml={2} backgroundColor="#111111" w="50%" h="100%" flexDir="column">
			<Flex backgroundColor="#0f0f0f" h="10%" w="100%" alignItems="center">
				<Heading size="md" ml={4} color="text">
					Events
				</Heading>
				<ButtonGroup spacing={4} isAttached ml="auto" p={4}>
					<Button
						colorScheme="secondary"
						variant={!zuluToggle ? "solid" : "outline"}
						size="xs"
						onClick={() => setZuluToggle(false)}
					>
						Local
					</Button>
					<Button
						colorScheme="secondary"
						variant={zuluToggle ? "solid" : "outline"}
						size="xs"
						onClick={() => setZuluToggle(true)}
					>
						Zulu
					</Button>
				</ButtonGroup>
			</Flex>
			{events.map((event) => (
				<Flex
					key={event.id}
					h="10%"
					w="100%"
					alignItems="center"
					px={2}
					borderBottom="1px"
					borderColor="teal.900"
				>
					<Flex alignItems="baseline">
						<Heading
							size="sm"
							ml={4}
							mr={2}
							color="text"
							as="a"
							href={event.link}
							target="_blank"
							_hover={{
								textDecoration: "underline",
							}}
						>
							{event.name}
						</Heading>
						<Text
							fontSize="sm"
							mx={2}
							color="text"
							style={{ textDecoration: "underline" }}
						>
							{new Date(event.start_time).toLocaleDateString(["en-UK"])}
						</Text>
						<Text fontSize="xs" mx={1} color="text">
							{/* {new Date(event.start_time).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})} */}
							{zuluToggle
								? new Date(event.start_time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
										timeZone: "UTC",
								  }) + "Z"
								: new Date(event.start_time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
								  })}
						</Text>
						{"-"}
						<Text fontSize="xs" mx={1} color="text">
							{/* {new Date(event.end_time).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})} */}
							{zuluToggle
								? new Date(event.end_time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
										timeZone: "UTC",
								  }) + "Z"
								: new Date(event.end_time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
								  })}
						</Text>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
};
