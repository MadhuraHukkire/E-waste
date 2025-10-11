// backend/controllers/shop.controller.js
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js"; // Import User model
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
// @desc    Create a new shop with images
// @route   POST /api/shops
// @access  Admin


export const addShopController = async (req, res) => {
  try {
    const { name, address, lat, lng, phone, email, services, rating } = req.body;

    if (!req.userId) {
      return res.status(401).json({ 
        message: "Authentication required", 
        success: false, 
        error: true 
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    const upload =  await uploadImageCloudinary(req.files)

    // Build location object for MongoDB
    const location = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };

    const shop = new Shop({
      name,
      address,
      location,
      phone,
      email,
      services: services.split(","), // comma-separated string
      rating: rating || 0,
      images: upload,
      createdBy: req.userId // Add the user who created the shop
    });

    await shop.save();

    res.status(201).json({
      message: "Shop added successfully",
      data: shop,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// export const approveOrRejectShopController = async (req, res) => {
//   try {
//     const { shopId } = req.params;
//     const { isApproved } = req.body; // true → approve, false → delete

  
//     if (isApproved) {
//       // ✅ Approve shop
//       const shop = await Shop.findByIdAndUpdate(
//         shopId,
//         { isApproved: true },
//         { new: true }
//       );

//       if (!shop) {
//         return res.status(404).json({
//           success: false,
//           error: true,
//           message: "Shop not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         error: false,
//         message: "Shop approved successfully",
//         data: shop,
//       });
//     } else {
      
//       const shop = await Shop.findByIdAndDelete(shopId);

//       if (!shop) {
//         return res.status(404).json({
//           success: false,
//           error: true,
//           message: "Shop not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         error: false,
//         message: "Shop rejected and deleted successfully",
//       });
//     }
//   } catch (error) {
//     console.error("😔😔😔😔😔"+error);
//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "Server error",
//     });
//   }
// };



export const getShopsController = async (req, res) => {
  try {
    const shops = await Shop.find({ isApproved: true }).sort({ createdAt: -1 });

    if (shops.length === 0) {
      return res.status(404).json({
        message: "No shops found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Shops fetched successfully",
      data: shops,
      error: false,
      success: true
    });
  } catch (error) {
    console.error("😔 Server Error: " + error);
    return res.status(500).json({
      message: "Server Error",
      error: true,
      success: false
    });
  }
};


// export const myShopsController = async (req,res)=>{
//   try {

//      if (!req.userId) {
//       return res.status(401).json({ 
//         message: "Authentication required", 
//         success: false, 
//         error: true 
//       });
//     }
//     const shops = await Shop.find({createdBy : req.userId}).sort({ createdAt: -1 });
//     if (shops.length === 0) {
//       return res.status(404).json({
//         message: "No shops found for this user",
//         error: true,
//         success: false
//       });
//     }
//     return res.status(200).json({
//       message: "User's shops fetched successfully",
//       data: shops,
//       error: false,
//       success: true
//     });
    
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server Error",
//       error: true,
//       success: false
//     });
//   }
// }

export const myShopsController = async (req, res) => {
  try {
    console.log("Fetching shops for user:", req.userId);

    if (!req.userId) {
      return res.status(401).json({ 
        message: "Authentication required", 
        success: false, 
        error: true 
      });
    }

    const shops = await Shop.find({ createdBy: req.userId })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email'); // Populate user info

    console.log(`Found ${shops.length} shops for user ${req.userId}`);

    if (shops.length === 0) {
      return res.status(200).json({ // Changed to 200 since empty result is not an error
        message: "No shops found for this user",
        data: [],
        error: false,
        success: true
      });
    }

    return res.status(200).json({
      message: "User's shops fetched successfully",
      data: shops,
      error: false,
      success: true
    });
    
  } catch (error) {
    console.error("Error in myShopsController:", error);
    return res.status(500).json({
      message: "Server Error",
      error: true,
      success: false
    });
  }
}



// backend/controllers/shop.controller.js
export const searchShopsController = async (req, res) => {
  try {
    const { query, service, location, radius = 10 } = req.query; // radius in kilometers

    // Build search filter
    let filter = { isApproved: true }; // Only show approved shops

    // Text search across multiple fields
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { services: { $regex: query, $options: 'i' } }
      ];
    }

    // Service-specific search
    if (service) {
      filter.services = { $regex: service, $options: 'i' };
    }

    // Location-based search (if coordinates provided)
    if (location) {
      const [lat, lng] = location.split(',').map(coord => parseFloat(coord.trim()));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        filter.location = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat] // MongoDB uses [longitude, latitude]
            },
            $maxDistance: radius * 1000 // Convert km to meters
          }
        };
      }
    }

    console.log("Search filter:", filter);

    const shops = await Shop.find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    return res.status(200).json({
      message: shops.length > 0 ? "Shops found successfully" : "No shops found matching your criteria",
      data: shops,
      total: shops.length,
      error: false,
      success: true
    });

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      message: "Server error during search",
      error: true,
      success: false
    });
  }
};



export const getPendingShopsController = async (req, res) => {
  try {
    console.log("🛠 getPendingShopsController called");
    console.log("🛠 User ID from auth:", req.userId);

    // Check if user exists and is admin
    const user = await User.findById(req.userId);
    console.log("🛠 Found user:", user);
    
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ 
        message: "User not found", 
        success: false, 
        error: true 
      });
    }

    console.log("🛠 User role:", user.role);

    if (user.role !== 'admin') {
      console.log("❌ User is not admin");
      return res.status(403).json({ 
        message: "Access denied. Admin privileges required.", 
        success: false, 
        error: true 
      });
    }

    const shops = await Shop.find({ isApproved: false })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email phone');

    console.log("🛠 Found pending shops:", shops.length);

    return res.status(200).json({
      message: "Pending shops fetched successfully",
      data: shops,
      total: shops.length,
      error: false,
      success: true
    });

  } catch (error) {
    console.error("❌ Error in getPendingShopsController:", error);
    return res.status(500).json({
      message: "Server error while fetching pending shops",
      error: true,
      success: false
    });
  }
};

// Approve shop
export const approveShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    console.log("✅ Approving shop:", shopId);

    // Check if user is admin
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
        success: false,
        error: true
      });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
        success: false,
        error: true
      });
    }

    shop.isApproved = true;
    shop.updatedAt = new Date();
    await shop.save();

    console.log("✅ Shop approved successfully:", shopId);

    return res.status(200).json({
      message: "Shop approved successfully",
      data: shop,
      success: true,
      error: false
    });
  } catch (error) {
    console.error("❌ Error approving shop:", error);
    return res.status(500).json({
      message: "Server error while approving shop",
      error: true,
      success: false
    });
  }
};

// Reject shop
export const rejectShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { reason } = req.body;
    console.log("❌ Rejecting shop:", shopId, "Reason:", reason);

    // Check if user is admin
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
        success: false,
        error: true
      });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
        success: false,
        error: true
      });
    }

    // Option 1: Delete the shop completely
    await Shop.findByIdAndDelete(shopId);

    // Option 2: Keep record but mark as rejected (uncomment if you prefer this)
    // shop.isApproved = false;
    // shop.rejectionReason = reason;
    // shop.updatedAt = new Date();
    // await shop.save();

    console.log("❌ Shop rejected successfully:", shopId);

    return res.status(200).json({
      message: "Shop rejected successfully",
      success: true,
      error: false
    });
  } catch (error) {
    console.error("❌ Error rejecting shop:", error);
    return res.status(500).json({
      message: "Server error while rejecting shop",
      error: true,
      success: false
    });
  }
};



