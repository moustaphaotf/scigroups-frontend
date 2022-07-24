import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          'pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
          'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
          'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
        })
      } catch(e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }

    prepare();
  }, []);

  return (
    fontLoaded ? (
      <View style={styles.container}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    ) : (
      null
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'pacifico',
    fontSize: 30,
    textAlign: 'center'
  }
});
