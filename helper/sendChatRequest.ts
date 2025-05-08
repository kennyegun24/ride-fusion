import { API_ROUTE } from "@/utils/apiRoute";
import axios from "axios";
import { User } from "firebase/auth";

type sendrequestProps = {
  triggerLoader: (e: boolean) => void;
  userId: string;
  showToast: (e: any) => void;
  user: User | null;
};
export const sendChatRequest = async ({
  triggerLoader,
  userId,
  showToast,
  user,
}: sendrequestProps) => {
  try {
    triggerLoader(true);
    const token = await user?.getIdToken();
    if (!token) return;
    const req = await axios.post(
      `${API_ROUTE}chat/request`,
      {
        receiverId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ send token in headers
        },
      }
    );
    showToast({ text1: "Message request sent", toastType: "success" });
  } catch (error) {
    showToast({
      text1: "Request already sent or something went wrong",
      toastType: "error",
    });
  } finally {
    triggerLoader(false);
  }
};
