import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
//UI imports
import { Provider as PaperProvider, TopBar, MainScreen} from "react-native-paper";

export default function App() {

  const [weather, setWeather] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [googleResponse, setGoogleResponse] = useState([]);
  const [runonce, setRunOnce] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState("")


  let weatherURL = "https://pro.openweathermap.org/data/2.5/onecall";

  let googleURL = "https://maps.googleapis.com/maps/api/geocode/json?";

  const googleAPI = async () => {
    try {
      const response = await fetch(`${googleURL}address=${zipcode}&key=${googleKEY}`);
      const data = await response.json();
      setGoogleResponse(data.results[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const openWeatherAPI = async () => {
    try {
      const response = await fetch(`${weatherURL}?lat=${googleResponse.geometry.location.lat}&lon=${googleResponse.geometry.location.lng}&appid=${key}`);
      const data = await response.json();
      setWeather(data);
      console.log(data);
      let max = 0;
      for (let i = 0; i < 24; i++) {
        if (data.hourly[i].uvi > max) {
          max = data.hourly[i].uvi;
        }
      }
      setWeatherInfo(max);
    } catch (error) {
      console.error(error);
    }
  }

  if (runonce && googleResponse.length != 0) {
    openWeatherAPI();
    setRunOnce(false);
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={{
          height: 40,
          borderColor: "blue"
          
        }}
        placeholder="Type your zipcode here!"
        onChangeText = {text => setZipcode(text)}
      />
      <Button onPress={googleAPI} title="Tester Button"/>
      <Text>Stuff will show up here</Text>
      <Text style={{color: getHex(weatherInfo)}}>{weatherInfo}</Text>
      <StatusBar style="auto" />




        {/* UI thingy */}
        {/* <PaperProvider>
            <TopBar />




             <MainScreen />
        </PaperProvider> */}
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

function getHex(num) {
  if(num <= 2){
    return "#13bf00"
  } else if(num <= 5){
    return "#f1f50a"
  } else if(num <= 7){
    return "#ff9d00"
  } else if(num < 10){
    return "#c91c16"
  } else{
    return "#9002a6"
  }
}


const textStyle = StyleSheet.create({
  
})

