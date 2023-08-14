// !!!
// Define Tensor
/*function createOnnxTensor(points) {
    // Calculate the number of dimensions for the tensor
    const numDimensions = points[0].length;
    
    // Calculate the shape of the tensor
    const shape = [points.length, numDimensions];
    
    // Create a new Float32Array to hold the tensor data
    const data = new Float32Array(points.length * numDimensions);
    
    // Flatten the points list into the data array
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < numDimensions; j++) {
        data[i * numDimensions + j] = points[i][j];
      }
    }
    
    // Create a new ONNX tensor with the data and shape
    const tensor = new onnx.Tensor(new Float32Array(data), 'float32');
    
    return tensor;
}*/
// ONNX
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./models/onnx_model.onnx");
async function updatePredictions(imgData) {
  // Get the predictions for the canvas data.
  const input = new onnx.Tensor(imgData, 'float32',[1,1,28,28]);

  // const flatData = new Float32Array(1 * 1 * 28 * 28).fill(0);
  // const input = new onnx.Tensor(flatData, 'float32', [1, 1, 28, 28]);

  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;
  const maxPrediction = Math.max(...predictions);
  console.log(maxPrediction)
  alert(predictions.indexOf(maxPrediction))
  /*for (let i = 0; i < predictions.length; i++) {
    const element = document.getElementById(`prediction-${i}`);
    element.children[0].children[0].style.height = `${predictions[i] * 100}%`;
    element.className =
      predictions[i] === maxPrediction
        ? "prediction-col top-prediction"
        : "prediction-col";
  }*/
}
