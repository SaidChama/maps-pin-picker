export type MapPinPickerValue = {
	lat: number;
	lng: number;
	googleMapsUrl: string;
};

export type CreateMapPinPickerOptions = {
	apiKey: string;
	container: HTMLElement;
	address: string;
	zoom?: number;
	initialLat?: number;
	initialLng?: number;
	onChange?: (value: MapPinPickerValue) => void;
};

export type MapPinPickerInstance = {
	getValue: () => MapPinPickerValue | null;
	setValue: (lat: number, lng: number) => void;
	destroy: () => void;
};
