import { useEffect, useRef, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import useAuth from "./userAuth";
import { useToast } from "@/providers/ToastProvider";
import { db } from "@/firebase";

type Notification = {
  id: string;
  message: string;
  [key: string]: any;
};

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const previousIdsRef = useRef<Set<string>>(new Set());
  const isFirstRun = useRef(true); // flag to skip initial snapshot
  const { showToast } = useToast();

  useEffect(() => {
    const currentUser = user?.uid;
    if (!currentUser) return;

    const notificationsQuery = query(
      collection(db, "notifications", currentUser, "userNotifications")
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const newNotifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        message: doc.data()?.message || "",
        ...doc.data(),
      }));

      // Skip toast on first load
      if (!isFirstRun.current) {
        newNotifs.forEach((notif) => {
          if (!previousIdsRef.current.has(notif.id)) {
            showToast({
              text1: `New Notification!`,
              toastType: "success",
              text2: notif?.message,
            });
          }
        });
      } else {
        isFirstRun.current = false;
      }

      previousIdsRef.current = new Set(newNotifs.map((n) => n.id));
      setNotifications(newNotifs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return { notifications, loading };
};

export default useNotifications;
