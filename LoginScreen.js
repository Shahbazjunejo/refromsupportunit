import React, { useState } from 'react';
import { View, TextInput, Button, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Make API call to login endpoint
            const response = await axios.post('https://dummyjson.com/auth/me', {
                username: 'kminchelle',
                password: '0lelplR',
            });
            setLoading(false);
            // Assuming API returns authentication token upon successful login
            const authToken = response.data.token;
            // Store authentication token in AsyncStorage
            await AsyncStorage.setItem('username', username);
            // Save password securely in SecureStore
            await SecureStore.setItemAsync('password', password);
            // Navigate to the home screen upon successful login
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            // Handle login error
            navigation.navigate('Home');
            setError('Invalid username or password');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', width: '80%' }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            {error ? <Text style={{ marginTop: 10, color: 'red' }}>{error}</Text> : null}
        </View>
    );
};

export default LoginScreen;
