const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const port = 5000;
const Candidate = require('./models/candidateModel');
const addCandidate = require('./controllers/candidateController').addCandidate

connectDB();

app.use(express.json({ extended: false }));

// POST method route
app.post('/', addCandidate);

// GET method route
app.get('/', async function (req, res) {
  // Turn query params into array
  const skillsArr = req.query.skills.split(',');

  try {
    //   Use aggregate to get candidates that...
    //   Match skills in the array created above
    //   A new field is created with total matching skills
    //   The array of suitable candidates is sorted
    //   With only the top three returned
    await Candidate.aggregate([
      { $unwind: '$skills' },
      { $match: { skills: { $in: skillsArr } } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          matches: { $sum: 1 },
        },
      },
      { $sort: { matches: -1 } },
      { $limit: 3 },
    ]).exec(function (err, candidates) {
      // console.log(candidates);
      if (err) res.sendStatus(500);
      if (candidates.length < 1) {
        res.sendStatus(404); //No matching skills for any candidate
      } else {
        res.send(candidates[0]).status(200); //Send best candidate
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
