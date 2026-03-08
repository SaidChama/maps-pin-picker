import { createMapPinPicker, buildGoogleMapsUrl } from "../dist/index.js";

const mapElement = document.getElementById("map");
const statusElement = document.getElementById("status");
const valueOutput = document.getElementById("value-output");
const logOutput = document.getElementById("log-output");
const mapsLink = document.getElementById("maps-link");
const btnTestUrl = document.getElementById("btn-test-url");
const btnReload = document.getElementById("btn-reload");
const btnClearLogs = document.getElementById("btn-clear-logs");

function setStatus(text) {
	statusElement.textContent = `Status: ${text}`;
}

function setValue(value) {
	valueOutput.textContent = JSON.stringify(value, null, 2);

	if (value?.googleMapsUrl) {
		mapsLink.textContent = value.googleMapsUrl;
		mapsLink.href = value.googleMapsUrl;
	} else {
		mapsLink.textContent = "-";
		mapsLink.href = "#";
	}
}

function appendLog(message) {
	const current = logOutput.textContent;
	const line =
		typeof message === "string"
			? message
			: JSON.stringify(message, null, 2);

	logOutput.textContent = current ? `${current}\n${line}` : line;
}

async function runPicker() {
	setStatus("running");
	appendLog("Running createMapPinPicker...");

	try {
		const instance = await createMapPinPicker({
			apiKey: "test",
			container: mapElement,
			address: "Maringá PR",
			onChange(value) {
				appendLog({ type: "onChange", payload: value });
				setValue(value);
			},
		});

		appendLog("Picker instance created successfully.");
		appendLog({
			type: "instance-methods",
			methods: Object.keys(instance),
		});

		setStatus("success");
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);

		appendLog({
			type: "error",
			message,
		});

		setStatus(`error - ${message}`);
	}
}

btnClearLogs.addEventListener("click", () => {
	logOutput.textContent = "";
});

btnTestUrl.addEventListener("click", () => {
	const url = buildGoogleMapsUrl(-23.4205, -51.9331);

	appendLog({
		type: "buildGoogleMapsUrl",
		url,
	});

	setValue({
		lat: -23.4205,
		lng: -51.9331,
		googleMapsUrl: url,
	});

	setStatus("tested utility");
});

btnReload.addEventListener("click", async () => {
	await runPicker();
});

await runPicker();
