import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Link, browserHistory, hashHistory} from 'react-router';
import Header from './partials/Header';

import configStore from './reduxStore';
import simpleLogger from './middlewares/simpleLogger';
import HomeApp from './home/homeApp';
import TodoApp from './todo/todoApp';
import BookApp from './book/BookApp';
import SignupPage from './auth/SignupPage';
import SigninPage from './auth/SigninPage';
import NoteApp from './note/NoteApp';

import './utils/genericPipes';

let store = configStore;

const App = ({children}) => (
		<div id="app-body">
			{children}
      </div>
	);

class AppRoutes extends React.Component{
	render() {

		return (

			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path='/' component = {App} >
						<IndexRoute component={BookApp} />
						<Route path='home-app' component={HomeApp} />
						<Route path='todo-app' component={TodoApp} />
						<Route path='book-app' component={BookApp} />
						<Route path='signup' component={SignupPage} />
						<Route path='signin' component={SigninPage} />
						<Route path='note-app' component={NoteApp} />
					</Route>
				</Router>
			</Provider>

			)
	}
};

export default AppRoutes;
