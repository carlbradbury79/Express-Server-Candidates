const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skills: [],
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
