"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function Map({
  latitude,
  longitude,
}: {
  latitude: number | string;
  longitude: number | string;
}) {
  const [error, setError] = useState<string | null>(null);
  const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // coordinates are now string so need to parse them into float
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    
    // make sure coordinates are valid
    if (isNaN(lat) || !isFinite(lat) || isNaN(lng) || !isFinite(lng)) {
      setError("Invalid coordinates provided");
      console.error("Invalid map coordinates:", { latitude, longitude, parsedLat: lat, parsedLng: lng });
      return;
    }

    // make sure API key exist
    if (!mapsApiKey) {
      setError("Maps API key is missing");
      console.error("Missing Google Maps API key");
      return;
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: mapsApiKey,
          version: "weekly",
        });

        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        const position = {
          lat,
          lng,
        };

        console.log("Initializing map with position:", position);

        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 17,
          mapId: "MY_NEXTJS_MAPID",
        };

        if (!mapRef.current) {
          setError("Map container not found");
          return;
        }

        const map = new Map(mapRef.current, mapOptions);

        const marker = new Marker({
          map: map,
          position: position,
        });

        // might need cleanup function
        return () => {
          marker.setMap(null);
        };
      } catch (err) {
        console.error("Error initializing map:", err);
        setError(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    initMap();
  }, [latitude, longitude, mapsApiKey]);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-2xl p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full" ref={mapRef} />
  );
}