import { describe, it, expect, vi, beforeEach } from "vitest";
import { geocodeAddress } from "../src/geocoder";
import { InvalidOptionsError } from "../src/errors";

const mockGeocode = vi.fn();

beforeEach(() => {
	vi.stubGlobal("google", {
		maps: {
			Geocoder: vi.fn(function () {
				return { geocode: mockGeocode };
			}),
			GeocoderStatus: { OK: "OK" },
		},
	});
});

describe("geocodeAddress", () => {
	it("should return lat and lng for a valid address", async () => {
		mockGeocode.mockImplementation((_request, callback) => {
			callback(
				[
					{
						geometry: {
							location: { lat: () => -23.42, lng: () => -51.93 },
						},
					},
				],
				"OK",
			);
		});

		const result = await geocodeAddress("Maringá PR");

		expect(result).toEqual({ lat: -23.42, lng: -51.93 });
	});

	it("should throw InvalidOptionsError if status is not OK", async () => {
		mockGeocode.mockImplementation((_request, callback) => {
			callback(null, "ZERO_RESULTS");
		});

		await expect(
			geocodeAddress("endereço inválido"),
		).rejects.toBeInstanceOf(InvalidOptionsError);
	});

	it("should throw InvalidOptionsError if results are empty", async () => {
		mockGeocode.mockImplementation((_request, callback) => {
			callback([], "OK");
		});

		await expect(
			geocodeAddress("endereço inválido"),
		).rejects.toBeInstanceOf(InvalidOptionsError);
	});
});
