import axios from "axios";

const upload = async (file) => {
  if (!file) {
    alert("Please select an image");
    return null;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "GigFlow");


  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dqscz1un7/image/upload",
      data
    );
    return res.data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.response?.data || err.message);
    throw err;
  }
};

export default upload;
