const modelService = require('../Services/modelServices');

const modelController = {
  predict: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const imageData = req.file.buffer;

      const predictedClass = await modelService.predict(imageData);
      return res.json({ class: predictedClass });
    } catch (error) {
      console.error('Error occurred during prediction:', error);
      return res.status(500).json({ error: 'An error occurred during prediction' });
    }
  },
};

module.exports = modelController;
