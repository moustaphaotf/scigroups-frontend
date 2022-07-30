import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import StudentDataServices from '../../services/StudentDataServices';
import globalStyles, { AddIcon } from '../../global';
import AppLoading from './AppLoading';
import Empty from '../Empty';
import ModalWithClose from '../ModalWithClose';
import { StudentAddForm } from '../StudentForm';
import moment from 'moment';

const Group = ({route, navigation}) => {
  const [students, setStudents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    retrieveStudents();
  }, [])

  const retrieveStudents = async () => {
    await StudentDataServices.getAllStudents(route.params._id)
      .then(response => {
        setDataLoaded(true);
        setStudents(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleInsert = newStudent => {
    setStudents([newStudent, ...students]);
    setModalOpen(false);
  }

  const getDateRegistered = student => {
    const group = student.groups.filter(g => g._id !== route.params._id);
    return group[0].dateRegistered;
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Student', item)}
      >
        <View style={globalStyles.listItem}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>
              {item.lastname.toUpperCase()}
            </Text>
              , {item.firstname}
            </Text>
            <Text style={{color: 'gray', marginTop: 10}}>
              Date d'inscription:&nbsp;&nbsp;
              <Text style={{fontWeight: 'bold'}}>{moment(getDateRegistered(item)).fromNow()}</Text>
            </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={globalStyles.container}>
      <ModalWithClose
        opened={modalOpen}
        setOpened={setModalOpen}
      >
        <StudentAddForm 
          route={route} 
          formRole="Ajouter un nouvel élève"
          handleInsert={handleInsert}
        />
      </ModalWithClose>
      {dataLoaded ?
          students.length > 0 ? (
            <>
              <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
              <AddIcon onPress={ () => setModalOpen(true) }/>
            </>
          ) : (
            <>
              <Empty text="Il n'y a aucun étudiant dans ce groupe" />
              <AddIcon onPress={ () => setModalOpen(true) }/>
            </>
        ) : (
        <AppLoading />
      )}
    </View>
  );
}

export default Group;