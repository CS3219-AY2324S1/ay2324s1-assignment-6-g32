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

    return response.data.data.allQuestions;
  } catch (error) {
    console.error('Error fetching questions from LeetCode API:', error);
    throw error;
  }
};

module.exports = {
  fetchAllQuestionsFromLeetCode,
};
