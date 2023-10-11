
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "a96adbe323184895a06145007230610";

const weatherCases = {
    Rain: {
        colors: ['#00C6FB', '#005BEA'],
        title: "Raining like a MF",
        subtitle: "For more info look outside",
        icon: 'weather-rainy',
    },
    Clear: {
        colors: ['#FEF253', '#FF7300'],
        title: "Sunny as heck",
        subtitle: "Go get yourself some sunshine",
        icon: 'weather-sunny',
    },
    Thunderstorm: {
        colors: ['#00ECBC', '#007ADF'],
        title: "Thunderstorm in the area",
        subtitle: "Actually, outside of the area",
        icon: 'weather-lightning',
    },
    Clouds: {
        colors: ['#D7D2CC', '#304352'],
        title: "Cloudy",
        subtitle: "I know, pretty dull",
        icon: 'weather-cloudy',
    },
    Snow: {
        colors: ['#7DE2FC', '#B9B6E5'],
        title: "Cold as ice",
        subtitle: "Do you want to build a snowman? Probably not.",
        icon: 'weather-snowy',
    },
    Drizzle: {
        colors: ['#89F7FE', '#66A6FF'],
        title: "Drizzle",
        subtitle: "It's like rain, but not really",
        icon: 'weather-hail',
    },
    Smoke: {
        colors: ['#D7D2CC', '#304352'],
        title: "Smoke",
        subtitle: "Smoke Smoke Smoke Smoke",
        icon: 'weather-fog',
    },
    Haze: {
        colors: ['#D7D2CC', '#304352'],
        title: "Haze",
        subtitle: "Haze Haze Haze Haze",
        icon: 'weather-fog',
    },
    Mist: {
        colors: ['#D7D2CC', '#304352'],
        title: "Mist",
        subtitle: "Mist Mist Mist Mist",
        icon: 'weather-fog',
    },
}

async function Weather() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setError(error);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    const getWeather = (lat, lon) => {
        fetch(fetch(`https://api.WeatherApi.com/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`))
            .then((response) => response.json())
            .then((json) => {
                setTemperature(json.main.temp);
                setName(json.weather[0].main);
                setCountry(json.sys.country);
                setIsLoaded(true);
            });
    };

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

const styles = {
    // Definición de estilos
    // ...
};

export {Weather}
