import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './store/reducers/notificationReducer';
import bloglistReducer from './store/reducers/bloglistReducer';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';

const reducer = combineReducers({
	notification: notificationReducer,
	bloglist: bloglistReducer,
	auth: authReducer,
	users: userReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));