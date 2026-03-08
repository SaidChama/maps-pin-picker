export class InvalidOptionsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidOptionsError";
	}
}

export class MapLoadError extends Error {
	cause?: unknown;

	constructor({ cause }: { cause?: unknown } = {}) {
		super("Failed to load Google Maps API");
		this.name = "MapLoadError";
		this.cause = cause;
	}
}

export class NotImplementedError extends Error {
	constructor() {
		super("Not implemented yet");
		this.name = "NotImplementedError";
	}
}
