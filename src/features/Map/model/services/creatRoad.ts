import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Location } from '../types/MapTypes';
import { Road } from '@/entities/Road';

interface createRoadProps {
    waypoints: Array<Location>;
    finishMark:Location;
    startMark: Location;
}

export const createRoad = createAsyncThunk<
    Road,
    createRoadProps,
    ThunkConfig<string>
>('createRoad/registerByUsername', async (createRoadData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const { data, status } = await extra.api.post<Road>('/road', createRoadData);

        if (status !==201) {
            throw new Error();
        }
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
