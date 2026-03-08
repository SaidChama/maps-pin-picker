import { describe, it, expect } from "vitest";
import { buildGoogleMapsUrl } from "../src/utils";

describe("buildGoogleMapsUrl", () => {
	it("should generate a valid Google Maps URL", () => {
		const url = buildGoogleMapsUrl(-23.4205, -51.9331);

		expect(url).toBe(
			"https://www.google.com/maps/search/?api=1&query=-23.4205,-51.9331",
		);
	});
});
