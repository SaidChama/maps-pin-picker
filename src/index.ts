import {
	InvalidOptionsError,
	MapLoadError,
	NotImplementedError,
} from "./errors";
import { loadGoogleMapsApi } from "./loader";

import type {
	CreateMapPinPickerOptions,
	MapPinPickerInstance,
	MapPinPickerValue,
} from "./types";
import { buildGoogleMapsUrl } from "./utils";
import { validateOptions } from "./validator";
import { geocodeAddress } from "./geocoder";

export type {
	CreateMapPinPickerOptions,
	MapPinPickerInstance,
	MapPinPickerValue,
} from "./types";

export { buildGoogleMapsUrl } from "./utils";

export async function createMapPinPicker(
	options: CreateMapPinPickerOptions,
): Promise<MapPinPickerInstance> {
	validateOptions(options);
	await loadGoogleMapsApi(options.apiKey);

	const coords = await geocodeAddress(options.address);

	const map = new google.maps.Map(options.container, {
		center: coords,
		zoom: options.zoom ?? 17,
		mapTypeId: options.mapType ?? "hybrid",
	});

	const marker = new google.maps.Marker({
		position: coords,
		map,
		draggable: true,
	});

	throw new NotImplementedError();
}
