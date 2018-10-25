const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaMessage = new Schema({
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    lastEditedDate: { type: Date, default: Date.now },
    content: { type: String, required: true },
});

const schema = new Schema({
    topicName: { type: String, unique: true, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    messageList: [schemaMessage],
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Topic', schema);
