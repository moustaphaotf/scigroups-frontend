import { Button, View } from "react-native";

const Home = ({navigation}) => {
  return (
    <View style={{marginTop: 100}}>
      <Button
        title="Aller dans groupe" 
        onPress={() => navigation.push('Group')}
      />
    </View>
  );
}

export default Home;