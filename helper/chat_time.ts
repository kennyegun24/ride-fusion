export const chatTime = (e: Date) => {
  const date = new Date(e);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatChatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateStr = date.toDateString();
  const todayStr = today.toDateString();
  const yestStr = yesterday.toDateString();

  if (dateStr === todayStr) return "Today";
  if (dateStr === yestStr) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
