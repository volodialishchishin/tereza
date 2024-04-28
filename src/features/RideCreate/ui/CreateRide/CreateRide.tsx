

import React, { useCallback, useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Map  } from '@/features/Map';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchRoads } from '../../model/services/fetchRoads';
import { Road } from '@/entities/Road';
import { createRideActions, createRideReducer } from '../../model/slice/createRide.slice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from '@/shared/ui/redesigned/Button';
import { deleteRoad } from '../../model/services/deleteRoad';

const CreateRide = () => {
    const dispatch = useAppDispatch()
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const navigate = useNavigate();

    const fetchData= useCallback(()=>{
            dispatch(fetchRoads());
    },[dispatch])


    const road = useSelector((state:StateSchema) => state?.createRideSchema?.road)
    const directions = useSelector((state:StateSchema) => state?.createRideSchema?.directions)

    const initialReducers: ReducersList = {
        createRideSchema: createRideReducer,
    };



    const buildRoute = useCallback( async (road:Road)=> {
        if (!window.google || !road) return;

        const directionsService = new window.google.maps.DirectionsService();
        const result = await directionsService.route({
            origin: road.startMark.location || '',
            waypoints: road.waypoints?.map(waypoint => ({
                stopover: false,
                location: waypoint.location
            })),
            destination: road.finishMark.location || '',
            travelMode: window.google.maps.TravelMode.WALKING,
        });
        dispatch(createRideActions.setDirection({ direction:result, id: road.id }));
    },[dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    useEffect(() => {
        if (isMapLoaded && road){
            road?.forEach (e=> {
                buildRoute(e)
            })
        }
    }, [isMapLoaded,road,buildRoute]);


    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <LoadScript
                googleMapsApiKey='AIzaSyCAQVTz4ovEKsi1PguWdsz3PjPTqXGy4LI'
                onLoad={()=>setIsMapLoaded(true)}
            >
                {!!road?.length &&
                    <div className="App">
                        {road?.map(e => {
                            return (
                                <div key={e.id} className="App">

                                    <Map startMark={e?.startMark}
                                         finishMark={e?.finishMark}
                                         waypoints={e?.waypoints}
                                         directions={directions?.find((element)=> element.id === e.id)?.direction}
                                         mapContainerStyle={{
                                             width:"300px",
                                             height:"300px"
                                         }}
                                    />
                                    <Button onClick={()=>{
                                        dispatch(deleteRoad(e.id))
                                    }}>
                                        Delete route
                                    </Button>
                                    <Button onClick={()=>{
                                        navigate(`${e.id}/`)
                                    }}>
                                        Pick Route route
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                }
            </LoadScript>
        </DynamicModuleLoader>

    );
};

export default CreateRide;
