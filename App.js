import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [weather, setWeather] = useState(null);

  let weatherInfo = null

  let url = "https://pro.openweathermap.org/data/2.5/onecall";
  let lat = "32.2226";
  let lon = "-110.9747";

  const dataFromAPI = async () => {
    try {
      const response = await fetch(`${url}?lat=${lat}&lon=${lon}&appid=${key}`);
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  }

  if(weather) {
    weatherInfo = JSON.stringify(weather);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={dataFromAPI} title="Tester Button"/>
      <Text>Stuff will show up here</Text>
      <Text>{weatherInfo}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
