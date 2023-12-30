import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';

const DiseasePrediction = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const navigation = useNavigation();

  const loadModel = async () => {
    try {
      const model = await tf.loadLayersModel('path/to/your/model.json');
      // Store the model in state or use it directly
      // For example: setModel(model);
    } catch (error) {
      console.error('Error loading the TensorFlow model:', error);
    }
  };

  const handlePredict = async () => {
    const inputTensor = tf.tensor2d([/* Preprocessed data goes here */]);

    // Assuming you have the loaded model
    // const model = ;

    try {
      const outputTensor = model.predict(inputTensor);
      const predictionResult = outputTensor.arraySync();
      setPrediction(predictionResult);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>Enter Symptoms:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter symptoms here"
        value={symptoms}
        onChangeText={(text) => setSymptoms(text)}
      />
            <Button
            color="#F57D11"
            title="Predict"
            onPress={handlePredict}
            />

      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Result:</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default DiseasePrediction;
