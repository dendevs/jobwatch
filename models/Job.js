const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    name: String,
    website: String,
    jobTitle: String,
    jobUrl: String,
    contractType: String,
    technology: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technology'
        }
    ],
    skill: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    ],
    street: String,
    number: Number,
    postalBox: String,
    postalCode: Number,
    city: String,
    country: String,
    lastname: String,
    firstname: String,
    email: String,
    gsm: Number,
    applicationDocument: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        }
    ],
    deadline: Date,
});

const Job = mongoose.model( 'Job', JobSchema);

module.exports = Job;
