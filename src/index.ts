import {
	InvalidOptionsError,
	MapLoadError,
	NotImplementedError,
} from "./errors";

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

	throw new NotImplementedError();
}
