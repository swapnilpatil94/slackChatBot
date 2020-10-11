import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { SnackbarProvider } from 'notistack';

import store from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './Components/Layout/theme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
    <SnackbarProvider>
    <Provider store={store}>     
      <App />
    </Provider>
    </SnackbarProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
