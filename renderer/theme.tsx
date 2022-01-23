import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		bg: {
			50: "#f2f2f2",
			100: "#d9d9d9",
			200: "#bfbfbf",
			300: "#a6a6a6",
			400: "#8c8c8c",
			500: "#737373",
			600: "#595959",
			700: "#404040",
			800: "#262626",
			900: "#0d0d0d",
		},
		primary: {
			50: "#fff7db",
			100: "#ffe8af",
			200: "#ffd97f",
			300: "#ffc94d",
			400: "#ffba1d",
			500: "#e6a106",
			600: "#b37d00",
			700: "#805900",
			800: "#4e3600",
			900: "#1d1100",
		},
		secondary: {
			50: "#ffeedb",
			100: "#ffd1ae",
			200: "#ffb37e",
			300: "#ff954c",
			400: "#ff771a",
			500: "#e65e00",
			600: "#b44900",
			700: "#813300",
			800: "#4f1d00",
			900: "#200700",
		},
		text: "#ffffff",
	},
	config: {
		initialColorMode: "dark",
	},
});
