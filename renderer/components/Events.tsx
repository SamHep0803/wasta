import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Event } from "../interfaces/Event";

interface EventsProps {
	events: Event[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
	const [zuluToggle, setZuluToggle] = useState(false);

	return (
		<Flex ml={2} backgroundColor="#13141c" w="50%" h="100%" flexDir="column">
			<Flex backgroundColor="#101118" h="10%" w="100%" alignItems="center">
				<Heading size="md" ml={4} color="teal.300">
					Events
				</Heading>
				<ButtonGroup spacing={4} isAttached ml="auto" p={4}>
					<Button
						variantColor="teal"
						variant={!zuluToggle ? "solid" : "outline"}
						size="xs"
						onClick={() => setZuluToggle(false)}
					>
						Local
					</Button>
					<Button
						variantColor="teal"
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
					backgroundColor="#13141c"
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
							color="teal.300"
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
							color="teal.300"
							style={{ textDecoration: "underline" }}
						>
							{new Date(event.start_time).toLocaleDateString(["en-UK"])}
						</Text>
						<Text fontSize="sm" mx={1} color="teal.300">
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
						<Text fontSize="sm" mx={1} color="teal.300">
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
