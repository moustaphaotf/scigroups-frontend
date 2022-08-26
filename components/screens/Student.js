import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Feather, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { FeeAddForm } from "../FeeForm";
import { useEffect, useState } from "react";
import FeeDataServices from '../../services/FeeDataServices';
import { FlatList } from "react-native-gesture-handler";
import Empty from '../Empty';
import globalStyles, { amountToString } from "../../global";
import AppLoading from "./AppLoading";
import moment from "moment";
import ModalWithClose from "../ModalWithClose";

const Student = ({route}) => {
  const [fees, setFees] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feeToEdit, setFeeToEdit] = useState(null);

  useEffect(() => {
    retrieveFees();
  });

  
  const retrieveFees = () => {
    // for a newly created student, groupId info is inside the groups' zero
    // if not, on loading, the student come up with a currentGroup property
    let groupId = '';
    if(route.params.currentGroup) groupId = route.params.currentGroup[0].groupId;
    else groupId = route.params.groups[0].groupId;
    
    FeeDataServices.getAllFees(groupId, route.params._id)
      .then( response => {
        setFees(response.data);
        setDataLoaded(true);
      })
      .catch( e => console.log(error));
  }

  const handleInsert = (newFee) => {
    setFees([newFee, ...fees]);
  }
  
  const handleUpdate = (edited) => {
    setFees(oldFees => {
      const updatedFees = 
        oldFees.map(f => f._id === edited._id ? edited : f)
      
      return updatedFees;
    });
    setModalOpen(false);
  }
  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity 
        style={[globalStyles.listItem, globalStyles.itemRow]}
      >
        <View style={{flex:1}}>
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
        <TouchableOpacity onPress={() => {setFeeToEdit(item); setModalOpen(true)}}>
          <AntDesign name="edit" size={20} color="gray"/>
        </TouchableOpacity>        
      </TouchableOpacity>
    );
  }
  
  const {firstname, lastname, genre, grade, schoolOfOrigin, phone} = route.params;
  return (
    <View style={globalStyles.container}>
      <ModalWithClose
        opened={modalOpen}
        setOpened={setModalOpen}
        onClose={() => setFeeToEdit(null)}
      >
        <FeeAddForm
          route={route}
          handleUpdate={handleUpdate}
          toEdit={feeToEdit}
        />
      </ModalWithClose>
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