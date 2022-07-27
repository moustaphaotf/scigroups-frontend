import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import globalStyles, { AddIcon } from "../../global";
import GroupDataServices from "../../services/GroupDataServices";
import AppLoading from './AppLoading';

const Home = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    retrieveGroups();
  }, []);

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
      >
        <View style={globalStyles.listItem}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.date}>
            Date created:&nbsp;&nbsp;
            <Text style={{fontWeight: 'bold'}}>{moment(item.dateCreated).fromNow()}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={globalStyles.container}>
      {dataLoaded ? (
        <FlatList 
          data={[...groups]}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        /> ): (
          <AppLoading />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  date: {
    color: 'gray'
  }
})

export default Home;