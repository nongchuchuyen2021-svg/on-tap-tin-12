import { Clock, User, BookOpen, CheckCircle2, RotateCcw } from "lucide-react";
import { formatTime } from "../utils/format";

export default function Toolbar({
  studentInfo,
  onStudentInfoChange,
  timeLeft,
  isSubmitted,
  onSubmit,
  onReset,
}) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm relative border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1 w-full flex flex-col md:flex-row gap-3 items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <User className="text-blue-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Họ và Tên"
              disabled={isSubmitted}
              className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-48 disabled:text-gray-500"
              value={studentInfo.name}
              onChange={(e) => onStudentInfoChange({ name: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <BookOpen className="text-blue-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Lớp"
              disabled={isSubmitted}
              className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-24 disabled:text-gray-500"
              value={studentInfo.class}
              onChange={(e) => onStudentInfoChange({ class: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2.5 rounded-lg font-mono font-bold border border-amber-200 shadow-sm whitespace-nowrap flex-shrink-0">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onSubmit}
              disabled={isSubmitted}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transform transition-all active:scale-95 disabled:opacity-50 disabled:grayscale whitespace-nowrap flex-shrink-0"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Kết thúc bài làm</span>
            </button>

            {isSubmitted && (
              <button
                onClick={onReset}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all shadow-md font-bold whitespace-nowrap flex-shrink-0"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Làm lại bài</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
