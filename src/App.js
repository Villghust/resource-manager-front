import React from 'react';
import { Provider } from 'react-redux';

import MomentUtils from '@date-io/moment';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import store from './providers/Store';
import Routes from './routes';
import 'moment/locale/pt-br';
import theme from './styles/muiTheme';

moment.locale('pt-br');

function App() {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-BR">
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <div>
                        <CssBaseline />
                        <Routes />
                    </div>
                </Provider>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
