import React, { useState } from 'react'
import { Router, Route, Link } from 'react-router-dom';
import { history } from './components/_helpers';
import { authenticationService } from './components/_services';
import { PrivateRoute } from './components/_components';
import { HomePage } from './components/home/HomePage';
import { LoginPage } from './components/login/LoginPage';
import { CrearUsuario } from './components/login/CrearUsuario';

function componentDidMount() {
	authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

function logout() {
	authenticationService.logout();
	history.push('/login');
}

const App = () => {
	const [currentUser, setcurrentUser] = useState(null);
	return (
		<Router history={history}>
			{currentUser &&
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="navbar-nav">
						<Link to="/" className="nav-item nav-link">Home</Link>
						<a onClick={this.logout} className="nav-item nav-link">Logout</a>
					</div>
				</nav>
			}
			<PrivateRoute exact path="/" component={HomePage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/createUser" component={CrearUsuario} />
		</Router>
	);
}

export { App }; 
