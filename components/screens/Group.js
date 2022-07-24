import { Button, View } from "react-native";

const Group = ({navigation}) => {
  return (
    <View style={{marginTop: 100}}>
      <Button
        title="Aller dans élève" 
        onPress={() => navigation.push('Student')}
      />
    </View>
  );
}

export default Group;