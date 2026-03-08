# maps-pin-picker

**Lightweight JavaScript library to pick a location on a map and generate latitude, longitude and a shareable Google Maps link.**

Drop a pin anywhere on a Google Maps satellite view, and get back the coordinates and a permanent shareable link — no frameworks required.

---

## ✨ Features

- 📍 Click or drag to place a pin on the map
- 🛰️ Hybrid satellite view by default (satellite + street names)
- 🔗 Generates a permanent shareable Google Maps URL
- 🔑 Works with your own Google Maps API key
- 📦 Zero runtime dependencies
- 🧩 Works with vanilla JS, React, Vue, or any framework

---

## 📦 Installation

```bash
npm install maps-pin-picker
```

---

## 🚀 Quick Start

```html
<div id="map" style="width: 100%; height: 400px"></div>

<script type="module">
	import { createMapPinPicker } from "maps-pin-picker";

	const picker = await createMapPinPicker({
		apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
		container: document.getElementById("map"),
		address: "Cemitério Municipal de Maringá",
		onChange(value) {
			console.log(value.lat); // -23.4205
			console.log(value.lng); // -51.9331
			console.log(value.googleMapsUrl); // https://www.google.com/maps/...
		},
	});
</script>
```

---

## ⚙️ Options

| Option       | Type                                                | Required | Description                                                           |
| ------------ | --------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `apiKey`     | `string`                                            | ✅       | Your Google Maps JavaScript API key                                   |
| `container`  | `HTMLElement`                                       | ✅       | The DOM element where the map will be rendered                        |
| `address`    | `string`                                            | ✅       | Address used to center the map initially                              |
| `onChange`   | `(value) => void`                                   | —        | Called whenever the pin is moved                                      |
| `zoom`       | `number`                                            | —        | Initial zoom level (0–21). Defaults to `17`                           |
| `mapType`    | `"roadmap" \| "satellite" \| "hybrid" \| "terrain"` | —        | Map display type. Defaults to `"hybrid"`                              |
| `initialLat` | `number`                                            | —        | Initial pin latitude (skips geocoding if provided with `initialLng`)  |
| `initialLng` | `number`                                            | —        | Initial pin longitude (skips geocoding if provided with `initialLat`) |

---

## 📬 Return value (`MapPinPickerValue`)

The `onChange` callback and `getValue()` return an object with:

```ts
{
	lat: number; // latitude
	lng: number; // longitude
	googleMapsUrl: string; // permanent shareable link
}
```

---

## 🕹️ Instance methods

```ts
const picker = await createMapPinPicker({ ... });

picker.getValue();           // returns the current value or null
picker.setValue(-23.42, -51.93); // moves the pin programmatically
picker.destroy();            // removes the map and cleans up listeners
```

---

## ⚛️ React

```tsx
import { useEffect, useRef, useState } from "react";
import { createMapPinPicker, MapPinPickerInstance } from "maps-pin-picker";

export function MapPicker() {
	const mapRef = useRef<HTMLDivElement>(null);
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		let picker: MapPinPickerInstance;

		createMapPinPicker({
			apiKey: "YOUR_KEY",
			container: mapRef.current!,
			address: "Cemitério Municipal de Maringá",
			onChange(value) {
				setUrl(value.googleMapsUrl);
			},
		}).then((p) => (picker = p));

		return () => picker?.destroy();
	}, []);

	return (
		<>
			<div ref={mapRef} style={{ width: "100%", height: 400 }} />
			{url && (
				<a href={url} target="_blank">
					Open in Google Maps
				</a>
			)}
		</>
	);
}
```

---

## 💚 Vue

```vue
<template>
	<div ref="mapEl" style="width: 100%; height: 400px" />
	<a v-if="url" :href="url" target="_blank">Open in Google Maps</a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { createMapPinPicker, MapPinPickerInstance } from "maps-pin-picker";

const mapEl = ref<HTMLDivElement>();
const url = ref<string | null>(null);
let picker: MapPinPickerInstance;

onMounted(async () => {
	picker = await createMapPinPicker({
		apiKey: "YOUR_KEY",
		container: mapEl.value!,
		address: "Cemitério Municipal de Maringá",
		onChange(value) {
			url.value = value.googleMapsUrl;
		},
	});
});

onUnmounted(() => picker?.destroy());
</script>
```

---

## 🔑 Getting a Google Maps API Key

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create or select a project
3. Enable the **Maps JavaScript API**
4. Go to **Credentials → Create Credentials → API Key**
5. Restrict the key to your domain for security

---

## 📄 License

MIT
