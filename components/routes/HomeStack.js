import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Group from "../screens/Group";
import Student from "../screens/Student";
import globalStyles from "../../global";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: [globalStyles.headerStyle],
        headerTitleStyle: globalStyles.headerTitleStyle,
      }}
    >
      <Stack.Screen
        name="Home" 
        component={Home} 
        options={({route, navigation}) => {
          return {
            title:"Accueil",
            headerLeft: () => 
              <MaterialIcons 
                style={{marginHorizontal: 15}} 
                name="menu" 
                color='#eee' 
                size={24} 
                onPress={navigation.openDrawer} 
              />
          }
        }}/>
      <Stack.Screen name="Group" component={Group} options={{title:"Goupe Scientifique"}}/>
      <Stack.Screen name="Student" component={Student} options={{title:"Elève"}}/>
    </Stack.Navigator>
  );
}

export default HomeStack;