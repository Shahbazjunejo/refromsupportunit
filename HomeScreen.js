import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const HomeScreen = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: ''
  });

  useEffect(() => {
    // Load form data from local storage when the component mounts
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedFormData = await AsyncStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const handleInputChange = (fieldName, text) => {
    setFormData({ ...formData, [fieldName]: text });
  };

  const handleSubmit = async () => {
    try {
      // Make the API call here with the formData object

      const axios = require('axios');
      let data = JSON.stringify({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
      });

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://restful-booker.herokuapp.com/booking',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  Alert.alert('Success', 'Form submitted successfully!');
})
.catch((error) => {
  console.log(error);
});

 
      // Save form data to local storage after successful submission
      await AsyncStorage.setItem('formData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again later.');
    }
  };



  const SyncdataSubmit = async () => {
    try {
        // Make the API call here with the formData object
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
        Alert.alert('Success', 'Form submitted successfully!');
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
        // Optionally, you can clear the form fields after successful submission
        setFormData({
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: ''
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        Alert.alert('Error', 'Failed to submit form. Please try again later.');
    }
}









  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
        placeholder="Field 1"
        value={formData.field1}
        onChangeText={(text) => handleInputChange('field1', text)}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
        placeholder="Field 2"
        value={formData.field2}
        onChangeText={(text) => handleInputChange('field2', text)}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
        placeholder="Field 3"
        value={formData.field3}
        onChangeText={(text) => handleInputChange('field3', text)}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
        placeholder="Field 4"
        value={formData.field4}
        onChangeText={(text) => handleInputChange('field4', text)}
      />
      <TextInput
        style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
        placeholder="Fieaarld 5"
        value={formData.field5}
        onChangeText={(text) => handleInputChange('field5', text)}
      />
      
      <Button title="Submit Form" onPress={handleSubmit} />
      <Button title="Sync   Form" onPress={SyncdataSubmit} />
    </View>
  );
};

export default HomeScreen;
