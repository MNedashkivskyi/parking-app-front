import serverAddress from '../constants/serverAddress';

export const GET_PARKING = 'GET_PARKING';
export const OCCUPY_PLACE = 'OCCUPY_PLACE';
export const GET_PARKINGS_LIST = 'GET_PARKINGS_LIST';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 2000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

export const fetchParking = () => {
    return async dispatch => {
        console.log("fetch parking...")
        var response;
        try {
            response = await fetchWithTimeout(
            `http://${serverAddress.address}:8080/places`
        );
        } catch (error) {
            if (error.name === 'AbortError')
                return dispatch({ type: GET_PARKING, places: null });
        }

        const respData = await response.json();
        const loadedPlaces = []

        for (const key in respData.places) {
            const place = respData.places[+key];
            loadedPlaces.push(place);
        }
        console.log('dispatching...');
        dispatch({ type: GET_PARKING, places: loadedPlaces });
    }
};

export const fetchParkingsList = (city=null) => {
    return async dispatch => {
        var response;
        console.log("fetch parkings list...")
        try {
            response = await fetchWithTimeout(
                `http://${serverAddress.address}:8080/parking_lots${city == null ? '' : `?city=${city}`}`
            );
        } catch (error) {
            if (error.name === 'AbortError')
                return dispatch({ type: GET_PARKINGS_LIST, parkings: null });
        }
        
        const respData = await response.json();
        const loadedParkings = []

        for (const key in respData.parking_lots) {
            const parking = respData.parking_lots[+key];
            loadedParkings.push(parking);
        }
        console.log('dispatching...');
        dispatch({ type: GET_PARKINGS_LIST, parkings: loadedParkings });
    }
}

export const occupyPlace = (place_id, car_id) => {
    return async dispatch => {
        console.log(`occupy place ${place_id} with car ${car_id}`)
        const response = await fetch(
            `http://${serverAddress.address}:8080/places/occupy?id=${place_id}&car=${car_id}`,
            {
                method: 'PUT'
            }
        );
        console.log(`occupy response code: ${response.status}`);

        let outcome;
        if(response.status == 200)
            outcome = true;
        else if (response.status == 409)
            outcome = false;
        else outcome = null;

        dispatch({ type: OCCUPY_PLACE, outcome: outcome });
        return outcome;
    }
};
