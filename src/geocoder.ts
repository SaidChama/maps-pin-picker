// src/geocoder.ts
import { InvalidOptionsError } from "./errors";

export type LatLng = {
	lat: number;
	lng: number;
};

export async function geocodeAddress(address: string): Promise<LatLng> {
	return new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ address }, (results, status) => {
			if (status !== google.maps.GeocoderStatus.OK || !results?.[0]) {
				return reject(
					new InvalidOptionsError(
						`Could not geocode address: "${address}"`,
					),
				);
			}

			const location = results[0].geometry.location;

			resolve({
				lat: location.lat(),
				lng: location.lng(),
			});
		});
	});
}
