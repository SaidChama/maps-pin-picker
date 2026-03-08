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

	throw new NotImplementedError();
}
