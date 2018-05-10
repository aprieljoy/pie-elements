import debug from 'debug';

const log = debug('@pie-element:point-intercept:controller');

const getResponseCorrectness = (correctResponseWithLabels, points, model, partialScores) => {
  const allowPartialScores = model.config.allowPartialScoring;
  const pointsMustMatchLabels = model.config.pointsMustMatchLabels;

  let correctAnswers = 0;

  if (!points || points.length === 0) {
    return {
      correctness: 'empty',
      score: 0,
    };
  }

  points.forEach(point => {
    const isCorrectAnswer = correctResponseWithLabels.find(correctAnswer => {
      const answerPresent = correctAnswer.x === point.x && correctAnswer.y === point.y;
      return  pointsMustMatchLabels ? (answerPresent && correctAnswer.label === point.label) : answerPresent;
    });

    if (isCorrectAnswer) {
      correctAnswers += 1;
    }
  });

  if (correctResponseWithLabels.length === correctAnswers) {
    return { correctness: 'correct', score: '100%' };
  } else if (correctAnswers === 0) {
    return { correctness: 'incorrect', score: '0%' };
  } else if (allowPartialScores && partialScores && partialScores.length) {
    return {
      correctness: 'partial',
      score: `${(partialScores.find(partialScore => partialScore.numberOfCorrect === correctAnswers) || {}).scorePercentage || 0}%`
    };
  }

  return { correctness: 'incorrect', score: '0%' };
};

export function model(question, session, env) {
  return new Promise((resolve) => {

    const { model, correctResponse, partialScoring } = question;

    const defaultFeedback = Object.assign({
      correct: 'Correct',
      incorrect: 'Incorrect',
      partial: 'Partially Correct',
      empty: 'The answer is empty'
    }, question.defaultFeedback);

    const getFeedback = (correctness) => {
      if (env.mode === 'evaluate') {
        if (correctness.correctness === 'empty') {
          return defaultFeedback.empty;
        }

        if (question.feedback[`${correctness.correctness}FeedbackType`] === 'custom') {
          return question.feedback[`${correctness.correctness}FeedbackValue`]
        }

        return defaultFeedback[correctness.correctness];
      }
    };

    const getCorrectness = () => {
      if (env.mode === 'evaluate') {

        if (!session.points || session.points.length === 0) {
          return {
            correctness: 'empty',
            score: '0%',
          };
        }

        const correctResponseWithLabels = correctResponse.map((answer, idx) => {
          const [x, y] = answer.split(',');

          return { x: parseInt(x, 10), y: parseInt(y, 10), label: model.config.pointLabels[idx] };
        });

        return getResponseCorrectness(correctResponseWithLabels, session.points, model, partialScoring);
      }
    };


    const correctness = getCorrectness();
    const base = {
      correctness,
      feedback: getFeedback(correctness),
      disabled: env.mode !== 'gather',
    };

    const out = Object.assign(base, { model, correctResponse: env.mode === 'evaluate' ? correctResponse : undefined });
    log('out: ', out);
    resolve(out);
  });
}