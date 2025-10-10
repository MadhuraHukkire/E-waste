// components/ShopSearch.jsx
import React, { useState, useEffect } from "react";
import { API } from "../config/api";

const ShopSearch = ({ onSearchResults, showFilters = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [searchRadius, setSearchRadius] = useState(10);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  // Common e-waste services for dropdown
  const commonServices = [
    "Mobile Repair",
    "Laptop Refurbish", 
    "Battery Recycling",
    "Computer Repair",
    "Electronic Waste",
    "TV Recycling",
    "AC Repair",
    "Printer Repair",
    "E-Waste Collection",
    "Device Recycling"
  ];

  useEffect(() => {
    setServices(commonServices);
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (searchQuery.trim()) {
        params.append('query', searchQuery.trim());
      }
      
      if (selectedService) {
        params.append('service', selectedService);
      }
      
      if (useCurrentLocation) {
        // Get user's current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        params.append('location', `${latitude},${longitude}`);
        params.append('radius', searchRadius);
      }

      const url = `${API.SEARCH_SHOPS}?${params.toString()}`;
      console.log("Search URL:", url);

      const res = await fetch(url, {
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSearchResults(data.data, searchQuery);
      } else {
        onSearchResults([], searchQuery, data.message);
      }
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults([], searchQuery, "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedService("");
    setUseCurrentLocation(false);
    setSearchRadius(10);
    onSearchResults([], "");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shops by name, address, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>

        {(searchQuery || selectedService || useCurrentLocation) && (
          <button
            onClick={clearSearch}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Service Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useCurrentLocation}
                onChange={(e) => setUseCurrentLocation(e.target.checked)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Search near me
              </span>
            </label>
            
            {useCurrentLocation && (
              <div className="mt-2">
                <label className="block text-xs text-gray-600 mb-1">
                  Search radius: {searchRadius} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Quick Search Tips */}
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Search tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Search by shop name</li>
              <li>Search by area/address</li>
              <li>Search by service type</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopSearch;