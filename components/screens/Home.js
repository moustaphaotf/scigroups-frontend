import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import globalStyles, { AddIcon, amountToString } from "../../global";
import GroupDataServices from "../../services/GroupDataServices";
import Empty from "../Empty";
import {GroupAddForm} from "../GroupForm";
import AppLoading from './AppLoading';
import ModalWithClose from '../ModalWithClose';
moment.locale('fr');

const Home = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);

  useEffect(() => {
    retrieveGroups();
  });

  const retrieveGroups = async () => {
    await GroupDataServices.getAllGroups()
      .then(response => {
        setGroups(response.data);
        setDataLoaded(true);
      })
      .catch(
        e => console.log(e)
    );
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Group', item)}
        style={[globalStyles.listItem, globalStyles.itemRow]}
      >
        <View style={{flex: 1}}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.title}>
            Date de création:&nbsp;&nbsp;
            <Text style={styles.content}>{moment(item.dateCreated).fromNow()}</Text>
          </Text>
          {item.totalAmount ? (
            <Text style={styles.title}>
              Montant total: &nbsp;&nbsp;
              <Text style={styles.content}>{amountToString(item.totalAmount)}</Text>
            </Text>
          ): null }
        </View>

        <TouchableOpacity onPress={() => {setGroupToEdit(item); setModalOpen(true)}}>
          <AntDesign name="edit" size={20} color="gray"/>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  const handleInsert = (newGroup) => {
    setGroups([newGroup, ...groups]);
    setModalOpen(false);
  }
  
  const handleUpdate = (edited) => {
    setGroups(oldGroups => {
      const updatedGroups = 
        oldGroups.map(g => g._id === edited._id ? edited : g)
      return updatedGroups;
    });
    setModalOpen(false);
  }

  return (
    <View style={globalStyles.container}>
      <ModalWithClose
        opened={modalOpen}
        setOpened={setModalOpen}
        onClose={() => {
          if(groupToEdit) 
            setGroupToEdit(null)
        }} 
      >
        <GroupAddForm 
          handleInsert={handleInsert}
          handleUpdate={handleUpdate}
          toEdit={groupToEdit}
        />
      </ModalWithClose>
      {dataLoaded ? 
          groups.length > 0 ? (
            <>
              <FlatList 
                style={{paddingBottom:100}}
                data={[...groups]}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
              <AddIcon onPress={() => setModalOpen(true)}/>
            </> ) : (
            <>
              <Empty text="Il n'y aucun groupe encore" />  
              <AddIcon onPress={() => setModalOpen(true)}/>
            </> 
        ) : (
          <AppLoading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemName: {
    fontFamily: 'nunito-regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  title: {
    color: 'gray',
    marginBottom: 2
  },
  content:{
    fontWeight: 'bold'
  }

})

export default Home;