export default function ResultsBanner({ studentInfo, scores, history }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 shadow-sm text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-2">Đã nộp bài!</h2>
      <p className="text-green-700 mb-4">
        Học sinh: <span className="font-bold">{studentInfo.name}</span> - Lớp:{" "}
        <span className="font-bold">{studentInfo.class}</span>
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
          <p className="text-sm text-gray-500 font-medium">Trắc nghiệm</p>
          <p className="text-xl font-bold text-blue-600">
            {scores.mcq.toFixed(2)} điểm
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
          <p className="text-sm text-gray-500 font-medium">Đúng / Sai</p>
          <p className="text-xl font-bold text-blue-600">
            {scores.tf.toFixed(2)} điểm
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
          <p className="text-sm text-gray-500 font-medium">Tổng Trắc Nghiệm</p>
          <p className="text-2xl font-bold text-green-600">
            {scores.total.toFixed(2)} điểm
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 italic">
        * Điểm tự luận sẽ được giáo viên chấm sau.
      </p>

      {history.length > 0 && (
        <div className="mt-6 pt-4 border-t border-green-200 text-left max-w-md mx-auto">
          <h3 className="text-sm font-bold text-gray-600 mb-2 text-center">
            Lịch sử làm bài trên thiết bị này
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 max-h-40 overflow-y-auto">
            {history.map((item, i) => (
              <li
                key={i}
                className="flex justify-between gap-2 bg-white/70 px-3 py-1.5 rounded border border-green-100"
              >
                <span className="truncate">
                  {item.name} - {item.class}
                </span>
                <span className="font-semibold text-blue-600 whitespace-nowrap">
                  {item.totalScore.toFixed(2)} điểm
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Lịch sử chỉ lưu trên trình duyệt/điện thoại này, không gửi đi đâu
            cả.
          </p>
        </div>
      )}
    </div>
  );
}
