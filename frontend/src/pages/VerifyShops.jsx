// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   Button, 
//   Grid, 
//   Chip,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton
// } from '@mui/material';
// import { 
//   CheckCircle, 
//   Cancel, 
//   LocationOn, 
//   Phone, 
//   Email,
//   Person,
//   Refresh
// } from '@mui/icons-material';
// import { API } from '../config/api';

// const VerifyShops = () => {
//   const { user } = useSelector(state => state.user);
//   const [pendingShops, setPendingShops] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedShop, setSelectedShop] = useState(null);
//   const [approveDialog, setApproveDialog] = useState(false);
//   const [rejectDialog, setRejectDialog] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');

//   const isAdmin = user?.role === 'admin';

//   const fetchPendingShops = async () => {
//     if (!isAdmin) return;

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(API.GET_PENDING_SHOPS, {
//         method: 'GET',
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch pending shops');
//       }

//       setPendingShops(data.data || []);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching pending shops:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (shopId) => {
//     try {
//       const response = await fetch(`${API.APPROVE_SHOP}/${shopId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to approve shop');
//       }

//       setPendingShops(prev => prev.filter(shop => shop._id !== shopId));
//       setApproveDialog(false);
//       setSelectedShop(null);
      
//       alert('Shop approved successfully!');
//     } catch (err) {
//       setError(err.message);
//       console.error('Error approving shop:', err);
//     }
//   };

//   const handleReject = async (shopId, reason) => {
//     try {
//       const response = await fetch(`${API.REJECT_SHOP}/${shopId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ 
//           reason: reason || 'No reason provided'
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to reject shop');
//       }

//       setPendingShops(prev => prev.filter(shop => shop._id !== shopId));
//       setRejectDialog(false);
//       setSelectedShop(null);
//       setRejectReason('');
      
//       alert('Shop rejected successfully!');
//     } catch (err) {
//       setError(err.message);
//       console.error('Error rejecting shop:', err);
//     }
//   };

//   const openApproveDialog = (shop) => {
//     setSelectedShop(shop);
//     setApproveDialog(true);
//   };

//   const openRejectDialog = (shop) => {
//     setSelectedShop(shop);
//     setRejectDialog(true);
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       fetchPendingShops();
//     }
//   }, [isAdmin]);

//   if (!isAdmin) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Alert severity="error" sx={{ maxWidth: 500, mx: 'auto' }}>
//           <Typography variant="h6">Access Denied</Typography>
//           <Typography>
//             You need administrator privileges to access this page.
//           </Typography>
//         </Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">
//           Pending Shop Approvals
//           <Chip 
//             label={`${pendingShops.length} pending`} 
//             color="warning" 
//             sx={{ ml: 2 }} 
//           />
//         </Typography>
//         <IconButton onClick={fetchPendingShops} disabled={loading}>
//           <Refresh />
//         </IconButton>
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//           {error}
//         </Alert>
//       )}

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
//           <CircularProgress />
//         </Box>
//       ) : pendingShops.length === 0 ? (
//         <Alert severity="info">
//           No pending shops for approval.
//         </Alert>
//       ) : (
//         <Grid container spacing={3}>
//           {pendingShops.map((shop) => (
//             <Grid item xs={12} md={6} lg={4} key={shop._id}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 {shop.images && shop.images.length > 0 && (
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={shop.images[0]}
//                     alt={shop.name}
//                     sx={{ objectFit: 'cover' }}
//                   />
//                 )}
                
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6" gutterBottom>
//                     {shop.name}
//                   </Typography>
                  
//                   <Chip 
//                     label="Pending Approval" 
//                     color="warning" 
//                     size="small" 
//                     sx={{ mb: 2 }}
//                   />

//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                       <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
//                       {shop.address}
//                     </Typography>
                    
//                     {shop.phone && (
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                         <Phone sx={{ fontSize: 16, mr: 0.5 }} />
//                         {shop.phone}
//                       </Typography>
//                     )}
                    
//                     {shop.email && (
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                         <Email sx={{ fontSize: 16, mr: 0.5 }} />
//                         {shop.email}
//                       </Typography>
//                     )}

//                     {shop.createdBy && (
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                         <Person sx={{ fontSize: 16, mr: 0.5 }} />
//                         Owner: {shop.createdBy.name} ({shop.createdBy.email})
//                       </Typography>
//                     )}

//                     {shop.services && shop.services.length > 0 && (
//                       <Box sx={{ mt: 1 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                           Services:
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {shop.services.join(', ')}
//                         </Typography>
//                       </Box>
//                     )}

//                     <Typography variant="caption" color="text.secondary">
//                       Created: {new Date(shop.createdAt).toLocaleDateString()}
//                     </Typography>
//                   </Box>
//                 </CardContent>

//                 <Box sx={{ p: 2, pt: 0 }}>
//                   <Grid container spacing={1}>
//                     <Grid item xs={6}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         color="success"
//                         startIcon={<CheckCircle />}
//                         onClick={() => openApproveDialog(shop)}
//                         size="small"
//                       >
//                         Approve
//                       </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         color="error"
//                         startIcon={<Cancel />}
//                         onClick={() => openRejectDialog(shop)}
//                         size="small"
//                       >
//                         Reject
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Dialogs */}
//       <Dialog open={approveDialog} onClose={() => setApproveDialog(false)}>
//         <DialogTitle>Approve Shop</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Approve <strong>"{selectedShop?.name}"</strong>? This shop will become visible to all users.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setApproveDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={() => handleApprove(selectedShop?._id)}
//             variant="contained" 
//             color="success"
//           >
//             Approve
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Reject Shop</DialogTitle>
//         <DialogContent>
//           <Typography gutterBottom>
//             Reject <strong>"{selectedShop?.name}"</strong>?
//           </Typography>
//           <TextField
//             fullWidth
//             label="Rejection Reason (Optional)"
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//             multiline
//             rows={3}
//             sx={{ mt: 2 }}
//             placeholder="Provide reason for rejection..."
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setRejectDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={() => handleReject(selectedShop?._id, rejectReason)}
//             variant="outlined" 
//             color="error"
//           >
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default VerifyShops;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Grid, 
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { 
  CheckCircle, 
  Cancel, 
  LocationOn, 
  Phone, 
  Email,
  Person,
  Refresh,
  Image as ImageIcon
} from '@mui/icons-material';
import { API } from '../config/api';

const VerifyShops = () => {
  const { user } = useSelector(state => state.user);
  const [pendingShops, setPendingShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const isAdmin = user?.role === 'admin';

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // If it's already a full URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /
    if (imagePath.startsWith('/')) {
      return `${import.meta.env.VITE_BASEURL}${imagePath}`;
    }
    
    // If it's just a filename, assume it's in uploads
    return `${import.meta.env.VITE_BASEURL}/uploads/${imagePath}`;
  };

  const fetchPendingShops = async () => {
    if (!isAdmin) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API.GET_PENDING_SHOPS, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch pending shops');
      }

      console.log('Fetched shops:', data.data); // Debug log
      setPendingShops(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pending shops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (shopId) => {
    try {
      const response = await fetch(`${API.APPROVE_SHOP}/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to approve shop');
      }

      setPendingShops(prev => prev.filter(shop => shop._id !== shopId));
      setApproveDialog(false);
      setSelectedShop(null);
      
      alert('Shop approved successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error approving shop:', err);
    }
  };

  const handleReject = async (shopId, reason) => {
    try {
      const response = await fetch(`${API.REJECT_SHOP}/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          reason: reason || 'No reason provided'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reject shop');
      }

      setPendingShops(prev => prev.filter(shop => shop._id !== shopId));
      setRejectDialog(false);
      setSelectedShop(null);
      setRejectReason('');
      
      alert('Shop rejected successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error rejecting shop:', err);
    }
  };

  const openApproveDialog = (shop) => {
    setSelectedShop(shop);
    setApproveDialog(true);
  };

  const openRejectDialog = (shop) => {
    setSelectedShop(shop);
    setRejectDialog(true);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPendingShops();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ maxWidth: 500, mx: 'auto' }}>
          <Typography variant="h6">Access Denied</Typography>
          <Typography>
            You need administrator privileges to access this page.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Pending Shop Approvals
          <Chip 
            label={`${pendingShops.length} pending`} 
            color="warning" 
            sx={{ ml: 2 }} 
          />
        </Typography>
        <IconButton onClick={fetchPendingShops} disabled={loading}>
          <Refresh />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : pendingShops.length === 0 ? (
        <Alert severity="info">
          No pending shops for approval.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {pendingShops.map((shop) => (
            <Grid item xs={12} md={6} lg={4} key={shop._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Image Section with better handling */}
                {shop.images && shop.images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageUrl(shop.images[0])}
                    alt={shop.name}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      console.log('Image failed to load:', shop.images[0]);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: 'grey.100', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                    <Typography variant="body2" color="grey.500">
                      No Image
                    </Typography>
                  </Box>
                )}
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {shop.name}
                  </Typography>
                  
                  <Chip 
                    label="Pending Approval" 
                    color="warning" 
                    size="small" 
                    sx={{ mb: 2 }}
                  />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5, mt: 0.25 }} />
                      {shop.address}
                    </Typography>
                    
                    {shop.phone && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ fontSize: 16, mr: 0.5 }} />
                        {shop.phone}
                      </Typography>
                    )}
                    
                    {shop.email && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ fontSize: 16, mr: 0.5 }} />
                        {shop.email}
                      </Typography>
                    )}

                    {shop.createdBy && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                        <Person sx={{ fontSize: 16, mr: 0.5, mt: 0.25 }} />
                        Owner: {shop.createdBy.name} ({shop.createdBy.email})
                      </Typography>
                    )}

                    {shop.services && shop.services.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Services:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {shop.services.join(', ')}
                        </Typography>
                      </Box>
                    )}

                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(shop.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => openApproveDialog(shop)}
                        size="small"
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => openRejectDialog(shop)}
                        size="small"
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialogs remain the same */}
      <Dialog open={approveDialog} onClose={() => setApproveDialog(false)}>
        <DialogTitle>Approve Shop</DialogTitle>
        <DialogContent>
          <Typography>
            Approve <strong>"{selectedShop?.name}"</strong>? This shop will become visible to all users.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleApprove(selectedShop?._id)}
            variant="contained" 
            color="success"
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Shop</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Reject <strong>"{selectedShop?.name}"</strong>?
          </Typography>
          <TextField
            fullWidth
            label="Rejection Reason (Optional)"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            multiline
            rows={3}
            sx={{ mt: 2 }}
            placeholder="Provide reason for rejection..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleReject(selectedShop?._id, rejectReason)}
            variant="outlined" 
            color="error"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerifyShops;