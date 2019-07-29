import React, { ReactNode } from 'react';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@material-ui/core/Avatar';
import appImage from '../../assets/images/travel.jpg';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import classes from './index.module.css';
import { Origin } from '../../domain';

interface Props {
	originList: Origin[],
	origin?: string;
	departureDate?: Date;
	returnDate?: Date;
	onChangeOrigin: (origin: string) => void;
	onChangeDepartureDate: (date: Date) => void;
	onChangeReturnDate: (date: Date) => void;
	className?: string;
}

export default function AppOriginBar(props: Props): JSX.Element {

	const {
		originList,
		origin,
		departureDate,
		returnDate,
		onChangeOrigin,
		onChangeDepartureDate,
		onChangeReturnDate,
		className,
	} = props;

	const handleOriginChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		onChangeOrigin(event.target.value);
	};

	function handleDepartureChange(date: Date | null) {
		if (date)
			onChangeDepartureDate(date);
	}

	function handleReturnChange(date: Date | null) {
		if (date)
			onChangeReturnDate(date);
	}

	return (
		<div className={clsx(classes.root, className)}>
			<Avatar src={appImage} className={classes.appAvatar}>Themes</Avatar>
			<div className={classes.themeGroup}>
				<span className={classes.theme}>Travel by Theme App</span>
				<span>Fill out the fields on the right and <br />choose a theme below to continue</span>
			</div>
			<div className={classes.separator} />
			<div className={classes.originGroup}>
				<FormControl className={classes.formControl}>
					<InputLabel shrink htmlFor="select-origin">Origin</InputLabel>
					<NativeSelect
						value={origin}
						onChange={handleOriginChange}
						input={<Input name="age" id="select-origin" />}
					>
						<option value="" />
						{originList.map((origin, index): ReactNode => (
							<option key={index} value={origin.id}>{origin.name}</option>
						))}
					</NativeSelect>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						margin="none"
						id="departureDatePicker"
						label="Departure"
						value={departureDate}
						onChange={handleDepartureChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						margin="none"
						id="returnDatePicker"
						label="Return"
						value={returnDate}
						onChange={handleReturnChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</div>
		</div>
	);

};
