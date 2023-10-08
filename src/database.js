const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Question = require('./models/leetCodeQuestion');
dotenv.config();

const connectToMongoDb = async () => {
  const MONGO_CLIENT = process.env.ATLAS_URI || '';
  await mongoose.connect(MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongoDb = mongoose.connection;
  mongoDb.once('open', () => {
    console.log('SUCCESS: Connected to the MongoDB database');
  });
  mongoDb.on('error', (error) => {
    console.error('MongoDB database connection error:', error);
  });
};

const closeMongoDbConnection = async () => {
  await mongoose.connection.close();
};

/**
 * Adds a new question if it doesn't exist, or updates an existing question.
 * @param {Object} question - The question object to be added or updated.
 * @throws {Error} If there was an error while adding/updating the question.
 */
const addOrUpdateQuestion = async (question) => {
  try {
    await Question.findOneAndUpdate(
      { leetCodeId: question.leetCodeId },
      {
        leetCodeId: question.leetCodeId,
        title: question.title,
        complexity: question.complexity,
        description: question.description,
        tags: question.tags,
      },
      { upsert: true }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connectToMongoDb,
  closeMongoDbConnection,
  addOrUpdateQuestion,
};
