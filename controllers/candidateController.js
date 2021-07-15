const Candidate = require('../models/candidateModel')

const addCandidate = async(req,res) => {
    // Get candidates details
  const { name, skills } = req.body;
  try {
    //   Check if user exists (by name)
    const userExists = await Candidate.findOne({ name });

    // User exists, throw error
    if (userExists) {
      res.sendStatus(403);
      throw new Error('User exists');
    }

    // Create new candidate
    const newCandidate = await Candidate.create({
      name,
      skills,
    });

    if (newCandidate) {
      res.status(200).send('Success!');
    } else {
      res.status(400).send('Invalid Data');
    }
  } catch (error) {
    console.log('Error');
  }
}

module.exports = {addCandidate}