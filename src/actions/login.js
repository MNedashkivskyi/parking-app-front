import { SHA256 } from 'crypto-js';

import serverAddress from '../constants/serverAddress';

export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';
export const CHECK_LOGIN = 'CHECK_LOGIN';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

export const signIn = (login, password) => {
    return async dispatch => {
        console.log('[dispatch] signing in...')

        const username = login;
        // password = SHA256(password).toString();
        
        var response;
        try {
            response = await fetchWithTimeout(
                `http://${serverAddress.address}:8080/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: SIGN_IN, token: null });
            }
            console.log("Some error occurred: " + error.toString());
            return dispatch({ type: SIGN_IN, token: null });
        }

        console.log(`response status: ${response.status}`);

        let id = null;
        // let token = null;
        if(response.status == 200) {
            const respData = await response.json();
            console.log(respData);
            id = respData.id;
            console.log(`Received id: ${id}`);
            // token = respData.token;
            // console.log(`Received token: ${token}`);
        } else if (response.status == 403) {
            console.log(`Request rejected. Wrong credentials.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        dispatch({ type: SIGN_IN, token: id }); // token: token
    }
};

export const logInWithGoogle = googleToken => {
    return async dispatch => {
        console.log('[dispatch] signing in with Google...')

        var first_response;
        try {
            first_response = await fetchWithTimeout('https://www.googleapis.com/oauth2/v3/userinfo', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${googleToken}`,
                  'Content-Type': 'application/json'
                },
            });
        } catch (error) {
            if (error.name === 'AbortError')
                return dispatch({ type: SIGN_IN, token: null });
        }
        
        console.log(`response status: ${first_response.status}`);
        const respData = await first_response.json();
        console.log(respData);

        const  { email } = respData;
        const { sub } = respData;

        console.log('login: ' + email);
        console.log('password: ' + sub);

        const name = email;
        const password = SHA256(sub).toString();
        
        try {
        response = await fetch(
            `http://${serverAddress.address}:8080/auth/loginWithGoogle`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password
                })
            }
        );
        } catch (error) {
            if (error.name === 'AbortError')
                return dispatch({ type: SIGN_IN, token: null });
        }
        console.log(`response status: ${second_response.status}`);
        let token = null;
        if(first_response.status == 200) {
            const respData = await second_response.json();
            token = respData.token;
            console.log(`Received token: ${token}`);
        } else if (first_response.status == 403) {
            console.log(`Request rejected. Wrong credentials.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        dispatch({ type: SIGN_IN, token: token });
    }
};

export const register = (login, password, email) => {
    return async dispatch => {
        console.log('[dispatch] registering...');

        const username = login;
        const mail = email;
        // password = SHA256(password).toString();

        var response;
        try {
        response = await fetch(
            `http://${serverAddress.address}:8080/auth/register`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    mail
                })
            }
        );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: REGISTER, outcome: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: REGISTER, outcome: null });
        }

        console.log(`response status: ${response.status}`);
        if(response.status == 200 || response.status == 201) {
            console.log(`Registration successful!`);
            dispatch({ type: REGISTER, outcome: true });
        } else if (response.status == 409) {
            console.log(`Request rejected. Wrong credentials. Try changing your login.`);
            dispatch({ type: REGISTER, outcome: false });
        } else {
            console.log(`Request rejected for unknown reason.`);
            dispatch({ type: REGISTER, outcome: null });
        }
    }
};

export const checkLogin = (login) => {
    console.log(`[dispatch] checking login: ${login}`);
    return async dispatch => {
        var response;
        try {
        response = await fetch(
            `http://${serverAddress.address}:8080/auth/check?name=${login}`
        );
        } catch (error) {
            if (error.name === 'AbortError')
                return dispatch({ type: CHECK_LOGIN, outcome: null });
        }

        console.log(`response status: ${response.status}`);
        if(response.status == 200) {
            console.log(`Login available`);
            dispatch({ type: CHECK_LOGIN, outcome: true });
        } else if (response.status == 409) {
            console.log(`User with this name already exists.`);
            dispatch({ type: CHECK_LOGIN, outcome: false });
        } else {
            console.log(`Request rejected for unknown reason.`);
            dispatch({ type: CHECK_LOGIN, outcome: null });
        }
    }
};