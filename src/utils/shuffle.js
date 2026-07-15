import mcqDataOriginal from "../data/mcqData";
import tfDataOriginal from "../data/tfData";
import essayDataOriginal from "../data/essayData";

export const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Đảo ngẫu nhiên thứ tự câu hỏi và đáp án mỗi lần tạo đề mới
// (được gọi lại khi tải trang / làm lại bài, để hạn chế học sinh
// tra cứu đáp án cố định hoặc nhờ người khác làm hộ theo thứ tự cũ)
export const generateShuffledData = () => {
  const shuffledMcq = shuffleArray(mcqDataOriginal).map((q) => {
    const correctValue = q.options[q.correct];
    const shuffledValues = shuffleArray(Object.values(q.options));

    const newOptions = {};
    let newCorrect = "";
    const labels = ["A", "B", "C", "D"];

    shuffledValues.forEach((val, index) => {
      newOptions[labels[index]] = val;
      if (val === correctValue) {
        newCorrect = labels[index];
      }
    });
    return { ...q, options: newOptions, correct: newCorrect };
  });

  const shuffledTf = shuffleArray(tfDataOriginal).map((q) => {
    const shuffledEntries = shuffleArray(Object.entries(q.statements));

    const newStatements = {};
    const newCorrect = {};
    const labels = ["a", "b", "c", "d"];

    shuffledEntries.forEach(([oldKey, statementText], index) => {
      const newLabel = labels[index];
      newStatements[newLabel] = statementText;
      newCorrect[newLabel] = q.correct[oldKey];
    });

    return { ...q, statements: newStatements, correct: newCorrect };
  });

  const shuffledEssay = shuffleArray(essayDataOriginal);

  return { mcq: shuffledMcq, tf: shuffledTf, essay: shuffledEssay };
};
