import type {
	CreateMapPinPickerOptions,
	MapPinPickerInstance,
	MapPinPickerValue,
} from "./types";
import { buildGoogleMapsUrl } from "./utils";

export type {
	CreateMapPinPickerOptions,
	MapPinPickerInstance,
	MapPinPickerValue,
} from "./types";

export { buildGoogleMapsUrl } from "./utils";

export async function createMapPinPicker(
	options: CreateMapPinPickerOptions,
): Promise<MapPinPickerInstance> {
	void options;

	throw new Error("Not implemented yet");
}
