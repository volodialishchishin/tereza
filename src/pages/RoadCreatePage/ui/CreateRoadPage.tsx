import React from 'react';
import Map from  './Map'


const containerStyle = {
    width: '600px',
    height: '400px'
};

const center = {
    lat: 50.4501, // Київ, як приклад
    lng: 30.5234
};

const MapComponent = () => {

// Додайте в App.js

    return (
        // @ts-ignore
        <div className="App">
                {/* @ts-ignore */}

            <Map  />
        </div>
    );

};

export default  MapComponent;
