"use client"

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { DepartmentInstance } from "@/public/data/DepartmentData"

export function Map({ latitude, longitude}: { latitude: number,longitude: number }) {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            
            const { Marker} = await loader.importLibrary('marker') as google.maps.MarkerLibrary;


            const position = {
                lat: latitude,
                lng: longitude
            }

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAPID'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            const marker = new Marker({
                map: map,
                position: position
            });

            // might have to add this to clean up the marker
            // return () => {
            //     marker.setMap(null);
            // };
        }

        initMap();
    }, []); // might have to add department as a dependency

    return (

        <div className='h-full w-full rounded-2xl inline-block' ref={mapRef} />
    )
}