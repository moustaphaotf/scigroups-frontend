import globalStyles, { globalColors } from '../global';
import { TextInput, ScrollView, Text, Button, View, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import RadioButton from './RadioButton';
import * as yup from 'yup';
import StudentDataServices from '../services/StudentDataServices';
import RotatingCircle from './RotatingCircle';

const StudentAddForm = ({ handleInsert, handleUpdate, toEdit, route}) =>  {
  const [firstname, setFirstname] = useState (toEdit?.firstname ?? "");
  const [lastname, setLastname] = useState (toEdit?.lastname ?? "");
  const [genre, setGenre] = useState (toEdit?.genre ?? "M");
  const [phone, setPhone] = useState (toEdit?.phone ?? "");
  const [schoolOfOrigin, setSchoolOfOrigin] = useState (toEdit?.schoolOfOrigin ?? "");
  const [grade, setGrade] = useState (toEdit?.grade ?? "");
  const [dateRegistered, setDateRegistered] = useState(() => {
    // guess the registered date whether the student is newly created or not
    if(toEdit?.currentGroup){
      return toEdit.currentGroup[0].dateRegistered;
    }else if(toEdit?.groups){
      return toEdit.groups[0].dateRegistered;
    }
  })

  const [inserting, setInserting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [firstname, lastname, genre, phone, schoolOfOrigin, grade])

  const insert = data => {
    StudentDataServices.insertStudent(data)
    .then(response => {
      handleInsert(response.data);
    })
    .then(() => setInserting(false))
    .catch(e => console.log(e));
  }

  const update = data => {
    StudentDataServices.updateStudent(data)
    .then(response => {
      handleUpdate(response.data);
    })
    .then(() => setInserting(false))
    .catch(e => console.log(e));
  }
  
  const handleSubmit = () =>{
    // Constructing the data based on insert or update
    let schema = null, data = {
      firstname, lastname,
      genre, phone, grade,
      schoolOfOrigin
    };
    if(toEdit){
      schema = yup.object().shape({
        genre: yup.string().required().length(1),
        grade: yup.string().required(),
        schoolOfOrigin: yup.string().required().min(3).max(50),
        phone: yup.string().required().min(9).max(20).matches(new RegExp('^[0-9]{9,20}$')),
        lastname: yup.string().required().min(3).max(20),
        firstname: yup.string().required().min(3).max(50),
        dateRegistered: yup.date().required()
      });
      data.dateRegistered = dateRegistered;
    }else{
      schema = yup.object().shape({
        genre: yup.string().required().length(1),
        grade: yup.string().required(),
        schoolOfOrigin: yup.string().required().min(3).max(50),
        phone: yup.string().required().min(9).max(20).matches(new RegExp('^[0-9]{9,20}$')),
        lastname: yup.string().required().min(3).max(20),
        firstname: yup.string().required().min(3).max(50),
      });
    }
    
    const groupId = route.params._id;

    schema.validate(data)
      .then(val => {
        setInserting(true);
        
        if(toEdit){
          update({id:toEdit._id, ...data});
        }else{
          insert({groupId, ...data});
        }
      })
      .catch(e => {
        setError(e.errors[0])
        console.log(e.errors);
      })
  }

  return (
    <>
      <Text style={globalStyles.formRole}>
        {toEdit ? "Modifier un élève" : "Ajout d'un élève"}
        </Text>
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
          keyboardType={'phone-pad'}
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
        {toEdit && 
          <TextInput 
            style={globalStyles.inputField}
            value={dateRegistered}
            onChangeText={(newText) => setDateRegistered(newText)}
            placeholder="Date d'inscription"
          />
        }
        <RadioButton style={styles.radio} value={genre} setGenre={setGenre} options={[{key: 'M', text: 'Homme'}, {key: 'F', text: 'Femme'}]}/>
        {error !== '' && 
          <Text style={globalStyles.error}>{error}</Text>
        }
        <Button
          title= {toEdit ? 'Modifier' : "Ajouter"}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    marginBottom: 20
  }
});

export {StudentAddForm};