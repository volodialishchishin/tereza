import React, { MouseEvent, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsRenderer,
    Autocomplete,
} from '@react-google-maps/api';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

const mapContainerStyle = {
    width: '1000px',
    height: '1000px',
};

const center = {
    lat: 49.842957,
    lng: 24.031111,
};
const places = ['places']
// @ts-ignore
const Map = () => {

    const [markers, setMarkers] = useState([]);
    const [startMark, setStart] = useState('')
    const [pause, setBreak] = useState('')
    const [finishMark, setFinish] = useState('')
    const [directions, setDirections] = useState(null);

    console.log(startMark);
    console.log(finishMark);

    const buildRoute = () => {
        console.log(startMark, finishMark);
        const {google} = window
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                // @ts-ignore

                origin: startMark,
                // @ts-ignore
                waypoints:[{
                    location:pause,
                    stopover:false
                }],

                destination: finishMark,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    console.log(result);
                    // @ts-ignore
                    setDirections(result);
                } else {
                    console.error(`Error fetching directions ${result}`);
                }
            }
        );
    };

    return (
        <div>
            {/* @ts-ignore */}

            <LoadScript libraries={places} googleMapsApiKey='AIzaSyCAQVTz4ovEKsi1PguWdsz3PjPTqXGy4LI'>

                <VStack  gap="24" max >
                    <Autocomplete >
                        <Input
                            value={startMark}
                            onChange={(value)=>{
                                setStart(value)
                            }}
                            onMouseLeave={(event:MouseEvent<HTMLInputElement>)=>{
                                setStart(event.currentTarget.value)
                            }}
                        />
                    </Autocomplete>

                    <Autocomplete >
                        <Input
                            value={pause}
                            onChange={(value)=>{
                                setBreak(value)
                            }}
                            onMouseLeave={(event:MouseEvent<HTMLInputElement>)=>{
                                setBreak(event.currentTarget.value)
                            }}
                        />
                    </Autocomplete>

                    <Autocomplete >
                        <Input
                            value={finishMark}
                            onChange={(value)=>{
                                setFinish(value)
                            }}
                            onMouseLeave={(event:MouseEvent<HTMLInputElement>)=>{
                                setFinish(event.currentTarget.value)
                            }}
                        />
                    </Autocomplete>
                </VStack>

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                >
                    {markers.map((marker: any, index: any) => (
                        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                    ))}

                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>

            </LoadScript>
            <button onClick={buildRoute}> Build Route</button>
        </div>

    );
};

export default Map;
