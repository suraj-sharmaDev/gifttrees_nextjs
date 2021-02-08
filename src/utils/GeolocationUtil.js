/******************************************
 *  Author : Suraj Sharma
 *  Created On : Thu Jan 07 2021
 *  File : GeolocationUtil.js
 *******************************************/

/**
 * Uses navigator.geolocation api to retrieve
 * geo position of the user
 * @returns coordinates{lat:[number], lng:[number]}
 */

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getGeolocation(){
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
}

export default getGeolocation;