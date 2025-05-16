import React, { useState } from 'react';
import UricaQuestions from '../data/questions';

const scaleLabels = [
  'Strongly Disagree',
  'Disagree',
  'Undecided',
  'Agree',
  'Strongly Agree',
];

const Questionnaire = () => {
  const [answers, setAnswers] = useState(new Array(32).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const calculateScores = () => {
    const scoringKeys = {
      precontemplation: [1, 5, 11, 13, 23, 26, 29],
      contemplation: [2, 8, 12, 15, 19, 21, 24],
      action: [3, 7, 10, 14, 17, 25, 30],
      maintenance: [6, 16, 18, 22, 27, 28, 32],
    };
    const scores = {};
    const means = {};
    for (const stage in scoringKeys) {
      scores[stage] = scoringKeys[stage].reduce((sum, key) => sum + answers[key - 1], 0);
      means[stage] = (scores[stage] + 7) / scoringKeys[stage].length;
    }
    const readinessScore = means.contemplation + means.action + means.maintenance - means.precontemplation;
    return {
      stageScores: scores,
      stageMeans: means,
      readinessScore: readinessScore
    };
  };

  const allAnswered = answers.every(a => a !== null);

  if (isComplete) {
    const results = calculateScores();
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Assessment Complete!</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Your Results</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Stage Scores</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(results.stageScores).map(([stage, score]) => (
                  <div key={stage} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600 capitalize">{stage}</div>
                    <div className="text-lg font-semibold">{score}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Stage Means</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(results.stageMeans).map(([stage, mean]) => (
                  <div key={stage} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600 capitalize">{stage}</div>
                    <div className="text-lg font-semibold">{mean.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-700 mb-2">Readiness Score</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {results.readinessScore.toFixed(2)}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  {results.readinessScore > 0 ? 'Ready for change' : 'Not ready for change'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              setAnswers(new Array(32).fill(null));
              setIsComplete(false);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="max-w-2xl mx-auto p-6"
      onSubmit={e => {
        e.preventDefault();
        if (allAnswered) setIsComplete(true);
      }}
    >
      <h2 className="text-2xl font-bold mb-6">URICA Assessment</h2>
      <div className="space-y-8">
        {UricaQuestions.map((q, qIdx) => (
          <div key={qIdx} className="flex items-center">
            <div className="flex-1 text-base pr-8">
              {q}
            </div>
            <div className="flex flex-row gap-0 bg-gray-100 rounded-lg overflow-hidden border min-w-[600px]">
              {[1, 2, 3, 4, 5].map((value, idx) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAnswer(qIdx, value)}
                  className={`px-5 py-3 focus:outline-none text-sm font-semibold transition-colors whitespace-nowrap
                    ${answers[qIdx] === value
                      ? 'bg-blue-500 text-white shadow-inner'
                      : 'bg-white text-gray-700 hover:bg-blue-50'}
                    ${idx === 0 ? 'rounded-l-lg' : ''}
                    ${idx === 4 ? 'rounded-r-lg' : ''}
                    border-0 border-r last:border-r-0`}
                  style={{ minWidth: 120 }}
                >
                  {scaleLabels[idx]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          disabled={!allAnswered}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Submit
        </button>
      </div>
      <div className="mt-4 text-center text-gray-600">
        {answers.filter(a => a !== null).length} of 32 questions answered
      </div>
    </form>
  );
};

export default Questionnaire; 