import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#5f4a93"
  },
  headerTitleStyle: {
    color: '#eee'
  },
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#eee'
  },
  listItem:{
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10
  }
});

export default globalStyles;