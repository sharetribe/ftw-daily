const Event = require('../models/event');

module.exports = (app) => {

  /**
   * @param {EventVM.model} model.body.required
   * @route POST /api/events
   * @group Events
   * @returns {string}  500 - Internal Server Error
   * @returns {void}  200 - Success
   */

  /**
   * @typedef EventVM
   * @property {string} title
   * @property {string} start
   * @property {string} end
   * @property {string} ownerId
   * @property {string} acceptedTransactionId
   */
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


  /**
   * @param {string} userId.path.required
   * @param {string} from.query
   * @param {string} to.query
   * @route GET /api/user/{userId}/events
   * @group Events
   * @returns {string}  500 - Internal Server Error
   * @returns {void}  200 - Success
   */
  app.get('/api/user/:userId/events', async (req, res) => {

    try {
      const userId = req.params.userId;
      let query = {
        'start': { $gte: req.query.from, $lte: req.query.to },
        'end': { $gte: req.query.from, $lte: req.query.to },
        $or: [
          { 'ownerId': userId },
          { 'acceptedTransactionId': userId },
        ],
      };

      return res.send(await Event.find(query));

    } catch (e) {
      return res.status(500).send({
        'error': true,
        'message': e.message,
      });
    }
  });

  /**
   * @param {EventVM.model} model.body.required
   * @route PUT /api/events/{eventId}
   * @group Events
   * @returns {string}  500 - Internal Server Error
   * @returns {string}  404 - Not found
   * @returns {void}  200 - Success
   */
  app.put('/api/events/:eventId', async (req, res) => {

    try {

      let doc = {};
      if(req.body.title) doc.title = req.body.title;
      if(req.body.start) doc.start = req.body.start;
      if(req.body.end) doc.end = req.body.end;

      let event = await Event.findOneAndUpdate({ _id: req.params.eventId }, doc, { new: true });
      return res.send(event);

    } catch (e) {

      if (e.message && ~e.message.indexOf('Cast to ObjectId failed')) {
        res.status(404);
      } else {
        res.status(500);
      }

      return res.send({
        'error': true,
        'message': e.message,
      });
    }
  });

  /**
   * @param {string} eventId.path.required
   * @route GET /api/events/{eventId}
   * @group Events
   * @returns {string}  500 - Internal Server Error
   * @returns {string}  404 - Not found
   * @returns {void}  200 - Success
   */
  app.get('/api/events/:eventId', async (req, res) => {
    try {

      //TODO check if owner eventId
      let event = await Event.count({ _id: req.params.eventId });

      return res.send(event);

    } catch (e) {

      if (e.message && ~e.message.indexOf('Cast to ObjectId failed')) {
        res.status(404);
      } else {
        res.status(500);
      }

      return res.send({
        'error': true,
        'message': e.message,
      });
    }
  });
};

