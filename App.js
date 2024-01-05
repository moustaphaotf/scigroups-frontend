import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {NativeBaseProvider} from 'native-base';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AppLoading from './components/screens/AppLoading';
import HomeStack from './components/routes/HomeStack';
import { NavigationContainer } from '@react-navigation/native';

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
    <NativeBaseProvider>
    {fontLoaded ? (  
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    ) : (
      <AppLoading text='Scientific Groups'/>
    )}
    </NativeBaseProvider>
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
