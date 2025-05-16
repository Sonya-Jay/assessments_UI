const scoreURICA = (answers) => {
  // Validate input
  if (!Array.isArray(answers) || answers.length !== 32) {
    throw new Error('Answers must be in an array of 32 responses');
  }

  // Validate each answer is between 1 and 5
  answers.forEach((answer, index) => {
    if (typeof answer !== 'number' || answer < 1 || answer > 5) {
      throw new Error(`Answer for question ${index + 1} must be a number between 1 and 5`);
    }
  });

  // Define the scoring keys for each stage
  const scoringKeys = {
    precontemplation: [1, 5, 11, 13, 23, 26, 29],
    contemplation: [2, 8, 12, 15, 19, 21, 24],
    action: [3, 7, 10, 14, 17, 25, 30],
    maintenance: [6, 16, 18, 22, 27, 28, 32],
  };

  // Calculate scores and means for each stage
  const scores = {};
  const means = {};
  
  for (const category in scoringKeys) {
    // Calculate raw score by summing answers for this stage
    // Note: key - 1 converts from 1-based question numbers to 0-based array indices
    scores[category] = scoringKeys[category].reduce((acc, index) => acc + answers[index - 1], 0);
    // Calculate mean (adding 7 and dividing by number of items)
    means[category] = (scores[category] + 7) / scoringKeys[category].length;
  }

  // Calculate readiness score
  const readinessScore = means.contemplation + means.action + means.maintenance - means.precontemplation;

  return {
    categoryScores: scores,
    categoryMeans: means,
    readinessScore: readinessScore
  };
};

module.exports = scoreURICA;
