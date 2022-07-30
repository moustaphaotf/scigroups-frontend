import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export const AddIcon = ({style, onPress}) =>(
  <MaterialIcons 
    onPress={onPress}
    style={[globalStyles.addIcon, style]}
    name="add" 
  />
);

export const CloseIcon = ({style, onPress}) =>(
  <AntDesign
    onPress={onPress}
    style={[globalStyles.closeIcon, style]}
    name="close" 
  />
);

export const globalColors = {
  main: '#5f4a93',
  danger: "#CA0B00",
}

const globalStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: globalColors.main
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
  },
  addIcon: {
    position: 'absolute',
    bottom: 40,
    right:  20,
    color:"#eee",
    fontSize:30,
    padding: 2,
    borderRadius: '50%',
    backgroundColor: "#5f4a9396"
  },
  closeIcon: {
    alignSelf: 'center',
    color:"#333",
    fontSize:30,
    padding: 2,
  },
  inputField: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5
  },
  formRole: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 20,
    fontFamily: 'nunito-bold',
    marginBottom: 10,
  },
});

export default globalStyles;