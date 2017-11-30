const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: String,
});

documentSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'applicationDocuments'
});

const Document = mongoose.model( 'Document', documentSchema);

module.exports = Document;
