import { TF_KEYS, TF_POINTS_BY_CORRECT_COUNT } from "../utils/scoring";

export default function TfSection({ questions, answers, isSubmitted, onChange }) {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
        <strong>Hướng dẫn:</strong> Mỗi câu có 4 ý (a, b, c, d). Điểm từng câu
        tính theo số ý trả lời đúng: 1 ý đúng = 0.1đ; 2 ý đúng = 0.25đ; 3 ý
        đúng = 0.5đ; 4 ý đúng = 1.0đ.
      </div>

      {questions.map((q, index) => {
        const userAns = answers[q.id] || {};
        let correctCount = 0;
        if (isSubmitted) {
          TF_KEYS.forEach((key) => {
            if (userAns[key] === q.correct[key]) correctCount++;
          });
        }
        const qPoints = TF_POINTS_BY_CORRECT_COUNT[correctCount] || 0;

        return (
          <div
            key={q.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="font-semibold text-base md:text-lg flex flex-col md:flex-row gap-1 md:gap-2 w-full">
                <span className="text-blue-600 whitespace-nowrap">
                  Câu {index + 1}:
                </span>
                <span className="text-gray-800 flex-1">{q.text}</span>
              </h3>
              {isSubmitted && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">
                  {qPoints.toFixed(2)} điểm ({correctCount}/4)
                </div>
              )}
            </div>

            <div className="space-y-4 pl-4 mt-6">
              {Object.entries(q.statements).map(([key, statement]) => {
                const ans = userAns[key];
                const isCorrect = q.correct[key];
                let rowClass =
                  "flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-lg border ";
                if (!isSubmitted) {
                  rowClass += ans
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-gray-100 bg-gray-50/50";
                } else {
                  rowClass += "border-red-500 bg-red-50";
                }
                if (isSubmitted && ans === isCorrect) {
                  rowClass =
                    "flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-lg border border-green-500 bg-green-50";
                }

                return (
                  <div key={key} className={rowClass}>
                    <div className="flex-1 font-medium flex gap-2">
                      <span className="font-bold">{key})</span>
                      <span>{statement}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {["True", "False"].map((option) => {
                        const optionText = option === "True" ? "Đúng" : "Sai";
                        let optionClass =
                          "flex items-center justify-center w-20 py-2 rounded border cursor-pointer transition-colors ";
                        if (!isSubmitted) {
                          optionClass +=
                            ans === option
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white border-gray-300 hover:bg-gray-100";
                        } else if (isCorrect === option) {
                          optionClass +=
                            "bg-green-600 text-white border-green-600";
                        } else if (ans === option) {
                          optionClass += "bg-red-600 text-white border-red-600";
                        } else {
                          optionClass +=
                            "bg-gray-100 border-gray-300 text-gray-400";
                        }

                        return (
                          <label key={option} className={optionClass}>
                            <input
                              type="radio"
                              name={`tf-${q.id}-${key}`}
                              className="hidden"
                              checked={ans === option}
                              onChange={() => onChange(q.id, key, option)}
                              disabled={isSubmitted}
                            />
                            {optionText}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
