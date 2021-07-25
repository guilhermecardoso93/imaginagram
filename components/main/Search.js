import React, {useState} from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

import firebase from "firebase";
import "firebase/firestore";

const Search = ({ navigation }) => {

  const [users, setUsers] =  useState([]);

  const fetchUsers = search => {
    firebase.firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then( snapshot => {
        const _users = snapshot.docs.map( doc => {
          const data = doc.data();
          const id = doc.id;
          return{ id, ...data};
        });
        setUsers(_users);
      })
    };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Search user..."
        onChangeText={search => fetchUser}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={()=> 
              navigation
              .navigate('Profile', {uid: item.id})}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
  

export default Search;