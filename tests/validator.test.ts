import { describe, it, expect } from "vitest";
import { validateOptions } from "../src/validator";
import { InvalidOptionsError } from "../src/errors";

const validOptions = {
	apiKey: "my-api-key",
	container: document.createElement("div"),
	address: "Maringá PR",
};

describe("validateOptions", () => {
	it("should not throw for valid options", () => {
		expect(() => validateOptions(validOptions)).not.toThrow();
	});

	it("should throw InvalidOptionsError if apiKey is missing", () => {
		expect(() => validateOptions({ ...validOptions, apiKey: "" })).toThrow(
			InvalidOptionsError,
		);
	});

	it("should throw InvalidOptionsError if container is not an HTMLElement", () => {
		expect(() =>
			validateOptions({
				...validOptions,
				container: null as unknown as HTMLElement,
			}),
		).toThrow(InvalidOptionsError);
	});

	it("should throw InvalidOptionsError if address is missing", () => {
		expect(() => validateOptions({ ...validOptions, address: "" })).toThrow(
			InvalidOptionsError,
		);
	});

	it("should throw InvalidOptionsError if zoom is out of range", () => {
		expect(() => validateOptions({ ...validOptions, zoom: 25 })).toThrow(
			InvalidOptionsError,
		);
	});

	it("should not throw if zoom is valid", () => {
		expect(() =>
			validateOptions({ ...validOptions, zoom: 15 }),
		).not.toThrow();
	});
});
