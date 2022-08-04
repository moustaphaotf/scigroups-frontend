import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import * as yup from 'yup';
import globalStyles, { globalColors } from '../global';
import FeeDataServices from '../services/FeeDataServices';
import RotatingCircle from './RotatingCircle';

const FeeAddForm = ({route, handleInsert}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [inserting, setInserting] = useState(false);

  useEffect(() => {
    setError("");
  }, [amount, description])

  const handleSubmit = () => {
    const data = { description, amount };
    const schema = yup.object().shape({
      description: yup.string().max(255),
      amount: yup.number().min(0)
    });

    schema.validate(data)
      .then(val => {
        setInserting(true);
        FeeDataServices.insertFee({
          groupId: route.params.currentGroup[0].groupId,
          studentId: route.params._id,
          ...data
        })
        .then(response => {
          handleInsert(response.data);
          setInserting(false);
        });
        setAmount("");
        setDescription("");
      })
      .catch(e => {
        setError(e.errors??[0]);
        console.log(e.errors);
      })
      .finally(() => setInserting(false));
  }

  return (
    <View >
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
      {!inserting && 
        <Button
          onPress={handleSubmit}
          title="Ajouter"
          style={{marginBottom: 10}}
        />
      }
      {inserting && <View style={styles.spinner}><RotatingCircle color={globalColors.main}/></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  spinner: {
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