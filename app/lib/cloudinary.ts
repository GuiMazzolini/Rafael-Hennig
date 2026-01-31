const CLOUD_NAME = "YOUR_CLOUD_NAME";

export const cloudinaryImage = (
  folder: string,
  file: string,
  options = "q_auto,f_auto"
) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${options}/${folder}/${file}`;
};