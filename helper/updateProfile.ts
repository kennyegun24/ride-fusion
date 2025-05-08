import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { db } from "@/firebase";
import { API_ROUTE } from "@/utils/apiRoute";

interface UpdateUserProfileParams {
  userId: string;
  idToken: string;
  updateData: { [key: string]: any };
  serverUrl: string;
}

export const updateUserProfile = async ({
  userId,
  idToken,
  updateData,
  serverUrl,
}: UpdateUserProfileParams) => {
  if (!userId || !idToken || !updateData) {
    console.error("Missing required parameters for updating user profile.");
    return;
  }

  // Clean the updateData to remove empty, null, or undefined values
  const cleanedData = Object.fromEntries(
    Object.entries(updateData).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  if (Object.keys(cleanedData).length === 0) {
    console.warn("No valid fields to update.");
    return;
  }

  try {
    // Firestore update
    await updateDoc(doc(db, "users", userId), cleanedData);

    // Server update
    await axios.patch(
      `${API_ROUTE}${serverUrl}`,
      { updates: cleanedData },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
