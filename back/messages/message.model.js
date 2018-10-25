const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    lastEditedDate: { type: Date, default: Date.now },
    content: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Message', schema);
