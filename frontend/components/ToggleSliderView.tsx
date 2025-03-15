"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import ViolenceCardGrid from "./ViolencePaginatedCardGrid";
import ViolenceMapWrapper from "./ViolenceMapWrapper";

// const MapView: React.FC = () => <div className="p-4 bg-blue-100">Map View</div>;


export default function ToggleView() {
  const [view, setView] = useState<"map" | "cards">("cards");

  return (
    <div className="w-full">
      <div 
        className="relative flex w-48 bg-gray-300 rounded-lg p-1 cursor-pointer" 
        onClick={() => setView(view === "map" ? "cards" : "map")}
      >
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-1/2 h-full rounded-lg bg-red-300"
          layout
          initial={{ x: 0 }}
          animate={{ x: view === "cards" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <div className={`w-1/2 text-center z-10 text-sm font-bold ${view === "cards" ? "text-red-700" : "text-gray-700"}`}>Cards</div>
        <div className={`w-1/2 text-center z-10 text-sm font-bold ${view === "map" ? "text-red-700" : "text-gray-700"}`}>Map</div>
      </div>
      <div className="mt-4 w-full">
        {view === "cards" ? <ViolenceCardGrid /> :  <ViolenceMapWrapper />}
      </div>
    </div>
  );
}
