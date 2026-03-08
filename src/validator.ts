import { CreateMapPinPickerOptions } from "./types";
import { InvalidOptionsError } from "./errors";

export function validateOptions(options: CreateMapPinPickerOptions): void {
	if (!options.apiKey || typeof options.apiKey !== "string") {
		throw new InvalidOptionsError(
			"apiKey is required and must be a string",
		);
	}

	if (!(options.container instanceof HTMLElement)) {
		throw new InvalidOptionsError("container must be a valid HTMLElement");
	}

	if (!options.address || typeof options.address !== "string") {
		throw new InvalidOptionsError(
			"address is required and must be a string",
		);
	}

	if (
		options.zoom !== undefined &&
		(typeof options.zoom !== "number" ||
			options.zoom < 0 ||
			options.zoom > 21)
	) {
		throw new InvalidOptionsError("zoom must be a number between 0 and 21");
	}
}
