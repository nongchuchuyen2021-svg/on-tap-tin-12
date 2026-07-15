// Lưu lịch sử kết quả vào localStorage của trình duyệt (không có server).
// Chỉ ghi lại SAU KHI đã nộp bài xong, nên không ảnh hưởng tới việc
// bài làm dở dang bị mất khi chuyển tab / tải lại trang.
const HISTORY_KEY = "ontap-tin12-history";
const MAX_HISTORY = 20;

export const loadResultHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveResultToHistory = (result) => {
  try {
    const history = loadResultHistory();
    history.unshift({ ...result, submittedAt: new Date().toISOString() });
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY)),
    );
  } catch {
    // localStorage có thể không khả dụng (chế độ ẩn danh) - bỏ qua, không chặn nộp bài
  }
};
