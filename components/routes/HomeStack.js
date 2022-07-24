import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Group from "../screens/Group";
import Student from "../screens/Student";
import Header from "../Header";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5f4a93"
        },
        headerTitleStyle: {
          color: '#eee'
        },
        
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={({navigation}) => {
          return {
            title:"Accueil",
            headerTitle: (options) => <Header navigation={navigation} {...options}/>
          }
        }}/>
      <Stack.Screen name="Group" component={Group} options={{title:"Goupe Scientifique"}}/>
      <Stack.Screen name="Student" component={Student} options={{title:"Elève"}}/>
    </Stack.Navigator>
  );
}

export default HomeStack;