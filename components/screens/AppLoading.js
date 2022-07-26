import { StyleSheet, Text, View } from "react-native";
import RotatingCircle from "../RotatingCircle";

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appname}>
        Scientific Groups
      </Text>
      <View style={styles.loadingContainer}>
        <RotatingCircle size={30} color="#5f4a93" style={styles.loadingIcon}/>
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appname: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText:{
    marginHorizontal: 10,
  },
  loadingIcon: {
    marginHorizontal: 10,
  }
});

export default AppLoading;