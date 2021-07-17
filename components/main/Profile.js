import React, {useState, useEffect} from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { connect } from react-redux;

import firebase from "firebase";
import 'firebase/auth';
import "firebase/firestore";

const Profile = ({ currentUser, post, route  }) => {
const[userPosts, setUserPosts] = useState([]);
const[user, setUser] = useState(null);

useEffect(() => {
  const {uid} = route.params
  if (uid=== firebase.auth().currentUser.uid){
    setUser(currentUser);
    setUserPosts(posts);
  } else {
    firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      if(snapshot.exists) {
          setUser(snapshot.data());
        } 
    });

    firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection('userPosts')
    .orderBy('creation', 'asc')
    .get()
    .then((snapshot) => {
        const _posts = snapshot.docs.map( doc => {
          const data = doc.data();
          const id = doc.id;
          return{ id, ...data};
        });
          setUserPosts(_posts)    
      });
  }

}, [route.params.uid])

if (!user) return (<View/>);


  return (

  <View style={styles.container}>
    <View style={styles.info}>
    <Text>{user?.name}</Text>
    <Text>{user?.email}</Text>
    </View> 
    <View style={styles.gallery}>
      <FlatList
        numColumns={3}
        horizontal={false}
        data={userPosts}
        renderItem={({item}) => (
        <View style={styles.images}>
          <Image 
            style={styles.image}
            source={ { uri: item.downloadURL }}
          />
        </View>
      )}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    margin:20,
  },
  gallery: {
    flex:1,
  },
  images: {
    flex:1/3,
  },
  image: {
    flex:1, 
    aspectRatio:1/1,
  }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
}

export default connect(mapStateToProps, null)(Profile);

