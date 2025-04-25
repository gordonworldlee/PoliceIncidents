"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import DeveloperVisualizations from "./ourVisualizations";
import OurVisualizations from "./developerVisualizations";

export default function VisualizationsPage() {
  const [activeTab, setActiveTab] = useState<"developer" | "project">("developer");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 bg-white pt-28">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            JusticeWatch Visualizations
          </h1>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setActiveTab("developer")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "developer"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Developer Statistics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("project")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "project"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Project Statistics
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === "developer" ? (
              <DeveloperVisualizations />
            ) : (
              <OurVisualizations />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}