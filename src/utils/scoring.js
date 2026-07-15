export const TF_KEYS = ["a", "b", "c", "d"];
export const TF_POINTS_BY_CORRECT_COUNT = { 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };

export const calculateScore = (quizData, mcqAnswers, tfAnswers) => {
  let mcqScore = 0;
  quizData.mcq.forEach((q) => {
    if (mcqAnswers[q.id] === q.correct) {
      mcqScore += 0.25;
    }
  });

  let tfScore = 0;
  quizData.tf.forEach((q) => {
    const userAns = tfAnswers[q.id] || {};
    let correctCount = 0;
    TF_KEYS.forEach((key) => {
      if (userAns[key] === q.correct[key]) correctCount++;
    });
    tfScore += TF_POINTS_BY_CORRECT_COUNT[correctCount] || 0;
  });

  return { mcq: mcqScore, tf: tfScore, total: mcqScore + tfScore };
};
