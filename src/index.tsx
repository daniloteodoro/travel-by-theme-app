import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { create } from 'jss';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

import Home from './pages/Home';
import SuggestionByTheme from './pages/SuggestionByTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00cccc',
		},
	},
	typography: {
		fontSize: 16,
		fontFamily: [
			'Barlow',
			'sans-serif',
		].join(','),
	},
});

const jss = create({
	...jssPreset(),
	insertionPoint: 'jss-insertion-point',
});

const root =
	<StylesProvider jss={jss}>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<Router>
				<Route path="/" exact component={Home} />
				<Route path="/travel/:origin/:departureDate/:returnDate/:theme" component={SuggestionByTheme} />
			</Router>
		</ThemeProvider>
	</StylesProvider>;

ReactDOM.render(root, document.getElementById('root'));
