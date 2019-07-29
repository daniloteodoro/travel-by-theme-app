import axios from 'axios';
import locationsByThemeApiUrl from './../config';
import { ThemeComplete, TravelSuggestion, Theme } from '../domain';
// import { SAMPLE_SUGGESTIONS } from './mocked.data';

const fetchThemes = async (): Promise<Theme[]> => {
	const apiUrl = `${locationsByThemeApiUrl}themes`;

	return (await axios.get(apiUrl)).data.data;
};

const fetchThemeByName = async (themeName: string): Promise<ThemeComplete> => {
	const apiUrl = `${locationsByThemeApiUrl}themes/${themeName}`;
	return (await axios.get(apiUrl)).data.data;
};

const fetchTravelSuggestions = async (origin: string, theme: string, departureDate: string, returnDate: string): Promise<TravelSuggestion[]> => {
	const params = `theme=${theme}&start=${departureDate}&end=${returnDate}`;
	const apiUrl = `${locationsByThemeApiUrl}travels/${origin}?${params}`;

	return (await axios.get(apiUrl)).data.data;
	// return await SAMPLE_SUGGESTIONS;
};

export { fetchThemes, fetchTravelSuggestions, fetchThemeByName };
