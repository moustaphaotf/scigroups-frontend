import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import globalStyles from "../../global";
import About from "../screens/About";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: globalStyles.headerStyle,
          headerTitleStyle: globalStyles.headerTitleStyle,
        }}
      >
        <Drawer.Screen 
          name = "HomeStack" 
          component={HomeStack}
          options={{
            headerShown: false,
            title: "Accueil"
          }}
        />
        <Drawer.Screen 
          name = "AboutStack" 
          component={About} 
          options={{
            title: 'A propos'
          }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;