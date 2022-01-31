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
						scrollbar-width: thin; /* "auto" or "thin" */
						scrollbar-color: blue orange;
					}

					html,
					body,
					#__next {
						max-height: 100%;
						height: 100%;
						width: 100%;
					}

					/* Works on Chrome, Edge, and Safari */
					*::-webkit-scrollbar {
						width: 6px;
					}

					*::-webkit-scrollbar-thumb {
						background-color: var(--chakra-colors-primary-500);
						border-radius: 20px;
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
