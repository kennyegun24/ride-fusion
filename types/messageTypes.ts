import { Timestamp } from "firebase/firestore";

export interface messages {
  id: string;
  date: Timestamp;
  senderId: string;
  text: string;
  myId?: string;
}

// export interface Message {
//   id: string;
//   date: Timestamp;
//   senderId: string;
//   text: string;
// }

export type Message = {
  id: string;
  text: string;
  senderId: string;
  date: any; // or Timestamp
  // add more fields if you have them (e.g., imageUrl, etc.)
};
