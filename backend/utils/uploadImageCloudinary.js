// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//     cloud_name : process.env.CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET_KEY
// })
// const uploadImageCloudinary = async(image)=>{
//     const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
//     const uploadImage = await new Promise((resolve, reject)=>{
//         cloudinary.uploader.upload_stream({folder : "ewaste"},(error, uploadRes)=>{
//             return resolve(uploadRes)
//         }).end(buffer)
//     })

//     return uploadImage
// }

// export default uploadImageCloudinary

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageCloudinary = async (images = []) => {
  // Upload multiple images in parallel
  const uploadPromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const buffer = image.buffer;
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ewaste" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url); // return the image URL
        }
      );
      stream.end(buffer);
    });
  });

  // Wait for all uploads to finish
  const results = await Promise.all(uploadPromises);
  return results; // array of URLs
};

export default uploadImageCloudinary;
