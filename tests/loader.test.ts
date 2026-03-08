import { describe, it, expect, beforeEach } from "vitest";
import { loadGoogleMapsApi } from "../src/loader";
import { MapLoadError } from "../src/errors";

beforeEach(() => {
	document
		.querySelectorAll("script[data-maps-pin-picker]")
		.forEach((el) => el.remove());

	delete (window as unknown as Record<string, unknown>).google;
});

describe("loadGoogleMapsApi", () => {
	it("should resolve immediately if google.maps is already loaded", async () => {
		(window as unknown as Record<string, unknown>).google = { maps: {} };

		await expect(loadGoogleMapsApi("my-api-key")).resolves.toBeUndefined();
	});

	it("should inject a script tag with the correct src", () => {
		loadGoogleMapsApi("my-api-key");

		const script = document.querySelector<HTMLScriptElement>(
			"script[data-maps-pin-picker]",
		);

		expect(script).not.toBeNull();
		expect(script?.src).toContain("key=my-api-key");
	});

	it("should resolve when script loads", async () => {
		const promise = loadGoogleMapsApi("my-api-key");

		const script = document.querySelector<HTMLScriptElement>(
			"script[data-maps-pin-picker]",
		)!;
		script.dispatchEvent(new Event("load"));

		await expect(promise).resolves.toBeUndefined();
	});

	it("should reject with MapLoadError when script fails", async () => {
		const promise = loadGoogleMapsApi("my-api-key");

		const script = document.querySelector<HTMLScriptElement>(
			"script[data-maps-pin-picker]",
		)!;
		script.dispatchEvent(new Event("error"));

		await expect(promise).rejects.toBeInstanceOf(MapLoadError);
	});

	it("should not inject a second script if one is already loading", () => {
		loadGoogleMapsApi("my-api-key");
		loadGoogleMapsApi("my-api-key");

		const scripts = document.querySelectorAll(
			"script[data-maps-pin-picker]",
		);
		expect(scripts).toHaveLength(1);
	});
});
