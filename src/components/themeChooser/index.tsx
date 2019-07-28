import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

interface Props {
	className?: string;
	label: string;
	description?: string;
	imageUrl: string;
	onThemeClicked: (name: string) => void;
}

const useStyles = makeStyles(theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	  minWidth: 300,
	  width: '100%',
	},
	image: {
	  position: 'relative',
	  height: 200,
	  [theme.breakpoints.down('xs')]: {
		width: '100% !important', // Overrides inline-style
		height: 100,
	  },
	  '&:hover, &$focusVisible': {
		zIndex: 1,
		'& $imageBackdrop': {
		  opacity: 0.15,
		},
		'& $imageMarked': {
		  opacity: 0,
		},
		'& $imageTitle': {
		  border: '4px solid currentColor',
		},
	  },
	},
	focusVisible: {},
	imageButton: {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	  color: theme.palette.common.white,
	},
	imageSrc: {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  backgroundSize: 'cover',
	  backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  backgroundColor: theme.palette.common.black,
	  opacity: 0.4,
	  transition: theme.transitions.create('opacity'),
	},
	imageTitle: {
	  position: 'relative',
	  padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
	},
	imageMarked: {
	  height: 3,
	  width: 18,
	  backgroundColor: theme.palette.common.white,
	  position: 'absolute',
	  bottom: -2,
	  left: 'calc(50% - 9px)',
	  transition: theme.transitions.create('opacity'),
	},
  }));

export default function ThemeChooser(props: Props): JSX.Element {

	const localClasses = useStyles();

	const {
		className,
		label,
		description,
		imageUrl,
		onThemeClicked,
	} = props;

	return (
		<ButtonBase
          focusRipple
          key={label}
          className={clsx(localClasses.image, className)}
		  focusVisibleClassName={localClasses.focusVisible}
		  title={description}
		  onClick={(): void => { onThemeClicked(label); } }
          style={{
            width: '48%',
          }}
        >
          <span
            className={localClasses.imageSrc}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
          <span className={localClasses.imageBackdrop} />
          <span className={localClasses.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={localClasses.imageTitle}
            >
              {label}
              <span className={localClasses.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
	);
};
