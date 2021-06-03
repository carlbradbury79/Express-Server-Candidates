const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const port = 5000;
const Candidate = require('./models/candidateModel');

connectDB();

app.use(express.json({ extended: false }));

// POST method route
app.post('/', async function (req, res) {
  // Get candidates details
  const { name, skills } = req.body;
  try {
    //   Check if user exists
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
});

// GET method route
app.get('/', async function (req, res) {
  // Turn query params into array
  const skillsArr = req.query.skills.split(',');
  try {
    //   Get all Candidates
    const candidates = await Candidate.find();
    let chosen = { name: '', matches: 0 };

    //
    candidates.forEach((c) => {
      // Get matches for each candidate, comparing skills with Query params
      const matches = c.skills.reduce((acc, cur) => {
        if (skillsArr.includes(cur)) {
          return (acc += 1);
        } else {
          return acc;
        }
      }, 0);
      //   Change chosen candidate if has more matches
      if (matches > chosen.matches) {
        chosen = {
          name: c.name,
          matches: matches,
        };
      }
    });
    // Send candidate if one exists with at least one match
    if (chosen.matches > 0) {
      res.send(chosen).status(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
