const db = require('_helpers/db');
const Topic = db.Topic;

module.exports = {
    create,
    getAll,
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

    console.log(topic);

    await topic.save();
}

async function getAll() {
    console.log('getAll_service');
    let topics = await Topic.find();
    console.log(topics);
    return topics;
}
