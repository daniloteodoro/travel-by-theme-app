import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import SuggestionCardCover from 'components/suggestionCardCover';
import SuggestionCardBack from 'components/suggestionCardBack';
import { TravelSuggestion } from '../../domain';

enum CardPageType {
	COVER_PAGE,
	BACK_PAGE
}

interface Props {
	className?: string;
	suggestion: TravelSuggestion;
	alternativePicture: string;
}

const useStyles = makeStyles(
	createStyles({
		card: {
			maxWidth: 440,
			minWidth: 440,
		},
	}),
);

export default function SuggestionCard(props: Props): JSX.Element {

	const [pageIndex, setPageIndex] = useState<CardPageType>(CardPageType.COVER_PAGE);

	const localClasses = useStyles();

	const handleSeeAllFlightsClick = (): void => {
		if (pageIndex === CardPageType.COVER_PAGE) {
			setPageIndex(CardPageType.BACK_PAGE);
		} else {
			setPageIndex(CardPageType.COVER_PAGE);
		};
	}

	return (
		<Card className={clsx(localClasses.card, props.className)}>
			{ pageIndex === CardPageType.COVER_PAGE ?
				<SuggestionCardCover suggestion={props.suggestion} alternativePicture={props.alternativePicture} onActionClick={handleSeeAllFlightsClick} />
			: 
				<SuggestionCardBack suggestion={props.suggestion} alternativePicture={props.alternativePicture} onActionClick={handleSeeAllFlightsClick} />
			}
		</Card>
	);
};
