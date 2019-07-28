import React, { FC, useState, useEffect, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { fetchThemes } from './../../net';
import ThemeChooser from 'components/themeChooser';
import AppOriginBar from 'components/AppOriginBar';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import classes from './index.module.css';
import { Origin, Theme } from '../../domain';
import { DEFAULT_ORIGIN_LIST } from 'net/origin';

const Home: FC<RouteComponentProps> = (props: RouteComponentProps): JSX.Element => {

	const [originList, setOriginList] = useState<Origin[]>([]);
	const [themes, setThemes] = useState<Theme[]>([]);
	const [origin, setOrigin] = useState<string>('AMS');
	const [departureDate, setDepartureDate] = useState<Date>(new Date());
	const [returnDate, setReturnDate] = useState<Date>(addMonths(new Date(), 2));

	const handleThemeChosen = (theme: string) => {
		if (!origin)
			alert('Please choose an origin')
		else
			props.history.push(`/travel/${origin}/${format(departureDate, 'yyyy-MM-dd')}/${format(returnDate, 'yyyy-MM-dd')}/${theme}`);
	}

	const handleOriginChange = (origin: string): void => {
		setOrigin(origin);
	}

	const handleDepartureDateChange = (date: Date): void => {
		setDepartureDate(date);
	}

	const handleReturnDateChange = (date: Date): void => {
		setReturnDate(date);
	}

	const fetchThemesFromApi = (): void => {
		fetchThemes()
			.then((result): void => {
				setThemes(result);
			})
			.catch((error): void => {
				console.error('Error getting themes', error);
			});
	};

	useEffect(() => {

		fetchThemesFromApi();
		setOriginList((DEFAULT_ORIGIN_LIST));

	}, []);

	return (
		<div className={classes.root}>
			<AppOriginBar
				originList={originList}
				origin={origin}
				departureDate={departureDate}
				returnDate={returnDate}
				onChangeOrigin={handleOriginChange}
				onChangeDepartureDate={handleDepartureDateChange}
				onChangeReturnDate={handleReturnDateChange}
				/>
			{themes.map((theme, index): ReactNode => (
				<ThemeChooser key={index} onThemeClicked={handleThemeChosen} className={classes.card} label={theme.name} imageUrl={theme.image} description={theme.description} />
			))}
		</div>
	);
};

export default withRouter(Home);
