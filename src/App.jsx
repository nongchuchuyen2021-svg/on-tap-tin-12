import { useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import ResultsBanner from "./components/ResultsBanner";
import TabsNav from "./components/TabsNav";
import McqSection from "./components/McqSection";
import TfSection from "./components/TfSection";
import EssaySection from "./components/EssaySection";
import ConfirmModal from "./components/ConfirmModal";
import { generateShuffledData } from "./utils/shuffle";
import { calculateScore } from "./utils/scoring";
import { loadResultHistory, saveResultToHistory } from "./utils/resultHistory";

const EXAM_DURATION_MS = 45 * 60 * 1000;

export default function App() {
  const [studentInfo, setStudentInfo] = useState({ name: "", class: "" });
  const [activeTab, setActiveTab] = useState("mcq");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [scores, setScores] = useState({ mcq: 0, tf: 0, total: 0 });
  const [history, setHistory] = useState(() => loadResultHistory());

  const [quizData, setQuizData] = useState(() => generateShuffledData());
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [tfAnswers, setTfAnswers] = useState({});
  const [essayAnswers, setEssayAnswers] = useState({});

  // Mốc thời gian kết thúc bài (thời gian thực), không phải bộ đếm số tick.
  const [examEndTime, setExamEndTime] = useState(
    () => Date.now() + EXAM_DURATION_MS,
  );
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MS / 1000);

  const handleMcqChange = (qId, option) => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleTfChange = (qId, statementKey, value) => {
    if (isSubmitted) return;
    setTfAnswers((prev) => ({
      ...prev,
      [qId]: { ...(prev[qId] || {}), [statementKey]: value },
    }));
  };

  const handleEssayChange = (qId, text) => {
    if (isSubmitted) return;
    setEssayAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const executeSubmit = (submitName, submitClass) => {
    const currentScores = calculateScore(quizData, mcqAnswers, tfAnswers);
    setScores(currentScores);
    setShowConfirmModal(false);
    setIsSubmitted(true);
    setActiveTab("mcq");
    window.scrollTo({ top: 0, behavior: "smooth" });

    saveResultToHistory({
      name: submitName,
      class: submitClass,
      mcqScore: currentScores.mcq,
      tfScore: currentScores.tf,
      totalScore: currentScores.total,
    });
    setHistory(loadResultHistory());
  };

  const handleForceSubmit = () => {
    const finalName = studentInfo.name.trim() || "Không ghi tên (Hết giờ)";
    const finalClass = studentInfo.class.trim() || "Không rõ";
    setStudentInfo({ name: finalName, class: finalClass });
    executeSubmit(finalName, finalClass);
  };

  const handleSubmit = () => {
    if (!studentInfo.name.trim() || !studentInfo.class.trim()) {
      setShowConfirmModal("info_missing");
      return;
    }
    setShowConfirmModal("confirm");
  };

  const confirmSubmit = () => {
    executeSubmit(studentInfo.name, studentInfo.class);
  };

  const handleReset = () => {
    if (
      !window.confirm(
        "Em có chắc chắn muốn xóa hết kết quả và làm lại từ đầu không?",
      )
    ) {
      return;
    }
    setIsSubmitted(false);
    setMcqAnswers({});
    setTfAnswers({});
    setEssayAnswers({});
    setScores({ mcq: 0, tf: 0, total: 0 });
    setQuizData(generateShuffledData());
    setExamEndTime(Date.now() + EXAM_DURATION_MS);
    setTimeLeft(EXAM_DURATION_MS / 1000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Đếm ngược theo mốc thời gian thực: mỗi lần tick (hoặc khi tab được mở
  // lại) đều tính lại thời gian còn lại từ Date.now(), nên trình duyệt di
  // động "ghìm" bộ đếm khi chuyển sang app khác không giúp kéo dài giờ làm bài.
  useEffect(() => {
    if (isSubmitted) return undefined;

    const tick = () => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((examEndTime - Date.now()) / 1000),
      );
      setTimeLeft(remainingSeconds);
      if (remainingSeconds === 0) {
        handleForceSubmit();
      }
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examEndTime, isSubmitted]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">
            ÔN TẬP CUỐI KÌ 2 TIN HỌC 12
          </h1>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-xl md:text-2xl font-bold text-blue-100 uppercase tracking-widest">
            TRƯỜNG THPT NA RÌ
          </p>
        </div>
      </div>

      <Toolbar
        studentInfo={studentInfo}
        onStudentInfoChange={(patch) =>
          setStudentInfo((prev) => ({ ...prev, ...patch }))
        }
        timeLeft={timeLeft}
        isSubmitted={isSubmitted}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      <main className="max-w-5xl mx-auto px-4 mt-6">
        {isSubmitted && (
          <ResultsBanner
            studentInfo={studentInfo}
            scores={scores}
            history={history}
          />
        )}

        <TabsNav activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "mcq" && (
          <McqSection
            questions={quizData.mcq}
            answers={mcqAnswers}
            isSubmitted={isSubmitted}
            onChange={handleMcqChange}
          />
        )}

        {activeTab === "tf" && (
          <TfSection
            questions={quizData.tf}
            answers={tfAnswers}
            isSubmitted={isSubmitted}
            onChange={handleTfChange}
          />
        )}

        {activeTab === "essay" && (
          <EssaySection
            questions={quizData.essay}
            answers={essayAnswers}
            isSubmitted={isSubmitted}
            onChange={handleEssayChange}
          />
        )}
      </main>

      <ConfirmModal
        mode={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSubmit}
      />
    </div>
  );
}
