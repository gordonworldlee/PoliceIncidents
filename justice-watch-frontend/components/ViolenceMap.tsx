"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // Slight delay to ensure proper resizing
  }, [map]);
  return null;
}

export default function MapComponent() {
  const mapRef = useRef(null);

  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
      <MapContainer
        className="w-full h-full"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
        ref={mapRef}
      >
        <ResizeHandler />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          <Marker position={[49.8397, 24.0297]} />
          <Marker position={[52.2297, 21.0122]} />
          <Marker position={[51.5074, -0.0901]} />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
