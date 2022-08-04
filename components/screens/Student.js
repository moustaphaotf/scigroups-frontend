import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { FeeAddForm } from "../FeeForm";
import { useEffect, useState } from "react";
import FeeDataServices from '../../services/FeeDataServices';
import { FlatList } from "react-native-gesture-handler";
import Empty from '../Empty';
import globalStyles, { amountToString } from "../../global";
import AppLoading from "./AppLoading";
import moment from "moment";

const Student = ({route}) => {
  const [fees, setFees] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    retrieveFees();
  });

  
  const retrieveFees = () => {
    FeeDataServices.getAllFees(route.params.currentGroup[0].groupId, route.params._id)
      .then( response => {
        setFees(response.data);
        setDataLoaded(true);
      })
      .catch( e => console.log(error));
  }

  const handleInsert = (newFee) => {
    setFees([newFee, ...fees]);
  }
  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity >
        <View style={globalStyles.listItem}>
          <View style={styles.row}>
            <View style={styles.icon}><MaterialIcons color="gray" name="description" size={18}/></View>
            <Text>{item.description}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.icon}><FontAwesome color="gray" name="dollar" size={18}/></View>
            <Text>{amountToString(item.amount)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.icon}><Entypo color="gray" name="clock" size={18}/></View>
            <Text>{moment(item.paidAt).fromNow()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  const {firstname, lastname, genre, grade, schoolOfOrigin, phone} = route.params;
  return (
    <View style={globalStyles.container}>
      <View style={styles.personnalInfos}>
        <Text style={styles.lastname}>{lastname.toUpperCase()}</Text>
        <Text style={styles.firstname}>{firstname}</Text>
        <View style={styles.row}>
          <View style={styles.icon}><FontAwesome  style={{fontSize: 18}}name="graduation-cap" /></View>
          <Text style={{fontSize: 18}}>{schoolOfOrigin}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.icon}><Feather  style={{fontSize: 18}}name="phone" /></View>
          <Text style={{fontSize: 18}}>{phone}</Text>
        </View>
      </View>

      <FeeAddForm
        route={route}
        handleInsert={handleInsert}
      />
      {
        dataLoaded ? 
          fees.length > 0 ? (
            <FlatList 
              data={fees}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />          
          ) : (
            <Empty/>
        ) : (
          <AppLoading />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  personnalInfos: {
    padding: 10,
    margin: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'coral'
  },
  firstname: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 10
  },
  lastname: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  icon: {
    width: 20, 
    height:20, 
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'column'
  },
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailFee: {
    marginRight: 5,
    width: 20,
    heigth: 20
  }
})

export default Student;