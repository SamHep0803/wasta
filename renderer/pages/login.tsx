import { Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { useEffect } from "react";
import { getUser } from "../api/api";

const LoginPage = () => {
	useEffect(() => {
		const localUser = window.localStorage.getItem("user");
		if (localUser) {
			getUser(window.localStorage.getItem("access_token")).then((user) => {
				if (user.status === 401) {
					ipcRenderer.send("oauth-login");
				} else {
					window.location.href = "/";
				}
			});
		}
	}, []);

	const handleAuth = async () => {
		ipcRenderer.send("oauth-login");
		ipcRenderer.on("oauth-response", (event, arg) => {
			const accessToken = JSON.parse(arg.body).access_token;
			getUser(accessToken).then((user) => {
				if (!user) {
					return;
				}
				window.localStorage.setItem("user", JSON.stringify(user));
				window.localStorage.setItem("access_token", accessToken);

				window.location.href = "/";
			});
		});
	};

	return (
		<>
			<Flex h="100%" bgImage="/images/hero-bg.png" bgSize="auto" color="white">
				<img
					src="/images/TextLogo.png"
					alt="TextLogo"
					height="105px"
					width="210px"
					style={{
						marginLeft: "30px",
						marginTop: "4px",
						zIndex: 20,
						position: "absolute",
					}}
				/>
				<Flex w="100%" justifyContent="center" alignItems="center" zIndex={1}>
					<Flex flexDirection="column" alignItems="center">
						<Heading fontSize={125} textShadow="0px 6px #00000050">
							wasta
						</Heading>
						<Text fontSize="md" mb={12} fontWeight="bold" ml="auto">
							powered by Oryx
						</Text>
						<Flex backgroundColor="#0a0a0a" borderRadius={4}>
							<Button size="lg" onClick={handleAuth}>
								Login with
								<Img src="/images/vatsim.png" alt="Vatsim" h="25px" ml={2} />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default LoginPage;
