import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../global";

const Empty = ({text}) => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image 
        style={styles.emptyLogo}
        source={ require("../assets/images/empty.png") }
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  emptyLogo: {
    width:200,
    height:200
  },
  text: {
    fontFamily: 'nunito-bold',
    fontWeight: 'bold',
    marginTop: 50,
    fontSize: 18,
    marginHorizontal: 20,
    textAlign: 'center',
  }
});

export default Empty;