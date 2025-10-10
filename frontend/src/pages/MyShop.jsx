// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { API } from "../config/api";

// const MyShop = () => {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMyShops();
//   }, []);

//   const fetchMyShops = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // Check if user is authenticated
//       if (!user || !user._id) {
//         setError("Please log in to view your shops");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch(API.GET_MY_SHOPS, {
//         method: "GET",
//         credentials: 'include', // Important for cookies
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Response status:", res.status);

//       const data = await res.json();
//       console.log("Response data:", data);

//       if (res.ok && data.success) {
//         setShops(data.data);
//       } else {
//         if (res.status === 401) {
//           setError("Session expired. Please log in again.");
//           navigate("/login");
//         } else {
//           setError(data.message || "Failed to fetch shops");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching shops:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your shops...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
//           <div className="text-red-500 text-4xl mb-4">❌</div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchMyShops}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shops</h1>
//           <p className="text-gray-600">Manage your registered e-waste shops</p>
//         </div>

//         {/* Shops Count */}
//         <div className="mb-6 p-4 bg-white rounded-lg shadow">
//           <p className="text-lg font-semibold text-gray-700">
//             Total Shops: <span className="text-green-600">{shops.length}</span>
//           </p>
//         </div>

//         {/* Shops Grid */}
//         {shops.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-6xl mb-4">🏪</div>
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">No Shops Found</h3>
//             <p className="text-gray-500 mb-6">You haven't registered any shops yet.</p>
//             <button
//               onClick={() => navigate("/register-shop")}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
//             >
//               Register Your First Shop
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {shops.map((shop) => (
//               <div key={shop._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 {/* Shop Images */}
//                 {shop.images && shop.images.length > 0 && (
//                   <div className="h-48 bg-gray-200">
//                     <img
//                       src={`http://localhost:5000${shop.images[0]}`}
//                       alt={shop.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
                
//                 {/* Shop Info */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {shop.name}
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-2">
//                     📍 {shop.address}
//                   </p>
                  
//                   <p className="text-gray-600 text-sm mb-2">
//                     📞 {shop.phone}
//                   </p>

//                   {shop.email && (
//                     <p className="text-gray-600 text-sm mb-2">
//                       ✉️ {shop.email}
//                     </p>
//                   )}

//                   {/* Services */}
//                   <div className="mb-3">
//                     <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
//                     <div className="flex flex-wrap gap-1">
//                       {shop.services.map((service, index) => (
//                         <span
//                           key={index}
//                           className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
//                         >
//                           {service.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Status */}
//                   <div className="flex justify-between items-center">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         shop.isApproved
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {shop.isApproved ? "✅ Approved" : "⏳ Pending Approval"}
//                     </span>
                    
//                     <span className="text-xs text-gray-500">
//                       {new Date(shop.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Refresh Button */}
//         <div className="text-center mt-8">
//           <button
//             onClick={fetchMyShops}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Refresh Shops
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyShop;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

const MyShop = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyShops();
  }, []);

  const fetchMyShops = async () => {
    try {
      setLoading(true);
      setError("");

      if (!user || !user._id) {
        setError("Please log in to view your shops");
        setLoading(false);
        return;
      }

      const res = await fetch(API.GET_MY_SHOPS, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok && data.success) {
        setShops(data.data);
      } else {
        if (res.status === 401) {
          setError("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setError(data.message || "Failed to fetch shops");
        }
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with /uploads, construct the full URL
    if (imagePath.startsWith('/uploads')) {
      return `${import.meta.env.VITE_BASEURL}${imagePath}`;
    }
    
    // Default case
    return `${import.meta.env.VITE_BASEURL}/uploads${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your shops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchMyShops}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shops</h1>
          <p className="text-gray-600">Manage your registered e-waste shops</p>
        </div>

        {/* Shops Count */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <p className="text-lg font-semibold text-gray-700">
            Total Shops: <span className="text-green-600">{shops.length}</span>
          </p>
        </div>

        {/* Shops Grid */}
        {shops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Shops Found</h3>
            <p className="text-gray-500 mb-6">You haven't registered any shops yet.</p>
            <button
              onClick={() => navigate("/register-shop")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Register Your First Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => {
              const firstImage = shop.images && shop.images.length > 0 ? getImageUrl(shop.images[0]) : null;
              
              return (
                <div key={shop._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Shop Images */}
                  {firstImage ? (
                    <div className="h-48 bg-gray-200">
                      <img
                        src={firstImage}
                        alt={shop.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gray-200 flex items-center justify-center hidden"
                        style={{ display: 'none' }}
                      >
                        <span className="text-gray-400 text-4xl">🏪</span>
                      </div>
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
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      📍 {shop.address}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      📞 {shop.phone}
                    </p>

                    {shop.email && (
                      <p className="text-gray-600 text-sm mb-2">
                        ✉️ {shop.email}
                      </p>
                    )}

                    {/* Services */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {shop.services && shop.services.map((service, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {service.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          shop.isApproved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {shop.isApproved ? "✅ Approved" : "⏳ Pending"}
                      </span>
                      
                      <span className="text-xs text-gray-500">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Image Count */}
                    {shop.images && shop.images.length > 1 && (
                      <div className="mt-2 text-xs text-gray-500">
                        +{shop.images.length - 1} more image{shop.images.length - 1 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={fetchMyShops}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Refresh Shops
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyShop;