import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import AboutStack from "./AboutStack";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Drawer.Screen name = "HomeStack" component={HomeStack} options={{title: 'Accueil'}}/>
        <Drawer.Screen name = "AboutStack" component={AboutStack} options={{title: 'A propos'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;