
// import React, { useState, useEffect } from "react";
// import { API } from "../config/api";

// const RegisterShop = () => {
//   const [shopData, setShopData] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     email: "",
//     services: "",
//     rating: 0,
//   });

//   const [images, setImages] = useState([]);
//   const [location, setLocation] = useState({ lat: "", lng: "" });
//   const [loadingLocation, setLoadingLocation] = useState(true);
//   const [locationError, setLocationError] = useState(null);
//   const [message, setMessage] = useState("");

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           setLoadingLocation(false);
//         },
//         (error) => {
//           setLocationError("Permission denied or location unavailable");
//           setLoadingLocation(false);
//         }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by this browser");
//       setLoadingLocation(false);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShopData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       setMessage("❌ Please select at least one image");
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(shopData).forEach((key) => formData.append(key, shopData[key]));
//     formData.append("lat", location.lat);
//     formData.append("lng", location.lng);

//     images.forEach((img) => formData.append("images", img));

//     try {
//       const res = await fetch(API.ADD_SHOP, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setMessage("✅ Shop registered successfully!");
//         setShopData({
//           name: "",
//           address: "",
//           phone: "",
//           email: "",
//           services: "",
//           rating: 0,
//         });
//         setImages([]);
//       } else {
//         setMessage(`❌ ${result.message}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Something went wrong");
//     }
//   };

//   if (loadingLocation) {
//     return <p className="text-center mt-10">Fetching your location...</p>;
//   }

//   if (locationError) {
//     return <p className="text-red-600 text-center mt-10">{locationError}</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4 mt-20 mb-20 bg-white rounded-xl shadow">
//       <h1 className="text-4xl font-bold my-5 mb-10 text-center">Register Your Shop</h1>
      
//       {message && (
//         <p className={`mb-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Shop Name"
//           value={shopData.name}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="text"
//           name="address"
//           placeholder="Shop Address"
//           value={shopData.address}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={shopData.phone}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={shopData.email}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//         />

//         <input
//           type="text"
//           name="services"
//           placeholder="Services (comma separated)"
//           value={shopData.services}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//         />

//         <input
//           type="number"
//           name="rating"
//           placeholder="Rating (0-5)"
//           value={shopData.rating}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           min={0}
//           max={5}
//           step="0.1"
//         />

//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <p className="text-gray-600">
//           Your Current Location: Lat {location.lat}, Lng {location.lng}
//         </p>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//         >
//           Register Shop
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterShop;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { fetchUserProfile } from "../store/userSlice";

const RegisterShop = () => {
  const [shopData, setShopData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    services: "",
  });

  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  // Fetch user profile if not available
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Permission denied or location unavailable. Please enable location services to register your shop.");
          setLoadingLocation(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser. Please use a modern browser.");
      setLoadingLocation(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 5) {
      setMessage("❌ Please select maximum 5 images");
      return;
    }
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CHECK 1: Verify user is authenticated
    if (!user || !user._id) {
      setMessage("❌ Please log in to register a shop");
      navigate("/login", {
        state: {
          from: "/register-shop",
          message: "Please log in to register your shop"
        }
      });
      return;
    }

    // Validate required fields
    if (!shopData.name.trim()) {
      setMessage("❌ Shop name is required");
      return;
    }

    if (!shopData.address.trim()) {
      setMessage("❌ Shop address is required");
      return;
    }

    if (!shopData.phone.trim()) {
      setMessage("❌ Phone number is required");
      return;
    }

    if (!shopData.services.trim()) {
      setMessage("❌ Services are required");
      return;
    }

    if (images.length === 0) {
      setMessage("❌ Please select at least one image");
      return;
    }

    if (!location.lat || !location.lng) {
      setMessage("❌ Location is required. Please enable location services.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      
      // Append all shop data
      Object.keys(shopData).forEach((key) => {
        formData.append(key, shopData[key]);
      });
      
      formData.append("lat", location.lat);
      formData.append("lng", location.lng);

      // Append images
      images.forEach((img) => {
        formData.append("images", img);
      });

      console.log("Sending request to:", API.ADD_SHOP); // Debug log
      
      const res = await fetch(API.ADD_SHOP, {
        method: "POST",
        body: formData,
        credentials: 'include' // 🔥 CRITICAL: Send cookies
      });

      console.log("Response status:", res.status); // Debug log

      const result = await res.json();
      console.log("Response data:", result); // Debug log

      if (res.ok && result.success) {
        setMessage("✅ Shop registered successfully! It will be visible after approval.");
        // Reset form
        setShopData({
          name: "",
          address: "",
          phone: "",
          email: "",
          services: "",
        });
        setImages([]);
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        // Handle authentication errors
        if (res.status === 401) {
          setMessage("❌ Session expired. Please log in again.");
          navigate("/login", {
            state: {
              from: "/register-shop",
              message: "Session expired. Please log in again."
            }
          });
        } else {
          setMessage(`❌ ${result.message || "Failed to register shop"}`);
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user information...</p>
        </div>
      </div>
    );
  }

  if (loadingLocation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Detecting your location...</p>
          <p className="text-sm text-gray-500 mt-2">Please allow location access</p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Location Error</h3>
          <p className="mb-4">{locationError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Retry Location
          </button>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-gray-600 mb-4">You need to be logged in to register a shop.</p>
          <button
            onClick={() => navigate("/login", {
              state: {
                from: "/register-shop",
                message: "Please log in to register your shop"
              }
            })}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
        {/* Header with user info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Register Your Shop</h1>
          <div className="bg-green-50 p-3 rounded-lg inline-block">
            <p className="text-green-700">
              ✅ Logged in as: <strong>{user.name || user.email}</strong>
            </p>
          </div>
        </div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter shop name"
                value={shopData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={shopData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Address *
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter complete shop address"
              value={shopData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={shopData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services *
              </label>
              <input
                type="text"
                name="services"
                placeholder="e.g., Mobile Repair, Laptop Refurbish, Battery Recycling"
                value={shopData.services}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate services with commas
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Images *
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload clear images of your shop facade, interior, or services (max 5 images)
            </p>
            {images.length > 0 && (
              <p className="text-sm text-green-600 mt-2">
                ✅ {images.length} image(s) selected
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-blue-700 mb-2">
              📍 Your Current Location (Automatically Detected)
            </label>
            <p className="text-sm text-blue-600">
              Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
            </p>
            <p className="text-xs text-blue-500 mt-1">
              This helps customers find your shop easily
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-medium text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Registering Shop...
              </span>
            ) : (
              'Register Shop'
            )}
          </button>
        </form>

        {/* User info footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Shop will be registered under: <strong>{user.name || user.email}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterShop;