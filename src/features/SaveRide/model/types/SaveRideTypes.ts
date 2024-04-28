import { Road } from '@/entities/Road';

export type SaveRideTypes = {
    isLoading: boolean;
    error?: string;
    road?:Road
    usersCount:number,
    title:string,
    description:string,
    isMapLoaded:boolean,
    directions?: google.maps.DirectionsResult
}
