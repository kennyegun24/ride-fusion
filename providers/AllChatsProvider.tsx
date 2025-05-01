import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useToast } from "@/providers/ToastProvider";
import useAuth from "@/hooks/userAuth";
import { db } from "@/firebase";
import { usePathname } from "expo-router";

type ChatContextType = {
  chats: DocumentData | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  chats: undefined,
});

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chats, setChats] = useState<DocumentData | undefined>(undefined);
  const { user } = useAuth();
  const { showToast } = useToast();
  const pathname = usePathname();
  const isInitialLoadRef = useRef(true); // Tracks if initial load is complete
  const prevChatsRef = useRef<DocumentData | undefined>(undefined);

  // Set up onSnapshot listener
  useEffect(() => {
    if (!user?.uid) return;

    const chatQuery = doc(db, "userChat", user.uid);
    const unsubscribe = onSnapshot(
      chatQuery,
      (snapshot) => {
        const newData = snapshot.data();
        setChats(newData);
      },
      (error) => {
        console.error("Error fetching chats:", error);
        showToast({
          toastType: "error",
          text1: "Failed to fetch messages",
        });
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Handle toast notifications based on chats and pathname
  useEffect(() => {
    // Skip if no chats or initial load is not complete
    if (!chats || isInitialLoadRef.current) {
      // Mark initial load complete after first chats data is processed
      if (chats && isInitialLoadRef.current) {
        isInitialLoadRef.current = false;
      }
      prevChatsRef.current = chats; // Initialize prevChatsRef
      return;
    }

    // Check if chats have changed
    if (prevChatsRef.current !== chats) {
      // Show toast only if not on /all or /chats routes
      if (pathname !== "/all" && !pathname.startsWith("/chats")) {
        showToast({
          toastType: "success",
          text1: "New message received!",
        });
      }
    }

    // Update prevChatsRef for the next comparison
    prevChatsRef.current = chats;
  }, [chats, pathname, showToast]);

  return (
    <ChatContext.Provider value={{ chats }}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
