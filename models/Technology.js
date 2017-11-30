const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: String,
});

technologySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'technologies'
});

const Technology = mongoose.model( 'Technology', technologySchema);

module.exports = Technology;
