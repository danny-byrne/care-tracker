import { useEffect, useState } from 'react';

const BING_ADDRESS_SEARCH_URI = 'https://bing.com/maps/default.aspx?';

export const useGetBingAddressUri = (address) => {
    const [location, setLocation] = useState(null);
    const [directionsUri, setDirectionsUri] = useState(null);
    const [locationUri, setLocationUri] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            // `geolocation` is available
            navigator.geolocation.getCurrentPosition((position) => {
                // If authorized, set the user's current location
                setLocation(position.coords);
            });
        }
    }, []);

    const startPointString = location ? `rtp=pos.${location.latitude}_${location.longitude}~` : '';
    const addressString = address ? address.split(' ').join('%20') : '';
    const addressUriString = address ? `adr.${addressString}` : '';

    useEffect(() => {
        //if location services are not enabled, uri will have to be base URI + 'where1='
        const uri = BING_ADDRESS_SEARCH_URI + 'where1=' + addressString;
        setLocationUri(uri);
        if (location) {
            const uri = BING_ADDRESS_SEARCH_URI + startPointString + addressUriString;
            setDirectionsUri(uri);
        }
    }, [location, addressUriString, addressString, startPointString]);

    let mapsUri = '';
    if (!address) {
        return { mapsUri };
    } else {
        mapsUri = location ? directionsUri : locationUri;
    }

    return { mapsUri };
};
