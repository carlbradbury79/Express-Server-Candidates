require("dotenv").config();
const mongoose = require("mongoose");
const Candidate = require('./models/candidateModel')
const addCandidate = require('./controllers/candidateController').addCandidate

beforeAll(async() => {
    const url = process.env.MONGO_URI
    await mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true})
} )

afterAll(async() => await mongoose.connection.close())

describe("REST API's test", ()=> {
   
    it('check user exists', async () => {
        const name = "Dev"
        const user = await Candidate.findOne({name})
        expect(user.name).toBe("Dev")
    })


})