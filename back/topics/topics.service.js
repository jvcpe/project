const db = require('_helpers/db');
const Topic = db.Topic;
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');

module.exports = {
    create,
    getAll,
    getByName,
    createMessage,
    update,
    _delete,
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

async function _delete(req) {
  let decodedToken = jwt.decode(req.headers.authorization.replace("Bearer ",""));
  const user = await userService.getById(decodedToken.subject);

  messageParam = req.body;

  const topic = await Topic.findOne(
    {
      "topicName": messageParam.topicName,
      "messageList._id": messageParam.messageId
    }
  );

  topic.messageList.pull(messageParam.messageId);
  await topic.save();
}

async function createMessage(req) {
  let decodedToken = jwt.decode(req.headers.authorization.replace("Bearer ",""));

  const user = await userService.getById(decodedToken.subject);

  messageParam = req.body;

  let message = {
    createdBy: user.username,
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

async function update(messageParam) {
  let date = Date.now().valueOf();

  await Topic.findOneAndUpdate(
    {
      "topicName": messageParam.topicName,
      "messageList._id": messageParam.messageId
    },
    {
      "$set": {
        "messageList.$.content": messageParam.content,
        "messageList.$.lastEditedDate": date,
      }
    }
  );
}
