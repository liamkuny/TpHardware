import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';
import * as Location from 'expo-location';

const API_KEY = '3684edc884ce3f6b2c719c8a9feac7e1';

const Weather = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    title: null,
    country: null,
    date: '',
    time: '',
    location: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    setWeatherData((prevData) => ({
      ...prevData,
      date: formattedDate,
      time: formattedTime,
    }));

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setWeatherData((prevData) => ({
          ...prevData,
          location: `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`,
        }));
        getWeather(location.coords.latitude, location.coords.longitude);
      } else {
        setError('Permission to access location was denied');
      }
    })();
  }, []);

  const getWeather = async (lat, lon) => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 200) {
        const data = response.data;
        setWeatherData((prevData) => ({
          ...prevData,
          temperature: Math.ceil(data.main.temp),
          title: data.weather[0].main,
          country: data.sys.country,
        }));
        setIsLoaded(true);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: '#FFFFFF',
    },
    errorText: {
      fontSize: 18,
      color: 'red',
    },
  });

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <LinearGradient
          colors={['#00C6FB', '#005BEA']}
          style={styles.container}
        >
          <Text style={styles.text}>{weatherData.temperature}ºC</Text>
          <Text style={styles.text}>{weatherData.country}</Text>
          <Text style={styles.text}>{weatherData.date}</Text>
          <Text style={styles.text}>{weatherData.time}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.container}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <ActivityIndicator size="large" color="#0000FF" />
          <Text style={styles.text}>Getting the weather data</Text>
        </View>
      )}
    </View>
  );
};

export default Weather;


