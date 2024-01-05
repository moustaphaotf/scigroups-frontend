import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import globalStyles, { AddIcon, amountToString, globalColors } from "../../global";
import GroupDataServices from "../../services/GroupDataServices";
import Empty from "../Empty";
import {GroupAddForm} from "../GroupForm";
import AppLoading from './AppLoading';
import ModalWithClose from '../ModalWithClose';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {Box, Menu, Pressable} from 'native-base';
moment.locale('fr');

const Tab = createMaterialTopTabNavigator();

const HomeMenu = ({onClose}) => {
  const [sortProperty, setSortProperty] = useState('');
  useEffect(() => {
    setSortProperty( localStorage.getItem('groups.sortby') || 'name.asc');
  }, []);

  useEffect(() => {
    localStorage.setItem('groups.sortby', sortProperty);
  }, [sortProperty])

  return(
    <Box w="90%" alignItems="flex-end">
      <Menu w="190" onClose={onClose}  trigger={triggerProps => {
      return <Pressable {...triggerProps}>
              <MaterialCommunityIcons style={{marginRight: 5}} name="dots-vertical" size={20} color="#fff" />
            </Pressable>;
    }}>
        <Menu.OptionGroup defaultValue={sortProperty} title="Sort by" type="radio" 
          onChange={(val) => setSortProperty(val)}
        >
          <Menu.ItemOption value="name.asc">Name (Asc)</Menu.ItemOption>
          <Menu.ItemOption value="name.desc">Name (Desc)</Menu.ItemOption>
          <Menu.ItemOption value="createdAt.asc">Created At (Asc)</Menu.ItemOption>
          <Menu.ItemOption value="createdAt.desc">Created At (Desc)</Menu.ItemOption>
          <Menu.ItemOption value="updatedAt.asc">Updated At (Asc)</Menu.ItemOption>
          <Menu.ItemOption value="updatedAt.desc">Updated At (Desc)</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Box>
  )
}

// make the Home screen like this
// Home = {owned + administrated} groups
const Home = ({navigation}) => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="owned" component={GroupsList} options={{title: "Vous possédez"}}/>
      <Tab.Screen name="administrated" component={GroupsList} options={{title: "Vous administrez"}}/>
    </Tab.Navigator>
  )
}

const GroupsList = ({navigation, route}) => {
  const [groups, setGroups] = useState(null)
  const [dataLoading, setDataLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => <HomeMenu onClose={retrieveGroups} />
    });
  }, []);

  useEffect(() => {
    retrieveGroups();
  }, []);

  const retrieveGroups = async () => {
    setDataLoading(true);
    await GroupDataServices.getGroupsByUser(
      JSON.parse(localStorage.getItem('user'))._id,
      localStorage.getItem('groups.sortby')
    )
      .then(response => {
        setGroups(response.data.groups);
        setDataLoaded(true);
      })
      .catch(e => {
        setDataLoaded(false);
        console.log(e.message)
      })
      .finally(() => setDataLoading(false));
  }
  const renderItem = ({item}) => {
    return(
      <Box 
        mt={2} 
        marginX={1}
        p={3}
        roundedTop="md"
        roundedBottom="md"
        backgroundColor="#ddd"
      >
        <Text
          style={{ fontSize: 18}}
        >{item.name}</Text>
      </Box>
    )
  }

  return(
    <View>
      {
        dataLoading ? (
          <Text>Chargement en cours ...</Text>
        ) : (
          !dataLoaded ? (
            <Text>Une erreur est survenue ...</Text>
          ) : (
            <FlatList 
              data={groups[route.name]}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              ListEmptyComponent={Empty}
            />
          )
        )
      }
    </View>
  )
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