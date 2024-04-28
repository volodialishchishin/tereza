import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchRides } from '../model/services/fetchRides';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { myRidesReducer } from '../model/slice/MyRides.slice';


export const MyRides = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const rides = useSelector((state:StateSchema) => state.myRideSchema?.rides)
    useEffect(() => {
        dispatch(fetchRides())
    }, [dispatch]);

    const initialReducers: ReducersList = {
        myRideSchema: myRidesReducer,
    };

    return (

        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Page data-testid="MainPage">
                {rides && rides.length > 0 && rides.map((ride) => {
                    return(
                        <div key={ride.id} onClick={()=>{
                            navigate(`/ride/${ride.id}/chat`)
                        }}>
                            <div>{ride.title}</div>
                            <div>{ride.description}</div>
                            <div>{ride.user_count}</div>
                        </div>
                    )
                })}
            </Page>
        </DynamicModuleLoader>

    );
};

