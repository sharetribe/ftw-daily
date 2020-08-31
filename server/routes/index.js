const Event = require('../models/event');

module.exports = (app) => {
  app.post('/api/events', async (req, res) => {

    try {

      return res.send(await Event.create({
        'title': req.body.title,
        'start': req.body.start,
        'end': req.body.end,
        'ownerId': req.body.ownerId,
        'acceptedTransactionId': req.body.acceptedTransactionId,
      }));

    } catch (e) {
      return res.status(500).send({
        'error': true,
        'message': e.message,
      });
    }
  });

  app.get('/api/user/:userId/events', async (req, res) => {

    try {
      const userId = req.params.userId;
      let query = {
        "start": {$gte: req.query.from, $lte:req.query.to},
        "end": {$gte: req.query.from, $lte:req.query.to},
        $or: [
          {"ownerId":userId},
          {"acceptedTransactionId":userId},
        ]
      };

      return res.send(await Event.find(query));

    } catch (e) {
      return res.status(500).send({
        'error': true,
        'message': e.message,
      });
    }
  });

  app.get('/api/events/:eventId', async (req, res) => {
    try {

      //TODO check if owner eventId

      if(await Event.count({_id:req.params.eventId})) {
        return res.send(await Event.findById(req.params.eventId));
      } else {
        return res.status(404).send({
          message: "Event was not found"
        });
      }

    } catch (e) {

      return res.status(500).send({
        'error': true,
        'message': e.message,
      });
    }
  });
};

