interface User {
  displayName: string | null | undefined;
  uid: string;
}

interface image {
  uri: string;
  type: string;
  name: string;
}
import { Platform } from "react-native";

interface Image {
  uri: string;
  type?: string; // e.g., 'image/jpeg'
  name?: string; // e.g., 'image.jpg'
}

export const uploadImages = async (
  selectedImages: Image[],
  user: User
): Promise<string[]> => {
  const uploadPreset = "ml_default";
  const cloud_name = "drfqge33t";
  const uploadedImageUrls: string[] = [];

  if (!user?.displayName || !user?.uid) {
    console.error("User information is missing");
    return [];
  }

  const safeFolderName = `${user.displayName}_${user.uid}`
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");

  const promises = selectedImages?.map(async (img, index) => {
    try {
      // Normalize URI for Android/iOS
      const uri =
        Platform.OS === "android" ? img.uri : img.uri.replace("file://", "");
      const fileName = img.name || `image_${index + 1}.jpg`;
      const fileType = img.type || "image/jpeg"; // Fallback to JPEG if type is missing

      // Create FormData
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: fileType,
        name: fileName,
      } as any); // 'as any' due to FormData type limitations in RN
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloud_name);
      // Optional: Uncomment to set custom public_id
      // formData.append('public_id', `${safeFolderName}/profile_image_${index + 1}`);

      // Use fetch instead of axios
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(`Cloudinary error: ${JSON.stringify(data.error)}`);
      }

      uploadedImageUrls.push(data.secure_url);
    } catch (error) {
      console.error(`Error uploading image ${index + 1}:`, error);
      throw error; // Re-throw to let Promise.all handle rejection
    }
  });

  try {
    await Promise.all(promises);
    return uploadedImageUrls;
  } catch (error) {
    console.error("Upload batch failed:", error);
    return uploadedImageUrls; // Return partial results if some uploads succeeded
  }
};
