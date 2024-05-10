/* eslint-disable i18next/no-literal-string */
import React, { useCallback, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Map  } from '@/features/Map';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { saveRideActions, saveRideReducer } from '../../model/slice/createRide.slice';
import { fetchRoad } from '../../model/services/fetchRoad';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { createRide } from '../../model/services/createRide';

const initialReducers: ReducersList = {
    saveRideSchema: saveRideReducer,
};
const SaveRide = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {id} = useParams();
    const road = useSelector((state:StateSchema) => state?.saveRideSchema?.road)
    const directions = useSelector((state:StateSchema) => state?.saveRideSchema?.directions)
    const isMapLoaded = useSelector((state:StateSchema) => state?.saveRideSchema?.isMapLoaded)
    const description = useSelector((state:StateSchema) => state?.saveRideSchema?.description)
    const title = useSelector((state:StateSchema) => state?.saveRideSchema?.title)
    const usersCount = useSelector((state:StateSchema) => state?.saveRideSchema?.usersCount)
    const date = useSelector((state:StateSchema) => state?.saveRideSchema?.date)



    const buildRoute = useCallback( async ()=> {
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
        dispatch(saveRideActions.setDirection(result));
    },[road, dispatch])

    useEffect(() => {
        dispatch(fetchRoad(id || ''));
    }, [id,dispatch]);

    useEffect(() => {
        if (isMapLoaded) {
            buildRoute();
        }
    }, [isMapLoaded, road, buildRoute]);


    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <LoadScript
                googleMapsApiKey='AIzaSyCAQVTz4ovEKsi1PguWdsz3PjPTqXGy4LI'
                onLoad={()=>dispatch(saveRideActions.setIsMapLoaded(true))}
            >

                                    <Map startMark={road?.startMark}
                                         finishMark={road?.finishMark}
                                         waypoints={road?.waypoints}
                                         directions={directions}
                                         mapContainerStyle={{
                                             width:"300px",
                                             height:"300px"
                                         }}
                                    />

            </LoadScript>

            <Text text="Title" />
            <Input value={title} onChange={(e) =>
                dispatch(saveRideActions.setTitle(
                        e
                    )
                )
            } />
            <Text text="description" />
            <Input value={description} onChange={(e) =>
                dispatch(saveRideActions.setDescription(
                        e
                    )
                )
            }  />
            <Text text="User Count" />
            <Input value={usersCount} onChange={(e) =>
                dispatch(saveRideActions.setUserCount(
                        +e
                    )
                )
            }  />
            <Text text="Дата заїзду" />
            <Input value={date} onChange={(e) =>
                dispatch(saveRideActions.setDate(
                        e
                    )
                )
            }  />
            <Button onClick={()=>{
                dispatch(createRide({usersCount,description, title, roadId:id, date }))
                navigate('/')
            }}>Save Ride</Button>
        </DynamicModuleLoader>

    );
};

export default SaveRide;
