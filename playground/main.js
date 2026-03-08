import { createMapPinPicker } from "../dist/index.js";

createMapPinPicker({
	apiKey: "test",
	container: document.getElementById("map"),
	address: "Maringá PR",
});
