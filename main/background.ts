import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import OAuth2Provider from "electron-oauth-helper/dist/oauth2";
import options from "../config";
import { startServer } from "../server/server";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let config;

(async () => {
	await startServer();
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 1000,
		height: 600,
		frame: false,
		resizable: false,
	});

	if (isProd) {
		await mainWindow.loadURL("app://./login.html");
		config = options.vatsim;
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/login`);
		mainWindow.webContents.openDevTools();
		config = options.vatsimDev;
	}
})();

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("oauth-login", async (event) => {
	const provider = new OAuth2Provider(config);
	const options = {
		show: false,
		width: 600,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
	};

	let window = new BrowserWindow(options);
	window.once("ready-to-show", () => {
		window.show();
	});
	window.on("close", () => {
		window.destroy();
	});

	if (!isProd) {
		window.webContents.openDevTools({
			mode: "detach",
		});
	}

	provider.config.grant_type = "authorization_code";
	provider
		.perform(window)
		.then((response) => {
			window.close();
			event.sender.send("oauth-response", response);
		})
		.catch((error) => console.error(error));
});
