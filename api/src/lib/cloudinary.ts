import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET })
export async function uploadImage(base64: string, folder = 'flora') {
  const result = await cloudinary.uploader.upload(base64, { folder, transformation: [{ quality: 'auto', fetch_format: 'auto' }] })
  return { url: result.secure_url, publicId: result.public_id }
}
export const deleteImage = (publicId: string) => cloudinary.uploader.destroy(publicId)
export default cloudinary
