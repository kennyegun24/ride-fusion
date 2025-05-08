import { Timestamp } from "firebase/firestore";

// ✅ Utility to convert any supported input to Date object
export const normalizeDate = (
  input: Timestamp | Date | string | number | null | undefined
): Date | null => {
  if (!input) return null;

  if (input instanceof Date) return input;
  if (input instanceof Timestamp) return input.toDate();
  if (typeof input === "number") return new Date(input);
  if (typeof input === "string") {
    const parsed = new Date(input);
    return isNaN(parsed.getTime()) ? null : parsed; // invalid date check
  }

  return null; // fallback for unsupported
};

// ✅ Formats time like "02:30 PM"
export const chatTime = (
  e: Timestamp | Date | string | number | null | undefined
) => {
  const date = normalizeDate(e);
  if (!date) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ✅ Formats date like "Today", "Yesterday" or "April 5, 2025"
export const formatChatDate = (
  input: Timestamp | Date | string | number | null | undefined
) => {
  const parsedDate = normalizeDate(input);
  if (!parsedDate) return "";

  const today = new Date();
  const yesterday = new Date();
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
