
export interface Theme {
	name: string;
	description: string;
	image: string;
}

export interface ThemeFilter {
	maxTemperature: number | null,
	minTemperature: number | null,
	maxWindSpeed: number | null,
	weatherStatus: string[]
	poi: string[]
}

export interface ThemeComplete {
	name: string;
	description: string;
	image: string;
	filter: ThemeFilter;
}

export interface City {
	name: string;
	country: string;
}

export interface Holiday {
	name: string;
	date: Date;
}

export interface PointOfInterest {
	type: string;
	name: string;
	url: string;
	pictureUrl: string;
	rating?: number;
}

export interface Flight {
	departureTime: string;
	inboundDuration: string;
	returnTime: string;
	outboundDuration: string;
	price: number;
}

export interface TravelSuggestion {
	city: string;
	country: string;
	picture: string;
	cheapestPrice: number;
	locationUrl: string;
	departureDate: string;
	returnDate: string;
	maxTemperature?: number;
	minTemperature?: number;
	precipitation?: number;
	maxWind?: number;
	weatherStatus?: string;
	holidays?: Holiday[];
	poiList?: PointOfInterest[];
	flights?: Flight[];
}

export interface Origin {
	id: string;
	name: string;
}

export const EMPTY_THEME_FILTER =
	{
		maxTemperature: null,
		minTemperature: null,
		maxWindSpeed: null,
		weatherStatus: [],
		poi: [],
	};

export const EMPTY_THEME =
	{
		name: "",
		description: "",
		image: "",
		filter: EMPTY_THEME_FILTER
	}
