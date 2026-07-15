import { AlertTriangle } from "lucide-react";

const preventCopyPaste = (e) => e.preventDefault();

export default function EssaySection({ questions, answers, isSubmitted, onChange }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6 flex gap-2 items-start">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Lưu ý:</strong> Học sinh tự gõ câu trả lời vào ô trống. Tính
          năng Sao chép (Copy) và Dán (Paste) đã bị vô hiệu hóa để đảm bảo
          tính tự giác.
        </div>
      </div>

      {questions.map((q, index) => (
        <div
          key={q.id}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2 w-full">
            <span className="text-blue-600 whitespace-nowrap">
              Câu {index + 1}:
            </span>
            <span className="text-gray-800 flex-1">{q.text}</span>
          </h3>

          <textarea
            className={`w-full p-4 border rounded-lg resize-y focus:ring-2 outline-none transition-shadow min-h-[150px] ${
              isSubmitted
                ? "bg-gray-50 border-gray-200 text-gray-600"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
            placeholder={
              isSubmitted
                ? "Bài làm đã được nộp."
                : "Nhập câu trả lời của bạn tại đây..."
            }
            value={answers[q.id] || ""}
            onChange={(e) => onChange(q.id, e.target.value)}
            disabled={isSubmitted}
            onCopy={preventCopyPaste}
            onPaste={preventCopyPaste}
            onCut={preventCopyPaste}
            autoComplete="off"
            spellCheck="false"
          ></textarea>

          {isSubmitted && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 text-sm mb-1">
                Gợi ý đáp án:
              </h4>
              <p className="text-sm text-yellow-900 leading-relaxed">
                {q.hint}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
