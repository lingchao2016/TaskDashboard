import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MyTasks from './pages/tasks/mytasks'
import NewTasks from './pages/tasks/newtask'
import EditTaskForm from './pages/tasks/edittask'
import MyCalendar from './pages/calendar/mycalendar'
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import axios from 'axios';
import reduxThunk from 'redux-thunk';

window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={MyTasks} />
					<Route exact path="/mytasks" component={MyTasks} />
          <Route exact path="/mytasks/new" component={NewTasks} />
					<Route exact path="/mytasks/:taskid" component={EditTaskForm} />
          <Route exact path="/calendar" component={MyCalendar} />
				</Switch>
			</div>
		)
	}
}
ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Routes />
		</HashRouter>

	</Provider>,
	 document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
