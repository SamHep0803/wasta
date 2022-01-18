import { ChakraProvider, Flex } from "@chakra-ui/react";
import { TitleBar } from "../components/TitleBar/TitleBar";
import { theme } from "../theme";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ChakraProvider theme={theme}>
				<style jsx global>{`
					body {
						user-select: none;
					}

					html,
					body,
					#__next {
						max-height: 100%;
						height: 100%;
						width: 100%;
					}
				`}</style>

				<Flex w="100%" h="100%" flexDir="column">
					<TitleBar />
					<Component {...pageProps} />
				</Flex>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
