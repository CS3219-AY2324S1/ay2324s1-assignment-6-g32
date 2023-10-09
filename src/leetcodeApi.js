const axios = require('axios');

const fetchAllQuestionsFromLeetCode = async () => {
  try {
    const graphqlEndpoint = 'https://leetcode.com/graphql';
    const graphqlQuery = `
      query {
        allQuestions {
          questionId
          title
          difficulty
          topicTags {
            name
          }
          content
          isPaidOnly
        }
      }
    `;
    const headers = {
      'Content-Type': 'application/json',
    };

    // Fetch questions from LeetCode GraphQL API
    const response = await axios.post(
      graphqlEndpoint,
      { query: graphqlQuery },
      { headers }
    );
    if (response.status !== 200) {
      throw new Error(`LeetCode API returned status ${response.status}`);
    }

    // Filter out questions that are premium
    return response.data.data.allQuestions.filter(
      (question) => !question.isPaidOnly
    );
  } catch (error) {
    console.error('Error fetching questions from LeetCode API:', error);
    throw error;
  }
};

module.exports = {
  fetchAllQuestionsFromLeetCode,
};
