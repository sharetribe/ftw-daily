const { getIntegrationSdk } = require('../api-util/sdk');

const methods = {
  updateTransactionMetaData: async (req, res) => {
    const { id, metadata, fallBack = false } = req.body;
    try {
      const Isdk = getIntegrationSdk();

      return Isdk.transactions.updateMetadata({ id, metadata }, { expand: true })
        .then(response => {
          if (fallBack) return response;
          return res
            .status(200)
            .send({ data: response.data })
            .end();

        });
    } catch (error) {
      console.error(error, '^^^^ ^^^^ => error');
      if (fallBack) return error;
      return res
        .status(400)
        .send({ data: error })
        .end();
    }
  }
};

module.exports = methods;
