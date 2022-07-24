import { StyleSheet, Text, View } from "react-native";

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appname}>
        Scientific Groups
      </Text>
      <Text style={styles.loading}>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appname: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  }
});

export default AppLoading;