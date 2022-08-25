import { useEffect, useState } from "react";
import { 
  ScrollView, 
  TextInput, 
  Alert, 
  Button, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback, 
  View } from "react-native"
import globalStyles from "../global";
import GroupDataServices from "../services/GroupDataServices";
import RotatingCircle from "./RotatingCircle";
import * as yup from 'yup';

export const GroupAddForm = ({ toEdit, handleInsert, handleUpdate}) => {
  const [groupName, setGroupName] = useState(toEdit?.name ?? '');
  const [dateCreated, setDateCreated] = useState(toEdit?.dateCreated ?? new Date().toISOString());
  const [inserting, setInserting] = useState(false);
  const [error, setError] = useState('');
  const [formRole, setFormRole]  = useState(toEdit ? 'Modifier un groupe' : 'Ajouter un groupe');

  useEffect(() => {
    setError('');
  }, [groupName, dateCreated])

  const insert = (data) => {
    GroupDataServices.insertGroup(data)
    .then(response => {
      if(response.data){
        handleInsert(response.data);
      }
    }).catch(e => console.log(e))
    .finally(() => setInserting(false));
  }

  const update = (data) => {
    GroupDataServices.updateGroup(data)
    .then(response => {
      if(response.data){
        handleUpdate(response.data);
      }
    }).catch(e => console.log(e))
    .finally(() => setInserting(false));
  }

  const handleSubmit = async (name) => {
    // validating data
    let schema = null;
    if(toEdit){
      schema =  yup.object().shape({
        name: yup.string().min(3).max(100).required(),
        dateCreated: yup.date().required()
      });
    }else{
      schema = yup.object().shape({
        name: yup.string().min(3).max(100).required()
      });
    }
    const data = toEdit 
      ? {name: groupName, dateCreated} 
      : {name: groupName};

    schema.validate(data)
      .then(() => {
        // Depending on the case, we call the adequate function
        setInserting(true);
        if(toEdit){
          update({id:toEdit._id, ...data})
        }else{
          insert(data)
        }

      })
      .catch(e => {
        setError(e.errors[0])
        console.log(e);
      })
    if(name.length < 3 || name.length > 100){
      Alert.alert('Oups', 'Le nombre de caractères requis pour le nom doit être entre 3 et 100');
    }
    else{
      
      
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View style={globalStyles.container}>
        <Text style={styles.formRole}>{formRole}</Text>
        <ScrollView contentContainerStyle={styles.form}>
          {error !== '' &&
            <Text style={globalStyles.error}>{error}</Text>
          }
          <TextInput
            style={styles.input}
            placeholder="Nom du groupe..."
            onChangeText={(newName) => setGroupName(newName)}
            value={groupName}
          />
          {toEdit && 
            <TextInput
              style={styles.input}
              placeholder="Date de création..."
              onChangeText={(newDate) => setDateCreated(newDate)}
              value={dateCreated}
            />
          }
          <Button
            onPress={handleSubmit}
            title={toEdit ? "Modifier" : "Ajouter"}
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
