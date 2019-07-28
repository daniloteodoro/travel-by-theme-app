import React, { FC, useState, useEffect, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { fetchTravelSuggestions, fetchThemeByName } from './../../net';
import SuggestionCard from 'components/suggestionCard';
import classes from './index.module.css';
import AppThemeBar from 'components/AppThemeBar';
import NotYetImg from '../../assets/images/notyet.gif';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { TravelSuggestion, ThemeComplete, EMPTY_THEME } from '../../domain';

enum DataStatus {
	LOADING,
	FULL,
	EMPTY
}

interface MatchParams {
	origin: string;
	departureDate: string;
	returnDate: string;
	theme: string;
}

interface Props extends RouteComponentProps<MatchParams> {

}

const SuggestionByTheme: FC<Props> = (props: Props): JSX.Element => {
	const [travelSuggestion, setTravelSuggestion] = useState<TravelSuggestion[]>([]);
	const [selectedTheme, setSelectedTheme] = useState<ThemeComplete>(EMPTY_THEME);
	const [alternativePicture, setAlternativePicture] = useState<string>('');
	const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.LOADING);

	const {
		origin,
		departureDate,
		returnDate,
		theme
	} = props.match.params;

	useEffect(() => {

		const fetchThemeByNameFromApi = (name: string): void => {
			fetchThemeByName(name)
				.then((result): void => {
					setSelectedTheme(result);
					if (result)
						setAlternativePicture(result.image);
				})
				.catch((error): void => {
					console.error(`Error getting theme ${name}`, error);
				});
		};

		const fetchTravelSuggestionsFromApi = (): void => {
			setDataStatus(DataStatus.LOADING);
			fetchTravelSuggestions(origin, theme, departureDate, returnDate)
				.then((result): void => {
					setTravelSuggestion(result);
					if (result && result.length > 0)
						setDataStatus(DataStatus.FULL);
					else
						setDataStatus(DataStatus.EMPTY);
				})
				.catch((error): void => {
					setDataStatus(DataStatus.EMPTY);
					console.error('Error getting themes', error);
				});
		};

		fetchThemeByNameFromApi(theme);
		fetchTravelSuggestionsFromApi();

	}, [origin, departureDate, returnDate, theme]);

	return (
		<main className={classes.main}>
			<AppThemeBar
				origin={origin}
				departureDate={departureDate}
				returnDate={returnDate}
				theme={selectedTheme}
				onGoBackEvent={(): void => {props.history.push('/');}}
				/>
			
			{dataStatus === DataStatus.LOADING &&
				<div className={classes.loadingBar}>
					<span>Loading...</span>
					<LinearProgress />
				</div>
			}

			{dataStatus === DataStatus.FULL &&
				<div id="suggestion-list" className={classes.suggestionList}>
					{travelSuggestion.map((suggestion, index): ReactNode => (
						<SuggestionCard 
							key={index}
							className={classes.suggestionItem}
							suggestion={suggestion}
							alternativePicture={alternativePicture}/>
					))}
				</div>
			}

			{dataStatus === DataStatus.EMPTY &&
				<div className={classes.noDataBox}>
					<div className={classes.noDataGrid}>
						<span>No information available :(</span>
						<Button size="small" color="default" onClick={ (): void => { props.history.push('/'); } }>Try another search</Button>
						<img src={NotYetImg} alt="" />
					</div>
				</div>
			}

		</main>
	);
};

export default withRouter(SuggestionByTheme);
