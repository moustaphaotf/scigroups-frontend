import { useState } from "react";
import { 
  ScrollView, 
  TextInput, 
  Alert, 
  Button, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback, 
  View } from "react-native"
import globalStyles, { CloseIcon } from "../global";
import GroupDataServices from "../services/GroupDataServices";
import RotatingCircle from "./RotatingCircle";

export const GroupAddForm = ({ setModalOpen , formRole, handleInsert}) => {
  const [groupName, setGroupName] = useState('');
  const [inserting, setInserting] = useState(false);

  const handleSubmit = async (name) => {
    if(name.length < 3 || name.length > 100){
      Alert.alert('Oups', 'Le nombre de caractères requis pour le nom doit être entre 3 et 100');
    }
    else{
      setInserting(true);
      await GroupDataServices.insertGroup({name})
        .then(response => {
          if(response.data){
            handleInsert(response.data);
            setModalOpen(false);
          }
        }).catch(e => console.log(e))
        .finally(() => setInserting(false));
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View style={globalStyles.container}>
        <CloseIcon style={styles.close} onPress={() => setModalOpen(false)}/>
        <Text style={styles.formRole}>{formRole}</Text>
        <ScrollView contentContainerStyle={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nom du groupe..."
            onChangeText={(newName) => setGroupName(newName)}
          />
          <Button
            onPress={() => handleSubmit(groupName)}
            title="Ajouter"
          />
          {inserting ? (
            <View style={styles.spinner}>
              <RotatingCircle color="#5f4a93"/>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  close: {
    marginTop: 30,
    marginBottom: 10
  },
  formRole: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 20,
    fontFamily: 'nunito-bold',
    marginBottom: 10,
  },
  form: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5
  },
  spinner: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
