import React, { Fragment } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TravelSuggestion, Holiday } from './../../domain';
import Fade from '@material-ui/core/Fade';
import classes from './index.module.css';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import DateIcon from '@material-ui/icons/DateRange';
import CloudIcon from '@material-ui/icons/CloudOutlined';
import SunIcon from '@material-ui/icons/WbSunny';
import format from 'date-fns/format';
import { CSSProperties } from 'react';


export type OnActionClick = () => void;
export type OnMapClick = () => void;

interface Props {
	className?: string;
	suggestion: TravelSuggestion;
	onActionClick: OnActionClick;
	style?: CSSProperties;
	alternativePicture?: string;
}

const useStyles = makeStyles(
	createStyles({
		media: {
			height: 140,
		},
	}),
);

const ThermometerIcon = () => 
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width="24px"
		height="24px"
		preserveAspectRatio="xMidYMid meet"
		viewBox="0 0 24 24"
		style={{ color: '#00cccc', msTransform: 'rotate(360deg)', WebkitTransform: 'rotate(360deg)', transform: 'rotate(360deg)' }}
	>
			<path d="M17 17a5 5 0 1 1-8-4V5a3 3 0 1 1 6 0v8c1.214.912 2 2.364 2 4zm-6-9v6.17a3.001 3.001 0 1 0 2 0V8h-2z" fill="currentColor"/>
	</svg>;

export default function SuggestionCardCover(props: Props): JSX.Element {

	const localClasses = useStyles();

	const {
		suggestion,
		onActionClick,
		alternativePicture,
	} = props;

	const holidays: Array<Holiday> = [];
	if (props.suggestion.holidays) {
		props.suggestion.holidays.forEach( (holiday: Holiday, index: number) => {
			holidays.push(holiday);
		});
	}

	const formatHoliday = (holiday: Holiday): string => {
		return `${holiday.name} on ${format(new Date(holiday.date), 'dd/MMM')}`;
	}

	const buildHolidayList = (holidays: Holiday[]): string => {
		if (holidays.length === 0)
			return '';

		let list = formatHoliday(holidays[0]);
		if (holidays.length === 1)
			return list;

		for (let index = 1; index < holidays.length; index++) {
			list += ` and ${formatHoliday(holidays[index])}`;
		}
		
		return list;
	}

	const handleViewMapClick = (url: string): void => {
		window.open(url, '_blank','noopener');
	}

	return (
		<Fade timeout={500} in={true} >
			<div {...props}>
				<CardActionArea onClick={onActionClick}>
					<CardMedia
						className={localClasses.media}
						image={props.suggestion.picture ? props.suggestion.picture : alternativePicture}
						title={props.suggestion.city}
					/>
					<CardContent>
						<div className={classes.cardHeader}>
							<Typography gutterBottom variant="h5" component="h2">
								{props.suggestion.country} - {props.suggestion.city}
							</Typography>
							<div className={clsx(classes.cardContent, classes.defaultFont)}>
								<Typography variant="body2" align="right" color="textSecondary" component="p">
									<span>Price: EUR {props.suggestion.cheapestPrice}</span>
								</Typography>
								<div className={classes.aligned}>
									<FlightIcon fontSize="small" color="primary" />
									<span className={classes.fieldHeader}>Departure:</span>
									<span className={classes.spacing}>{props.suggestion.departureDate}</span>
									<span>Return:</span>
									<span className={classes.spacing}>{props.suggestion.returnDate}</span>
								</div>
								<div className={classes.aligned}>
									<ThermometerIcon />
									<span className={classes.fieldHeader}>Max. Temp:</span>
									<span className={classes.spacing}>{props.suggestion.maxTemperature}º C</span>
									<span>Min. Temp:</span>
									<span className={classes.spacing}>{props.suggestion.minTemperature}º C</span>
								</div>
								<div className={classes.aligned}>
									{props.suggestion.precipitation ?
										<Fragment>
											<CloudIcon fontSize="small" color="primary" />
											<span className={classes.fieldHeader}>Rain/Wind:</span>
											<span className={classes.spacing}>{(props.suggestion.precipitation * 100).toFixed(0)}% / {props.suggestion.maxWind}km/h</span>
										</Fragment>
										: 
										<Fragment>
											<SunIcon fontSize="small" color="primary" />
											<span className={classes.fieldHeader}>Max. Wind:</span>
											<span className={classes.spacing}>{props.suggestion.maxWind} km/h</span>
										</Fragment>
									}
									<span>Weather:</span>
									<span className={classes.spacing}>{props.suggestion.weatherStatus}</span>
								</div>
								{holidays.length > 0  &&
									<div className={classes.holidayList}>
										<Fragment>
											<DateIcon fontSize="small" color="secondary" />
											<span className={classes.fieldHeader}>Holidays!</span>
											<span className={classes.spacing}>{buildHolidayList(holidays)}</span>
										</Fragment>
									</div>
								}
							</div>
						</div>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary" onClick={onActionClick} >
						See More
					</Button>
					<Button size="small" color="default" onClick={ (): void => { handleViewMapClick(suggestion.locationUrl); } } >
						View Map
					</Button>
				</CardActions>
			</div>
		</Fade>
	);
};
