import globalStyles, { globalColors } from '../global';
import { TextInput, ScrollView, Text, Button, View, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import RadioButton from './RadioButton';
import * as yup from 'yup';
import StudentDataServices from '../services/StudentDataServices';
import RotatingCircle from './RotatingCircle';

const StudentAddForm = ({ handleInsert, route, formRole}) =>  {
  const [firstname, setFirstname] = useState ("");
  const [lastname, setLastname] = useState ("");
  const [genre, setGenre] = useState ("m");
  const [phone, setPhone] = useState ("");
  const [schoolOfOrigin, setSchoolOfOrigin] = useState ("");
  const [grade, setGrade] = useState ("");

  const [inserting, setInserting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [firstname, lastname, genre, phone, schoolOfOrigin, grade])

  const handleSubmit = () =>{
    const data = {
      firstname, lastname,
      genre, phone, grade,
      schoolOfOrigin
    };

    const schema = yup.object().shape({
      genre: yup.string().required().length(1),
      grade: yup.string().required(),
      schoolOfOrigin: yup.string().required().min(3).max(50),
      phone: yup.string().required().min(9).max(20).matches(new RegExp('^[0-9]{9,20}$')),
      lastname: yup.string().required().min(3).max(20),
      firstname: yup.string().required().min(3).max(50),
    });
    
    const groupId = route.params._id;

    schema.validate(data)
      .then(val => {
        setInserting(true);
    
        StudentDataServices.insertStudent({groupId, ...data})
          .then(response => {
            console.log(response);
            handleInsert(response.data);
          })
          .then(() => setInserting(false))
          .catch(e => console.log(e));
      })
      .catch(e => {
        setError(e.errors[0])
        console.log(e.errors);
      })
  }

  return (
    <>
      <Text style={globalStyles.formRole}>{formRole}</Text>
      <ScrollView>
        <TextInput
          style={globalStyles.inputField}
          value={firstname}
          placeholder="Prenom"
          onChangeText={(newText) => setFirstname(newText)}
        />
        <TextInput 
          style={globalStyles.inputField}
          value={lastname}
          placeholder="Nom"
          onChangeText={(newText) => setLastname(newText)}
        />
        <TextInput 
          style={globalStyles.inputField}
          value={phone}
          placeholder="Téléphone"
          onChangeText={(newText) => setPhone(newText)}
        />
        <TextInput 
          style={globalStyles.inputField}
          value={schoolOfOrigin}
          onChangeText={(newText) => setSchoolOfOrigin(newText)}
          placeholder="Ecole d'origine"
        />
        <TextInput 
          style={globalStyles.inputField}
          value={grade}
          onChangeText={(newText) => setGrade(newText)}
          placeholder="Niveau"
        />
        <RadioButton style={styles.radio} value={genre} setGenre={setGenre} PROP={[{key: 'm', text: 'Homme'}, {key: 'f', text: 'Femme'}]}/>
        {error !== '' && 
          <Text style={styles.error}>{error}</Text>
        }
        <Button
          title="Ajouter"
          style={{backgroundColor: "#eee"}}
          onPress={handleSubmit}
        />

        {inserting && (
          <View style={styles.spinner}>
            <RotatingCircle color="#5f4a93"/>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    marginBottom: 20
  }, 
  error: {
    color: globalColors.danger,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export {StudentAddForm};