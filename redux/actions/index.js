import {
  USER_STATE_CHANGE,
  USER_POST_CHANGE,
  USER_FOLLOWING_CHANGE,
  USERS_DATA_CHANGE,
  USERS_POST_CHANGE,
  USERS_LIKE_COUNT_CHANGE,
  USERS_LIKE_CHANGE,
  CLEAR_DATA,
} from '../constants';
import firebase from 'firebase';
import 'firebase/firestore';

export const fetchUser = () => {
  return((dispatch)=> {
    firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get().then((snapshot) => {
      if(snapshot.exists) {
        dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
      } else {
        console.log('Action FetchUSer: Usuário não existe.');
      }
    });
  });
};

export const fetchUserPosts = () => {
  return((dispatch)=> {
    firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts')
    .orderBy('creation', 'asc')
    .get()
    .then((snapshot) => {
        const posts = snapshot.docs.map( doc => {
          const data = doc.data();
          const id = doc.id;
          return{ id, ...data};
        });
        dispatch({type: USER_POST_CHANGE, posts});
    });
  });
};