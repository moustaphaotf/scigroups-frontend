import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

const Header = ({navigation, children, style}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.icon} name="menu" size={28} onPress={navigation.openDrawer}/>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20,
    marginBottom: 0,
    color: '#eee'
  },
  title: {
    fontSize: 20,
  }
});

export default Header;