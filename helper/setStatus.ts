import { db } from "@/firebase";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function setStatus(userId: string, state: string) {
  const userStatusRef = doc(db, "users", userId);
  await updateDoc(userStatusRef, {
    online: state,
    last_changed: serverTimestamp(),
  });
}
