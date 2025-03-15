"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface TotalIncidentMapProps {
  locations: { lat: number; lng: number; incident: any }[];
  onMarkerClick: (incident: any) => void;
}

const TotalIncidentMap: React.FC<TotalIncidentMapProps> = ({ locations, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
  const mapInstanceRef = useRef<google.maps.Map | null>(null); // Ref to store map instance

  useEffect(() => {
    if (!mapsApiKey) {
      setError("Google Maps API key is missing.");
      return;
    }

    const loadMap = async () => {
      try {
        // If map is already initialized, do nothing
        if (mapInstanceRef.current) return;

        const loader = new Loader({
          apiKey: mapsApiKey,
          version: "weekly",
        });

        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;

        if (!mapRef.current) {
          setError("Map container not found.");
          return;
        }

        // Initialize the map
        const initialPosition = locations.length > 0 ? locations[0] : { lat: 0, lng: 0 };
        const mapOptions: google.maps.MapOptions = {
          center: initialPosition,
          zoom: 10,
        };

        // Initialize map only once and store it in a ref
        mapInstanceRef.current = new Map(mapRef.current, mapOptions);

        // Add markers
        locations.forEach((location, index) => {
          const marker = new Marker({
            map: mapInstanceRef.current,
            position: { lat: location.lat, lng: location.lng },
            title: `Incident ${index + 1}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#FF6347",
              fillOpacity: 0.7,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            },
          });

          marker.addListener("click", () => {
            onMarkerClick(location.incident);
          });
        });
      } catch (error) {
        console.error("Error loading map:", error);
        setError("Failed to load the map.");
      }
    };

    loadMap();
  }, [locations, mapsApiKey, onMarkerClick]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div className="w-full h-[500px]" ref={mapRef}></div>;
};

export default TotalIncidentMap;
