const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  leetCodeId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  complexity: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
