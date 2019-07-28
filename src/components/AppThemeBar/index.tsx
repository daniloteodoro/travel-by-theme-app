import React, { Fragment } from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classes from './index.module.css';
import { ThemeComplete, Origin } from '../../domain';
import { DEFAULT_ORIGIN_LIST } from 'net/origin';

interface Props {
	origin: string;
	departureDate: string;
	returnDate: string;
	theme: ThemeComplete;
	className?: string;
	onGoBackEvent: () => void;
}

export default function AppThemeBar(props: Props): JSX.Element {

	const {
		origin,
		departureDate,
		returnDate,
		onGoBackEvent,
		theme
	} = props;

	const filter = theme ? theme.filter : undefined;
	const originComplete = origin ? DEFAULT_ORIGIN_LIST.find((item: Origin, index: number): boolean => {
		return item.id === origin
	}) : undefined;
	const originName = originComplete ? originComplete.name : '-';

	return (
		<div className={clsx(classes.root, props.className)}>
			<div className={classes.goBackDiv}>
				<IconButton className={classes.backButton} onClick={onGoBackEvent} size="small">
					<ArrowBackIcon
						classes={{ colorPrimary: classes.iconStyle, fontSizeInherit: classes.iconStyle }}
						fontSize="default"
						color="primary" />
				</IconButton>
			</div>
			<Avatar src={theme.image} className={classes.avatar} />
			<div className={classes.themeGroup}>
				<span className={classes.theme}>{theme.name}</span>
				<div className={classes.filterGroup}>
					{filter && <Fragment><span className={classes.filterHeader}>Min/Max. Temp: </span><span className={classes.filterContent}>{filter.minTemperature || '-'} / {filter.maxTemperature || '- '}ºC </span></Fragment>}
					{filter && <Fragment><span className={classes.filterHeader}>Max. Wind: </span><span className={classes.filterContent}>{filter.maxWindSpeed} km/h </span></Fragment>}
					{filter && <Fragment><span className={classes.filterHeader}>P.O.I.: </span><span className={classes.filterContent}>{filter.poi.length > 0 ? filter.poi.join(",") : '-'} </span></Fragment>}
					{filter && <Fragment><span className={classes.filterHeader}>Weather: </span><span className={classes.filterContent}>{filter.weatherStatus.length > 0 ? filter.weatherStatus.join(",") : '-'} </span></Fragment>}
				</div>
			</div>
			<div className={classes.separator} />
			<div className={classes.originGroup}>
				<span>Origin: {originName}</span>
				<span>Departure: {departureDate}</span>
				<span>Return: {returnDate}</span>
			</div>
		</div>
	);

};
