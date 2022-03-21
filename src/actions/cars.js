import serverAddress from '../constants/serverAddress';
import '../constants/global.js';

export const ADD_CAR = 'ADD_CAR';
export const DELETE_CAR = 'DELETE_CAR';
export const GET_CAR_INFO = 'GET_CAR_INFO';
export const GET_CARS = 'GET_CARS';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 15000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

export const addCar = (manufacturer, model, registration) => {
    return async dispatch => {
        console.log('[dispatch] adding new car...');

        const owner_id = global.user_id;
        const registration_number = registration;

        var response;
        try {
        response = await fetchWithTimeout(
            `http://${serverAddress.address}:8080/cars`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    owner_id,
                    manufacturer,
                    model,
                    registration_number
                })
            }
        );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: ADD_CAR, outcome: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: ADD_CAR, outcome: null });
        }

        console.log(`response status: ${response.status}`);
        if(response.status == 201) {
            console.log(`Car successfully added!`);
            dispatch({ type: ADD_CAR, outcome: true });
        } else if (response.status == 500) {
            console.log(`Request rejected.`);
            dispatch({ type: ADD_CAR, outcome: false });
        } else {
            console.log(`Request rejected for unknown reason.`);
            dispatch({ type: ADD_CAR, outcome: null });
        }
    }
};

export const deleteCar = (registration) => {
    return async dispatch => {
        console.log(`[dispatch] deleting car ${registration}...`);

        const registration_number = registration;

        var response;
        try {
        response = await fetchWithTimeout(
            `http://${serverAddress.address}:8080/cars`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    registration_number
                })
            }
        );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: DELETE_CAR, outcome: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: DELETE_CAR, outcome: null });
        }

        console.log(`response status: ${response.status}`);
        if(response.status == 202) {
            console.log(`Car successfully removed from your account!`);
            dispatch({ type: DELETE_CAR, outcome: true });
        } else if (response.status == 500) {
            console.log(`Request rejected.`);
            dispatch({ type: DELETE_CAR, outcome: false });
        } else {
            console.log(`Request rejected for unknown reason.`);
            dispatch({ type: DELETE_CAR, outcome: null });
        }
    }
};

export const fetchMyCars = () => {
    return async dispatch => {
        console.log("[dispatch] fetching cars...")
        var response;
        try {
            response = await fetchWithTimeout(
            `http://${serverAddress.address}:8080/cars?owner=${global.user_id}`
        );
        } catch (error) {
            if (error.name === 'AbortError')
            {
                console.log("AbortError occurred");
                return dispatch({ type: GET_CARS, cars: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: GET_CARS, cars: null });
                
        }
        const respData = await response.json();
        dispatch({ type: GET_CARS, cars: respData });
    }
};

export const getBatterryStatus = (car_id) => {
    return async dispatch => {
        console.log(`[dispatch] getting battery info about car #${car_id}...`)
        var response;
        try {
            response = await fetchWithTimeout(
            `http://${serverAddress.address}:8080/cars/info?id=${car_id}`
        );
        } catch (error) {
            if (error.name === 'AbortError')
            {
                console.log("AbortError occurred");
                return dispatch({ type: GET_BATTERY, status: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: GET_BATTERY, status: null });
        }
        const respData = await response.json();
        dispatch({ type: GET_BATTERY, status: respData });
    }
};