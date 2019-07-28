import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import classes from './index.module.css';
import LocationIcon from '@material-ui/icons/LocationOn';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import { CSSProperties } from 'react';
import Rating from '@material-ui/lab/Rating';
import { TravelSuggestion } from '../../domain';


export type OnActionClick = () => void;

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

export default function SuggestionCardBack(props: Props): JSX.Element {

	const localClasses = useStyles();

	const {
		onActionClick,
		alternativePicture
	} = props;

	const handlePOIClick = (url: string): void => {
		window.open(url, '_blank', 'noopener');
	};

	return (
		<Fade timeout={500} in={true} >
			<div {...props} className={classes.root}>
				<CardActionArea className={classes.cardActionArea}>
					<CardMedia
						onClick={onActionClick}
						className={localClasses.media}
						image={props.suggestion.picture ? props.suggestion.picture : alternativePicture}
						title={props.suggestion.city}
					/>
					<CardContent className={classes.cardContent}>
						<div className={classes.cardHeader}>
							<Typography gutterBottom variant="h6" component="h4">
								{props.suggestion.country} - {props.suggestion.city}
							</Typography>
							<div>
								{props.suggestion.poiList && props.suggestion.poiList.map((poi, index) => (
									<Fragment key={index}>
										<div className={classes.pointOfInterest}>
											<LocationIcon fontSize="small" color="primary" style={{marginRight: '5px'}} />
											<Button size="small" color="default" onClick={ (): void => { handlePOIClick(poi.url); } }>{poi.name}</Button>
											<Rating size="small" value={poi.rating || null} readOnly />
										</div>
									</Fragment>
								))}
							</div>
						</div>
						<div className={classes.cardFlights} >
							<Typography variant="body2" align="left" color="textSecondary" component="p">
								<span>Suggested flights</span>
							</Typography>
							{props.suggestion.flights && props.suggestion.flights.map((flight, index) => (
								<Fragment key={index}>
									<div className={classes.flightGroup}>
										<FlightIcon fontSize="small" color="primary" style={{marginRight: '5px'}} />
										<span className={classes.flight}>{flight.departureTime} ({flight.inboundDuration})</span>
										<span className={classes.flight}>{flight.returnTime} ({flight.outboundDuration})</span>
										<span className={classes.flight}>EUR {flight.price}</span>
									</div>
								</Fragment>
							))}
						</div>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.cardActions}>
					<Button size="small" color="primary" onClick={onActionClick} >
						See travel suggestion
					</Button>
				</CardActions>
			</div>
		</Fade>
	);
};
