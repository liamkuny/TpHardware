import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const API_KEY = "d347d4d0c7fc44ef0274fb6035027f5e";

const weatherCases = {
  Clear: {
    title: "Clear Sky",
    subtitle: "It's a clear day!",
    colors: ["#00C6FB", "#005BEA"],
    icon: "weather-sunny",
  },
  Rain: {
    title: "Rain",
    subtitle: "Don't forget your umbrella!",
    colors: ["#00C6FB", "#005BEA"],
    icon: "weather-pouring",
  },
  Thunderstorm: {
    title: "Thunderstorm",
    subtitle: "Stay indoors and be safe!",
    colors: ["#00C6FB", "#005BEA"],
    icon: "weather-lightning",
  },
  Clouds: {
    title: "Cloudy",
    subtitle: "A bit cloudy today",
    colors: ["#D7D2CC", "#304352"],
    icon: "weather-cloudy",
  },
  Snow: {
    title: "Snow",
    subtitle: "Let's build a snowman!",
    colors: ["#7DE2FC", "#B9B6E5"],
    icon: "weather-snowy",
  },
  Mist: {
    title: "Mist",
    subtitle: "Low visibility, drive safely",
    colors: ["#5D4157", "#A8CABA"],
    icon: "weather-fog",
  },
  Haze: {
    title: "Haze",
    subtitle: "Hazy conditions",
    colors: ["#5D4157", "#A8CABA"],
    icon: "weather-fog",
  },
};

function Weather() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [title, settitle] = useState(null);
  const [country, setCountry] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    setDate(formattedDate);
    setTime(formattedTime);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("llego locacion");
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(
        `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`
      );

      getWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  function getWeather(lat, lon) {
    try {
      const response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
      );
      if (response.ok) {
        console.log("llego bien");
        const json = response.json();
        setTemperature(json.main.temp);
        settitle(json.weather[0].main);
        setCountry(json.sys.country);
        setIsLoaded(true);
      } else {
        setError("Failed to fetch weather data");
      }
    } catch (error) {
      setError("An error occurred while fetching weather data");
    }
  }

  const styles = StyleSheet.create({
    // ... (tus estilos)
  });

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <LinearGradient
          colors={weatherCases[title]?.colors || ["#FFFFFF", "#FFFFFF"]}
          style={styles.container}
        >
          <View style={styles.upper}>
            <MaterialCommunityIcons
              color="white"
              size={144}
              title={weatherCases[title]?.icon || "weather-sunny"}
            />
            <Text style={styles.temp}>{Math.ceil(temperature - 273.15)}º</Text>
            <Text style={styles.country}>{country}</Text>
          </View>
          <View style={styles.middle}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.lower}>
            <Text style={styles.title}>
              {weatherCases[title]?.title || "Unknown Weather"}
            </Text>
            <Text style={styles.subtitle}>
              {weatherCases[title]?.subtitle || "No data available"}
            </Text>
          </View>
          <View style={styles.location}>
            <Text style={styles.locationText}>Location: {location}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000FF" />
          <Text style={styles.loadingText}>Getting the weather data</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      )}
    </View>
  );
}

export default Weather;
