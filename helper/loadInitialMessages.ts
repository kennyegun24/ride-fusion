import { db } from "@/firebase";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import axios from "axios";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  onSnapshot,
  startAfter,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import uuid from "react-native-uuid";

const MESSAGES_PER_PAGE = 30;
export const loadInitialMessages = async (
  id: string,
  setMessages: React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
  setLastDoc: (doc: QueryDocumentSnapshot<DocumentData>) => void,
  lastLoadedMessageIds: Set<string> // 👈 Pass this in
) => {
  const chatsQuery = query(
    collection(db, "chats", id, "messages"),
    orderBy("date", "desc"),
    limit(MESSAGES_PER_PAGE)
  );

  const snapshot = await getDocs(chatsQuery);

  if (!snapshot.empty) {
    const fetchedMessages: MessageType.Text[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      lastLoadedMessageIds.add(data.id); // 👈 Add ID to the set

      return {
        id: data.id,
        createdAt: (data.date as Timestamp).toMillis(),
        author: { id: data.senderId },
        text: data.text,
        type: "text",
      };
    });

    setMessages(fetchedMessages);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]); // Save for pagination
  }
};

export const realTimeListener = (
  id: string,
  setMessages: React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
  lastLoadedMessageIds: Set<string>
) => {
  const chatsQuery = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("date", "desc"),
    limit(1)
  );

  const unsub = onSnapshot(chatsQuery, (snapshot) => {
    const newMessages: MessageType.Text[] = snapshot
      .docChanges()
      .filter((doc) => doc.type === "added")
      .map((doc) => {
        const data = doc.doc.data();
        if (lastLoadedMessageIds.has(data.id)) return null;
        return {
          id: data.id,
          createdAt: (data.date as Timestamp).toMillis(),
          author: { id: data.senderId },
          text: data.text,
          type: "text",
        };
      })
      .filter(Boolean) as MessageType.Text[];

    if (newMessages.length > 0) {
      setMessages((prev: MessageType.Text[]) => [...newMessages, ...prev]);
      // Add to loaded IDs
      newMessages.forEach((msg) => lastLoadedMessageIds.add(msg.id));
    }
  });

  return unsub;
};

export const onPaginate = async (
  id: string,
  loadingMore: boolean,
  lastDoc: QueryDocumentSnapshot<DocumentData>,
  setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>,
  setMessages: React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
  setLastDoc: (doc: QueryDocumentSnapshot<DocumentData>) => void,
  lastLoadedMessageIds: Set<string> // 👈 Add this param
) => {
  if (loadingMore || !lastDoc) return;

  setLoadingMore(true);

  const chatsQuery = query(
    collection(db, "chats", id, "messages"),
    orderBy("date", "desc"),
    startAfter(lastDoc),
    limit(MESSAGES_PER_PAGE)
  );

  const snapshot = await getDocs(chatsQuery);
  if (!snapshot.empty) {
    const fetchedMessages: MessageType.Text[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      lastLoadedMessageIds.add(data.id); // 👈 Track loaded IDs here too

      return {
        id: data.id,
        createdAt: (data.date as Timestamp).toMillis(),
        author: { id: data.senderId },
        text: data.text,
        type: "text",
      };
    });

    setMessages((prev) => [...prev, ...fetchedMessages]); // Append at end (older msgs)
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  }

  setLoadingMore(false); // ✅ Don't forget to set loading false at end
};

type sendProps = {
  message: MessageType.PartialText;
  currentUser: any;
  id: string;
  chatDetails: any;
  token: string | undefined;
};
export const handleSendMessage = async ({
  message,
  currentUser,
  id,
  chatDetails,
  token,
}: sendProps) => {
  try {
    if (currentUser?.uid && !Array.isArray(id) && token) {
      const messageId = uuid.v4();
      await setDoc(doc(db, "chats", id, "messages", messageId), {
        id: messageId,
        text: message.text,
        senderId: currentUser?.uid,
        date: Timestamp.now(),
      });

      await updateDoc(doc(db, "userChat", currentUser?.uid), {
        [id + ".lastMessage"]: {
          text: message.text,
        },
        [id + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChat", chatDetails.uid), {
        [id + ".lastMessage"]: {
          text: message.text,
        },
        [id + ".date"]: serverTimestamp(),
      });

      await axios.post(
        "http://172.20.10.3:4000/api/message/push-message",
        {
          message: message.text,
          receiverId: chatDetails?.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
