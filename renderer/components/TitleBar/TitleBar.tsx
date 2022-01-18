import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import styles from "./TitleBar.module.css";

interface TitleBarProps {}

export const TitleBar: React.FC<TitleBarProps> = ({}) => {
	const handleClose = () => {
		window.close();
	};

	return (
		<Flex bg="#0a0a0a">
			<Flex className={styles.titleBar} py={3} h="100%" w="100%" />
			<Flex backgroundColor="#da9703" h="24px" w="28px" justifyContent="center">
				<Button
					rounded="none"
					size="xs"
					colorScheme="gray"
					_focus={{ outline: "none" }}
					onClick={handleClose}
				>
					<CloseIcon color="currentColor" size="2xs" />
				</Button>
			</Flex>
		</Flex>
	);
};
