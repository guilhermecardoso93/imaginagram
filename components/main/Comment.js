import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsersData } from "../../redux/actions/index";

const Comment = ({ route, users }) => {
  const { postId, uid } = route.params;
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("comments")
      .get()
      .then((snapshot) => {
        const comments = snapshot.doc.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        setComments(comments);
        setShouldUpdate(false);
      });
  }, [postId, shouldUpdate]);

  useEffect(() => {
    if (shouldUpdate) {
      firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("comment")
        .get()
        .then((snapshot) => {
          const comments = snapshot.docs.map((doc) => {
            const date = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          const updatedComments = comments.map((item) => {
            if (item.hasOnProperty("user")) return item;
            const creator = users?.find((user) => user.uid === item.creator);
            if (creator) {
              item.user = creator;
            } else {
              item.user = currentUser;
            }
            return item;
          });
          setComments(updateComments);
          setShouldUpdate(false);
        });
    }
  }, [postId, shouldUpdate]);

  const handleCommentSubmit = () => {
    if (comment) {
      firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("comments")
        .add({
          creator: currentUser.uid,
          comment,
        });
    }
    setComment();
    setShouldUpdate(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {item.user && <Text>{item.user.name}</Text>}
            <Text>{item.comment}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Leave a comment"
          onChangeText={(value) => setComment(value)}
        />
        <Button onPress={handleCommentSubmit} title="Send" />
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUSer: store.userState.currentUser,
  users: store.usersState.users,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
