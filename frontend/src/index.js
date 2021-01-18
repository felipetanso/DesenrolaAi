import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Signup from './views/signup';
import Login from './views/login';
import Dashboard from './views/dashboard/dashboard';
import DISC from './views/dashboard/disc';
import Daily from './views/dashboard/daily';

ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact={true} component={App}/>
					<Route path="/signup" component={Signup}/>
					<Route path="/login" component={Login}/>
					<Route path="/dashboard" exact component={Dashboard}/>
					<Route path="/dashboard/:id" component={Dashboard}/>
					<Route path="/disc" component={DISC}/>
					<Route path='/daily' component={Daily}/>
				</Switch>
			</BrowserRouter>
		</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
