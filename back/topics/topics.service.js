const db = require('_helpers/db');
const Topic = db.Topic;

module.exports = {
    create,
    getAll,
    getByName,
    createMessage,
};

async function create(topicParam) {
    // validate
    if (await Topic.findOne({ topicName: topicParam.topicName })) {
        throw 'Topic name "' + topicParam.topicName + '" is already taken';
    }

    var topic = new Topic(
      {
        topicName: topicParam.topicName,
        createdBy: topicParam.userName,
        messageList: [{
          createdBy: topicParam.userName,
          content: topicParam.message,
        }]
      }
    );

    await topic.save();
}

async function createMessage(messageParam) {

  let message = {
    createdBy: messageParam.userName,
    content: messageParam.message,
  }

  await Topic.findOneAndUpdate({topicName: messageParam.topicName}, {$push: {messageList: message}});

}

async function getAll() {
    let topics = await Topic.find();
    return topics;
}

async function getByName(topicName) {
    let topic = await Topic.findOne({ topicName: topicName })
    return topic;
}
