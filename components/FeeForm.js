import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import * as yup from 'yup';
import globalStyles, { globalColors } from '../global';
import FeeDataServices from '../services/FeeDataServices';
import RotatingCircle from './RotatingCircle';

const FeeAddForm = ({handleUpdate, toEdit, route, handleInsert}) => {
  const [amount, setAmount] = useState(toEdit?.amount ?? "");
  const [description, setDescription] = useState(toEdit?.description ?? "");
  const [paidAt, setPaidAt] = useState(toEdit?.paidAt ?? new Date().toISOString());
  const [error, setError] = useState("");
  const [inserting, setInserting] = useState(false);

  useEffect(() => {
    setError("");
  }, [amount, description])

  const insert = (data) => {
    FeeDataServices.insertFee(data)
    .then(response => {
      handleInsert(response.data);
    })
    .catch(e => console.log(e))
    .finally(() => setInserting(false));
  }

  const update = (data) => {
    FeeDataServices.updateFee(data)
    .then(response => {
      handleUpdate(response.data);
    })
    .catch(e => console.log(e))
    .finally(() => setInserting(false));
  }

  const handleSubmit = () => {
    let schema = null, data = { description, amount };
    
    if(toEdit){
      schema = yup.object().shape({
        description: yup.string().max(255),
        amount: yup.number().min(0),
        paidAt: yup.date().required()
      });
      data.paidAt = paidAt;
    }else{
      schema = yup.object().shape({
        description: yup.string().max(255),
        amount: yup.number().min(0)
      });
    }

    schema.validate(data)
      .then(val => {
        setInserting(true);
        
        if(toEdit){
          update({id: toEdit._id, ...data});
        }else{
          insert({
            groupId: route.params.currentGroup[0].groupId,
            studentId: route.params._id,
            ...data
          });
        }
      })
      .catch(e => {
        setError(e.errors??[0]);
        console.log(e.errors);
      })
  }

  return (
    <View >
      {toEdit && 
        <Text style={globalStyles.formRole}>
          Modifier un paiement
        </Text>
      }
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={[globalStyles.inputField, styles.input]}
        value={amount}
        placeholder="Montant à ajouter"
        onChangeText={newValue => setAmount(newValue)}
        keyboardType="numeric"
      /><TextInput
        style={[globalStyles.inputField, styles.input]}
        value={description} 
        placeholder="Description" 
        onChangeText={newValue => setDescription(newValue)}
      />
      {toEdit &&  
        <TextInput
          style={[globalStyles.inputField, styles.input]}
          value={paidAt} 
          placeholder="Description" 
          onChangeText={newValue => setPaidAt(newValue)}
        />}
      <Button
        onPress={handleSubmit}
        title={toEdit ? "Modifier" : "Ajouter"}
        style={{marginBottom: 10}}
      />
      {inserting && <View style={[styles.spinner, !toEdit && {marginTop: 10}]}><RotatingCircle color={globalColors.main}/></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  spinner: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: globalColors.danger,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    marginBottom: 5,
  }
})

export {FeeAddForm};