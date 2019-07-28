import { City, Holiday, PointOfInterest, Flight, TravelSuggestion } from "../domain";

const rj: City = {
	name: 'Paris',
	country: 'France'
}

const mykonos: City = {
	name: 'Mykonos',
	country: 'Greece'
}

const independencyDay: Holiday = {
	name: 'Independence Day',
	date: new Date(2019, 6, 4),
}
const bastilleDay: Holiday = {
	name: 'Bastille Day',
	date: new Date(2019, 6, 14),
}

const jericoacoara: PointOfInterest = {
	name: 'Praia de Jericoacoara',
	url: 'https://www.yelp.com/biz/praia-de-jericoacoara-fortaleza?adjust_creative=rEzI64IyODmrME8dUhoR4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rEzI64IyODmrME8dUhoR4g',
	pictureUrl: '',
	type: 'BEACH',
	rating: 5
}
const futuro: PointOfInterest = {
	name: 'Praia do Futuro',
	url: 'https://www.yelp.com/biz/praia-do-futuro-fortaleza-2?adjust_creative=rEzI64IyODmrME8dUhoR4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rEzI64IyODmrME8dUhoR4g',
	pictureUrl: '',
	type: 'BEACH',
	rating: 4
}
const iracema: PointOfInterest = {
	name: 'Praia de Iracema',
	url: 'https://www.yelp.com/biz/praia-de-iracema-fortaleza?adjust_creative=rEzI64IyODmrME8dUhoR4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rEzI64IyODmrME8dUhoR4g',
	pictureUrl: '',
	type: 'BEACH',
	rating: 5,
}

const flightAmsToParisKlm: Flight = {
	departureTime: '15:00',
	inboundDuration: '1h',
	returnTime: '18:00',
	outboundDuration: '1h',
	price: 210.0
}
const flightAmsToParisEasyJet: Flight = {
	departureTime: '12:00',
	inboundDuration: '1h',
	returnTime: '18:00',
	outboundDuration: '1h',
	price: 160.0
}
const flightAmsToParisGol: Flight = {
	departureTime: '19:30',
	inboundDuration: '5h',
	returnTime: '21:20',
	outboundDuration: '5h 30m',
	price: 225.0
}

const firstSuggestion: TravelSuggestion = {
	city: rj.name,
	country: rj.country,
	picture: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
	cheapestPrice: 160.0,
	locationUrl: 'https://www.google.com/maps/@-16.6897091,-49.2637712,13z',
	departureDate: '2018-07-15',
	returnDate: '2018-07-31',
	maxTemperature: 36,
	minTemperature: 21,
	maxWind: 18,
	weatherStatus: 'Clear day',
	holidays: [independencyDay, bastilleDay],
	poiList: [jericoacoara, futuro, iracema],
	flights: [flightAmsToParisKlm, flightAmsToParisEasyJet, flightAmsToParisGol],
}
const secondSuggestion: TravelSuggestion = {
	city: mykonos.name,
	country: mykonos.country,
	picture: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
	cheapestPrice: 250.0,
	locationUrl: 'https://www.google.com/maps/@37.4496284,25.3586033,13z',
	departureDate: '2018-07-08',
	returnDate: '2018-07-15',
	maxTemperature: 31,
	minTemperature: 17,
	precipitation: 0.45,
	maxWind: 7,
	weatherStatus: 'Cloudy',
	holidays: [],
	poiList: [iracema],
	flights: [flightAmsToParisEasyJet],
}

export const SAMPLE_SUGGESTIONS: TravelSuggestion[] = [firstSuggestion, secondSuggestion];
