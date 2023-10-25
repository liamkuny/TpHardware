import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "a96adbe323184895a06145007230610";

const weatherCases = {
    // ... (tu definición de casos de clima)
}

function Weather() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setError(error);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            setError(new Error("Geolocation is not available."));
        }
    }, []);

    const getWeather = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((json) => {
                setTemperature(json.main.temp);
                setName(json.weather[0].main);
                setCountry(json.sys.country);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const styles = StyleSheet.create({
        // ... (tus estilos)
    });

    return (
        <View style={styles.container}>
            {isLoaded ? (
                <LinearGradient colors={weatherCases[name].colors} style={styles.container}>
                    <View style={styles.upper}>
                        <MaterialCommunityIcons color="white" size={144} name={weatherCases[name].icon} />
                        <Text style={styles.temp}>{Math.ceil(temperature - 273.15)}º</Text>
                        <Text style={styles.country}>{country}</Text>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.title}>{weatherCases[name].title}</Text>
                        <Text style={styles.subtitle}>{weatherCases[name].subtitle}</Text>
                    </View>
                </LinearGradient>
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000FF" />
                    <Text style={styles.loadingText}>Getting the weather data</Text>
                    {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
                </View>
            )}
        </View>
    );
}

export default Weather;

