import { CheckCircle, XCircle } from "lucide-react";

export default function McqSection({ questions, answers, isSubmitted, onChange }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
        <strong>Hướng dẫn:</strong> Mỗi câu trả lời đúng được tính 0.25 điểm.
        Chọn 1 đáp án đúng nhất. Cấu trúc câu hỏi và đáp án đã được đảo ngẫu
        nhiên.
      </div>

      {questions.map((q, index) => (
        <div
          key={q.id}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2">
            <span className="text-blue-600 whitespace-nowrap">
              Câu {index + 1}:
            </span>
            <span className="text-gray-800 leading-relaxed">{q.text}</span>
          </h3>

          <div className="space-y-3 pl-4">
            {Object.entries(q.options).map(([key, val]) => {
              const isSelected = answers[q.id] === key;
              const isCorrect = q.correct === key;
              let optionClass =
                "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ";
              if (!isSubmitted) {
                optionClass += isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
              } else if (isCorrect) {
                optionClass += "border-green-500 bg-green-50";
              } else if (isSelected && !isCorrect) {
                optionClass += "border-red-500 bg-red-50";
              } else {
                optionClass += "border-gray-200 opacity-60";
              }

              return (
                <label key={key} className={optionClass}>
                  <input
                    type="radio"
                    name={`mcq-${q.id}`}
                    value={key}
                    checked={isSelected}
                    onChange={() => onChange(q.id, key)}
                    disabled={isSubmitted}
                    className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium flex-1">
                    <span className="font-bold mr-2">{key}.</span>
                    {val}
                  </span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
