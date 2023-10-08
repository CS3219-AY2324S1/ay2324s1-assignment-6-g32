const { connectToMongoDb, closeMongoDbConnection, addOrUpdateQuestion } = require('./src/database');
const { fetchAllQuestionsFromLeetCode } = require('./src/leetcodeApi');

exports.handler = async (event, context) => {
  try {
    // Connect to MongoDB
    await connectToMongoDb();

    // Fetch questions from LeetCode GraphQL API
    const questions = await fetchAllQuestionsFromLeetCode();

    // Add or update each question in the database
    for (const question of questions) {
      await addOrUpdateQuestion({
        leetCodeId: question.questionId,
        title: question.title,
        complexity: question.difficulty,
        description: question.content,
        tags: question.topicTags.map((tag) => tag.name),
      });
    }

    // Close MongoDB connection
    await closeMongoDbConnection();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Questions added/updated successfully' }),
    };
  } catch (error) {
    await closeMongoDbConnection();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
