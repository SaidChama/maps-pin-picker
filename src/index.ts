import { InvalidOptionsError, MapLoadError } from "./errors";
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

	const coords =
		options.initialLat !== undefined && options.initialLng !== undefined
			? { lat: options.initialLat, lng: options.initialLng }
			: await geocodeAddress(options.address);

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

	let currentValue: MapPinPickerValue | null = null;

	function handlePositionChange(latLng: google.maps.LatLng) {
		const lat = latLng.lat();
		const lng = latLng.lng();
		const googleMapsUrl = buildGoogleMapsUrl(lat, lng);

		currentValue = { lat, lng, googleMapsUrl };
		options.onChange?.(currentValue);
	}

	map.addListener("click", (event: google.maps.MapMouseEvent) => {
		if (!event.latLng) return;
		marker.setPosition(event.latLng);
		handlePositionChange(event.latLng);
	});

	marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
		if (!event.latLng) return;
		handlePositionChange(event.latLng);
	});

	return {
		getValue: () => currentValue,

		setValue: (lat: number, lng: number) => {
			const latLng = new google.maps.LatLng(lat, lng);
			marker.setPosition(latLng);
			map.panTo(latLng);
			handlePositionChange(latLng);
		},

		destroy: () => {
			marker.setMap(null);
			google.maps.event.clearInstanceListeners(map);
			google.maps.event.clearInstanceListeners(marker);
		},
	};
}
