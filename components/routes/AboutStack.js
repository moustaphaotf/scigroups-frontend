import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Header";
import About from "../screens/About";

const Stack = createStackNavigator();

const AboutStack = () => {
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
      <Stack.Screen name="About" component={About} 
        options={({navigation}) => {
          return {
            title:"A propos",
            headerTitle: (options) => <Header navigation={navigation} {...options}/>
          }
        }}/>
    </Stack.Navigator>
  );
}

export default AboutStack;