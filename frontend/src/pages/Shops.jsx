import React, { useState, useEffect } from "react";
import { API } from "../config/api";
import ShopSearch from "../pages/ShopSearch.jsx";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllShops();
  }, []);

  const fetchAllShops = async () => {
    try {
      setLoading(true);
      const res = await fetch(API.GET_SHOPS, { credentials: 'include' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setShops(data.data);
        setSearchResults(null); // Clear search results
      } else {
        setError(data.message || "Failed to fetch shops");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results, query, message) => {
    setSearchResults(results);
    setSearchQuery(query);
    
    if (message && results.length === 0) {
      setError(message);
    } else {
      setError("");
    }
  };

  const displayShops = searchResults !== null ? searchResults : shops;

  // Image URL helper function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${import.meta.env.VITE_BASEURL}${imagePath}`;
    return `${import.meta.env.VITE_BASEURL}/uploads${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchResults !== null ? "Search Results" : "E-Waste Shops"}
          </h1>
          <p className="text-gray-600">
            {searchResults !== null 
              ? `Found ${searchResults.length} shops for "${searchQuery}"`
              : "Find e-waste recycling and repair shops near you"
            }
          </p>
        </div>

        {/* Search Component */}
        <ShopSearch onSearchResults={handleSearchResults} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayShops.map((shop) => {
            const imageUrl = shop.images && shop.images.length > 0 
              ? getImageUrl(shop.images[0]) 
              : null;

            return (
              <div key={shop._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Shop Image */}
                {imageUrl ? (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={imageUrl}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">🏪</span>
                  </div>
                )}

                {/* Shop Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {shop.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-2">📍 {shop.address}</p>
                  <p className="text-gray-600 text-sm mb-2">📞 {shop.phone}</p>

                  {/* Services */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {shop.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {service.trim()}
                        </span>
                      ))}
                      {shop.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          +{shop.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {shop.rating || "No ratings"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {shop.totalReviews || 0} reviews
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displayShops.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchResults !== null ? "No shops found" : "No shops available"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchResults !== null 
                ? "Try adjusting your search criteria"
                : "Check back later for new shops"
              }
            </p>
            {searchResults !== null && (
              <button
                onClick={fetchAllShops}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                View All Shops
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shops;