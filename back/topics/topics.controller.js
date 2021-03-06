const express = require('express');
const router = express.Router();
const topicService = require('./topics.service');

// routes
router.post('/createTopic', createTopic);
router.get('/getAll', getAll);
router.post('/createMessage', createMessage);
router.get('/:name', getByName);
router.put('/message', update);
router.delete('/message', _delete);

module.exports = router;

function createTopic(req, res, next) {
    topicService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    topicService.getAll()
        .then(topics => res.json(topics))
        .catch(err => next(err));
}

function createMessage(req, res, next) {
    topicService.createMessage(req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    topicService.getByName(req.params.name)
        .then(topic => topic ? res.json(topic) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    topicService.update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    topicService._delete(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
