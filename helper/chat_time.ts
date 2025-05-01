import { Timestamp } from "firebase/firestore";

export const chatTime = (e: Timestamp | Date | string) => {
  let date: Date;

  if (e instanceof Timestamp) {
    date = e.toDate();
  } else if (e instanceof Date || typeof e === "string") {
    date = new Date(e);
  } else {
    return ""; // fallback for unsupported types
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatChatDate = (date: Timestamp | Date | string) => {
  const parsedDate =
    date instanceof Timestamp
      ? date.toDate()
      : date instanceof Date
      ? date
      : new Date(date);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateStr = parsedDate.toDateString();
  const todayStr = today.toDateString();
  const yestStr = yesterday.toDateString();

  if (dateStr === todayStr) return "Today";
  if (dateStr === yestStr) return "Yesterday";

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const normalizeDate = (
  input: Timestamp | Date | string | number
): Date => {
  if (input instanceof Date) return input;
  if (input instanceof Timestamp) return input.toDate();
  if (typeof input === "number") return new Date(input);
  return new Date(input); // handles ISO strings
};
