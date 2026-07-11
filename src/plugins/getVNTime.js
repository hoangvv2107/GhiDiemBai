export const getVietnamTime = () => {
  const now = new Date();
  return now.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit", // In ra 07 thay vì 7
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Dùng định dạng 24h
  });
};
