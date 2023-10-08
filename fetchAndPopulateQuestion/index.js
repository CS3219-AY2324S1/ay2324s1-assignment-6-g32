const axios = require('axios');
const { connectToDatabase, addOrUpdateQuestion } = require('./src/database');

exports.handler = async (event, context) => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

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
    const response = await axios.post(graphqlEndpoint, { query: graphqlQuery }, { headers });
    if (response.status !== 200) {
      throw new Error(`LeetCode API returned status ${response.status}`);
    }

    const questions = response.data.data.allQuestions;

    for (const question of questions) {
      await addOrUpdateQuestion({
        leetCodeId: question.questionId,
        title: question.title,
        difficulty: question.difficulty,
        content: question.content,
        tags: question.topicTags.map((tag) => tag.name) // Extract the tag names
      });
    }

    return ({
      statusCode: 200,
      body: JSON.stringify({ message: 'Questions added/updated successfully' })
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
