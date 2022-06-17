import { BehaviorSubject } from 'rxjs';
import { history } from '../_helpers';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
	getOptions() { return getOptions() },
	dni: getDni(),
	token: getToken(),
	userType: getUserType(),
    get currentUserValue () { return currentUserSubject.value },
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
        body: JSON.stringify({ "dni": getDni()})
    };
}

function getApiUrl(){
	return 'http://192.168.1.138:8081';
}

function getDni() {
	if (currentUserSubject.value != null) 
		return currentUserSubject.value['dni'];
	return "";
}

function getToken() {
	if (currentUserSubject.value != null) 
		return currentUserSubject.value['token'];
	return "";
}

function getUserType() {
	if (currentUserSubject.value != null) 
		return currentUserSubject.value['userType'];
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

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
	history.push('/login');
}