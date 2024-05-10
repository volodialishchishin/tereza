import React, { useCallback } from 'react';
import {
    LoadScript,
    Autocomplete, Libraries,
} from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './map.module.scss'
import { Button } from '@/shared/ui/redesigned/Button';
import Map from '../GoogleMap/Map'
import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createRoadActions, createRoadReducer } from '../../model/slice/createRoad.slice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';


import { createRoad } from '../../model/services/creatRoad';

const places : Libraries = ['places']
export const CreateRoad = () => {
    const dispatch = useAppDispatch();

    const initialReducers: ReducersList = {
        createRoadSchema: createRoadReducer,
    };

    const { t } = useTranslation();
    const createRoadData = useSelector((state:StateSchema) => state?.createRoadSchema)

    const buildRoute = () => {
        const {google} = window
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                // @ts-ignore
                origin: createRoadData?.startMark.location,
                waypoints:createRoadData?.waypoints?.map(waypoint=>{
                    return{
                        stopover:false,
                        location:waypoint.location
                    }
                }),
                // @ts-ignore

                destination: createRoadData?.finishMark.location,
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (!(status === window.google.maps.DirectionsStatus.OK && result))
                {
                    console.error(`Error fetching directions ${result}`);
                    return
                }
                dispatch(createRoadActions.setDirections(result));

            }
        );
    };
    const handlePlaceChanged =
        (
            autocomplete:google.maps.places.Autocomplete,
            index?:number) => {
            const place = autocomplete.getPlace();
            if ( index === -2){
                dispatch(
                    createRoadActions.setFinishMark(
                        {
                            location: place.formatted_address || '',
                            position: {
                                lng: place.geometry?.location?.lng() || 0 ,
                                lat:place.geometry?.location?.lat() || 0
                            }
                        }
                    )
                )
            }
            else if (index === -1) {
                dispatch(createRoadActions.setStartMark(
                    {
                        location: place.formatted_address || '',
                        position: { lng: place.geometry?.location?.lng() || 0 , lat:place.geometry?.location?.lat() || 0 }
                    }
                ))
            }
            else{
                // @ts-ignore
                const updatedWaypoints = [...createRoadData.waypoints]
                updatedWaypoints[index || 0] =
                    {
                        location: place.formatted_address || '',
                        position: { lng: place.geometry?.location?.lng() || 0 , lat:place.geometry?.location?.lat() || 0 }
                    }
                dispatch(createRoadActions.setWaypoints(updatedWaypoints))
            }
        };

    const onLoadAutocomplete =
        (autocomplete:google.maps.places.Autocomplete, index:number,) => {
            autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete, index));
        };

    const addWaypoint = () => {
        // @ts-ignore
        dispatch(createRoadActions.setWaypoints([...createRoadData.waypoints, { location:'', position: null }]))
    };

    const updateWaypoint = (index: number, value: string, position: google.maps.LatLngLiteral | null) => {
        // @ts-ignore
        const updatedWaypoints = [...createRoadData.waypoints];
        updatedWaypoints[index] = { location: value, position };
        dispatch(createRoadActions.setWaypoints(updatedWaypoints))
    };

    const removeWaypoint = (index: number) => {
        const updatedWaypoints = createRoadData?.waypoints.filter((_, idx) => idx !== index);
        // @ts-ignore
        dispatch(createRoadActions.setWaypoints(updatedWaypoints));
    };

    const onMapClick = (event: google.maps.MapMouseEvent) => {
        if (createRoadData?.activeInput !== null) {
            const lat = event.latLng?.lat() || 0;
            const lng = event.latLng?.lng() || 0;
            const location = `${lat}, ${lng}`;
            if (createRoadData?.activeInput === -1) {
                dispatch(createRoadActions.setStartMark({ location, position: {lat, lng} }));
            }
            else if (createRoadData?.activeInput === -2){
                dispatch(createRoadActions.setFinishMark({ location, position: {lat, lng} }));

            }
            else { // @ts-ignore
                updateWaypoint(createRoadData?.activeInput, location, {lat, lng});
            }
            dispatch(createRoadActions.setActiveInput(null));
        }
    };

    const onSaveClick = useCallback(async () => {
        const result = await dispatch(createRoad(
            // @ts-ignore
            { waypoints:createRoadData?.waypoints,
                // @ts-ignore
                finishMark: createRoadData?.finishMark,
                // @ts-ignore
                startMark:createRoadData?.startMark
            }
        ));
        dispatch(createRoadActions.setIsSaved(true))
    }, [createRoadData?.waypoints, createRoadData?.finishMark, dispatch, createRoadData?.startMark]);

    const waypointInputs = createRoadData?.waypoints.map((waypoint, index) => (
        <>
            <Autocomplete
                onLoad={autocomplete => onLoadAutocomplete(autocomplete, index)} className={cls.autoComplete}>
                <Input
                    value={createRoadData?.waypoints[index].location}
                    onChange={(e) => updateWaypoint(index, e, null)}
                />
            </Autocomplete>
            <Button onClick={() => {
                dispatch(createRoadActions.setActiveInput(index))
            }} variant={(createRoadData?.activeInput &&
                createRoadData?.activeInput!==-1 &&
                createRoadData?.activeInput!==-2) || createRoadData?.activeInput===0
                ? "filled" : "outline"}>{t("Set on Map") }</Button>
            <Button onClick={() => removeWaypoint(index)} >{t("Remove") }</Button>
        </>
    ));
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <LoadScript libraries={places} googleMapsApiKey='AIzaSyCAQVTz4ovEKsi1PguWdsz3PjPTqXGy4LI'>
                    <VStack justify="center" align="center" gap="32" max>
                        <HStack max>
                            <VStack max gap="32">
                                <Autocomplete
                                    onLoad={autocomplete =>
                                        onLoadAutocomplete(autocomplete, -1)}
                                    className={cls.autoComplete}
                                >
                                    <Input
                                        value={createRoadData?.startMark.location}
                                        onChange={(e) =>
                                            dispatch(createRoadActions.setStartMark(
                                                // @ts-ignore
                                                    { ...createRoadData?.startMark, location: e }
                                                )
                                            )
                                        }
                                    />
                                </Autocomplete>
                                <Button variant={
                                    createRoadData?.activeInput
                                    &&
                                    createRoadData?.activeInput === -1 ? "clear" : "outline"}
                                        onClick={() => dispatch(createRoadActions.setActiveInput(-1))}>
                                    {t("Set on Start")}
                                </Button>
                                {waypointInputs}
                                <Autocomplete
                                    onLoad={autocomplete => onLoadAutocomplete(autocomplete, -2)}
                                    className={cls.autoComplete}
                                >
                                    <Input
                                        value={createRoadData?.finishMark.location}
                                        onChange={(e) =>
                                            dispatch(createRoadActions.setFinishMark(
                                                // @ts-ignore
                                                { ...createRoadData.finishMark, location: e }
                                            ))}
                                    />
                                </Autocomplete>
                                <Button variant={
                                    createRoadData?.activeInput
                                    &&
                                    createRoadData?.activeInput === -2 ? "clear" : "outline"}
                                        onClick={() => dispatch(createRoadActions.setActiveInput(-2))}>
                                    {t("Set on Start")}
                                </Button>

                            </VStack>
                            <HStack gap="32" max justify="start" align="end">
                                <Button disabled={createRoadData?.isSaved} onClick={addWaypoint}>{t("Add Waypoint")}</Button>
                                <Button disabled={createRoadData?.isSaved} onClick={buildRoute}> {t('Build Route')}</Button>
                                <Button disabled={createRoadData?.isSaved} onClick={onSaveClick}> {t('Save')}</Button>
                            </HStack>
                        </HStack>


                        <Map onMapClick={onMapClick}
                             finishMark={createRoadData?.finishMark}
                             startMark={createRoadData?.startMark}
                             directions={createRoadData?.directions}
                             waypoints={createRoadData?.waypoints}
                        />

                    </VStack>
                </LoadScript>
            </div>
        </DynamicModuleLoader>
    );
};
