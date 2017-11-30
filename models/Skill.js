const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: String,
});

skillSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'skills'
});

const Skill = mongoose.model( 'Skill', skillSchema);

module.exports = Skill;
