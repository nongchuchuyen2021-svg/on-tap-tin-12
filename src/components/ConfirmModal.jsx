import { AlertTriangle, CheckCircle } from "lucide-react";

export default function ConfirmModal({ mode, onClose, onConfirm }) {
  if (!mode) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
        {mode === "info_missing" ? (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Thiếu thông tin!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Vui lòng điền đầy đủ Họ Tên và Lớp trước khi nộp bài.
            </p>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
              >
                Đã hiểu
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Xác nhận nộp bài
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Bạn có chắc chắn muốn kết thúc bài làm và nộp bài không? Hành
              động này không thể hoàn tác.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold flex-1"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex-1"
              >
                Nộp bài
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
