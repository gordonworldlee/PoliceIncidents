"use client"

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface TotalIncidentMapProps {
  locations: { lat: number; lng: number; incident: any }[]; // Include incident data
  onMarkerClick: (incident: any) => void; // Function to call when a marker is clicked
}

const TotalIncidentMap: React.FC<TotalIncidentMapProps> = ({ locations, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

  useEffect(() => {
    if (!mapsApiKey) {
      setError("Google Maps API key is missing.");
      return;
    }

    const loadMap = async () => {
      try {
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

        // Set the initial map center and zoom (we can set a default location or dynamically choose one)
        const initialPosition = locations.length > 0 ? locations[0] : { lat: 0, lng: 0 };
        const mapOptions: google.maps.MapOptions = {
          center: initialPosition,
          zoom: 10, // Adjust zoom level as necessary
        };

        const map = new Map(mapRef.current, mapOptions);

        // Add custom circular markers to the map
        locations.forEach((location, index) => {
          const marker = new Marker({
            map: map,
            position: { lat: location.lat, lng: location.lng },
            title: `Incident ${index + 1}`,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Optional: Change default icon to something simple
              size: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32), // Rescale the marker image size if needed
            },
          });

          // Create a custom circular marker with divIcon (no image, just a circle)
          const circleIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10, // Size of the circle (scale is in pixels)
            fillColor: "#FF6347", // Circle color (red)
            fillOpacity: 0.7,
            strokeColor: "#FFFFFF", // Circle border color (white)
            strokeWeight: 2, // Border width
          };

          // Apply the custom circular icon to the marker
          marker.setIcon(circleIcon);

          // Trigger the onMarkerClick function when a marker is clicked
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
