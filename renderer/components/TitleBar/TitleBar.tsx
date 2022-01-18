import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import styles from "./TitleBar.module.css";

interface TitleBarProps {}

export const TitleBar: React.FC<TitleBarProps> = ({}) => {
	const handleClose = () => {
		window.close();
	};

	return (
		<Flex bg="#0f0f13">
			<Flex className={styles.titleBar} py={3} h="100%" w="100%" />
			<Flex
				backgroundColor="red"
				h="24px"
				w="28px"
				justifyContent="center"
				alignContent="center"
			>
				<IconButton
					rounded="none"
					size="xs"
					colorScheme="gray"
					_focus={{ outline: "none" }}
					aria-label="Close"
					onClick={handleClose}
					icon={<CloseIcon />}
				/>
			</Flex>
		</Flex>
	);
};
