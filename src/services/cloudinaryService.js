export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "react_upload"
  );

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dwmfqzmf9/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  return data.secure_url;
};