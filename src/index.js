import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './redux/reducers'
import rootSaga from './redux/sagas'

const sagaMiddleware =createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers((applyMiddleware(sagaMiddleware))));
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /> </Provider>, document.getElementById('root'));

serviceWorker.unregister();
