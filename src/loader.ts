import { MapLoadError } from "./errors";

export async function loadGoogleMapsApi(apiKey: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (window.google?.maps) {
			return resolve();
		}

		const existing = document.querySelector<HTMLScriptElement>(
			"script[data-maps-pin-picker]",
		);
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () =>
				reject(new MapLoadError()),
			);
			return;
		}

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
		script.async = true;
		script.dataset.mapsPinPicker = "true";

		script.addEventListener("load", () => resolve());
		script.addEventListener("error", () => reject(new MapLoadError()));

		document.head.appendChild(script);
	});
}
