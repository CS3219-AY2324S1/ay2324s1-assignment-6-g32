const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Question = require('./models/question');
dotenv.config();

const connectToDatabase = async () => {
  const MONGO_CLIENT = process.env.ATLAS_URI || '';
  mongoose.connect(MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const mongoDb = mongoose.connection;
  mongoDb.once('open', () => {
    console.log('SUCCESS: Connected to the MongoDB database');
  });
  mongoDb.on('error', (error) => {
    console.error('MongoDB database connection error:', error);
  });
};

const addOrUpdateQuestion = async (question) => {
  try {
    await Question.findOneAndUpdate(
      { leetCodeId: question.leetCodeId },
      {
        leetCodeId: question.leetCodeId,
        title: question.title,
        complexity: question.difficulty,
        description: question.content,
        tags: question.tags
      },
      { upsert: true }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  addOrUpdateQuestion
};
