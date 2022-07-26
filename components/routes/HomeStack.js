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
      screenOptions={({route}) => {
        let title = '';
        switch (route.name) {
          case 'Student':
            title = route.params?.lastname.toUpperCase() + ' ' + route.params?.firstname;
            break;
          case 'Group':
            title = route.params?.name;
            break;
          default:
            title = 'Accueil';
            break;
        }
        return {
          title: title,
          headerStyle: [globalStyles.headerStyle],
          headerTitleStyle: globalStyles.headerTitleStyle,
        }
      }}
    >
      <Stack.Screen
        name="Home" 
        component={Home} 
        options={({route, navigation}) => {
          return {
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
      <Stack.Screen 
        name="Group" 
        component={Group} 
      />
      <Stack.Screen 
        name="Student" 
        component={Student} 
      />
    </Stack.Navigator>
  );
}

export default HomeStack;