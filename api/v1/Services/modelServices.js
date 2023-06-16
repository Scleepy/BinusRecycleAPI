const tf = require("@tensorflow/tfjs-node");
const path = require("path");
const sharp = require("sharp");

const labels = ["Cardboard", "Glass", "Metal", "Paper", "Plastic"];

const modelService = {
  predict: async (imageData) => {
    try {
      const modelPath = path.resolve(__dirname, "../AI/Model/model.json");
      const model = await tf.loadLayersModel(`file://${modelPath}`);

      const resizedImage = await sharp(imageData)
        .resize(224, 224)
        .toBuffer();

      const imageTensor = tf.node.decodeImage(resizedImage);
      const normalizedImage = imageTensor.div(255.0);
      const expandedImage = normalizedImage.expandDims(0);

      const predictedClassIndex = tf.argMax(model.predict(expandedImage).squeeze(), -1).dataSync()[0];
      const predictedClassLabel = labels[predictedClassIndex];

      return predictedClassLabel;
    } catch (error) {
      console.error("Error occurred during prediction:", error);
      throw new Error("An error occurred during prediction");
    }
  },
};

module.exports = modelService;
