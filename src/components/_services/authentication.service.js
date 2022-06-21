import { BehaviorSubject } from 'rxjs';
import { history } from '../_helpers';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	login,
	logout,
	createUser,
	currentUser: currentUserSubject.asObservable(),
	getOptions() { return getOptions() },
	usuarioId: getUsuarioId(),
	getUsuarioId() { return getUsuarioId() },
	token: getToken(),
	get currentUserValue() { return currentUserSubject.value },
	apiurl: getApiUrl()
};

function getOptions() {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getToken(),
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({ "usuarioId": getUsuarioId() })
	};
}

function getApiUrl() {
	return 'http://192.168.1.138:8081';
}

function getUsuarioId() {
	if (currentUserSubject.value != null)
		return currentUserSubject.value['usuarioId'];
	return "";
}

function getToken() {
	if (currentUserSubject.value != null)
		return currentUserSubject.value['token'];
	return "";
}

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "username": username, "password": password })
	};

	return fetch(getApiUrl() + '/users/authenticate', requestOptions)
		.then(handleResponse)
		.then(user => {
			if (user['error']) {
				throw Error(user['error']);
			}
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);
			return user;
		});
}

function createUser(username, password, nombre, apellido) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "username": username, "password": password, "nombre": nombre, "apellido": apellido })
	};

	return fetch(getApiUrl() + '/users/register', requestOptions)
		.then(handleResponse)
		.then(user => {
			if (user['error']) {
				throw Error(user['error']);
			}
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);
			return user;
		});
}

function logout() {
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
	history.push('/login');
}