import { db } from "@/firebase";
import { useFocusEffect } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const auth = getAuth().currentUser;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user: auth, userDetails, loading };
};

export default useAuth;
