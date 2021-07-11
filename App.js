import React, { useState, useEffect } from "react";
import {  View, Text } from "react-native";
import firebase from "firebase";
//import * as firebase from 'firebase';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducers, applyMiddleware(thunk));

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/Main";
import Add from "./components/main/Add";

const firebaseConfig = {
  apiKey: "AIzaSyBYzjm3nswJWsT3f0ceXtxxF7ciwhJNZ3w",
  authDomain: "imagigram-d539a.firebaseapp.com",
  projectId: "imagigram-d539a",
  storageBucket: "imagigram-d539a.appspot.com",
  messagingSenderId: "298542156225",
  appId: "1:298542156225:web:89861733b7863e7f168740",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);

  const Loading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Carregando.... </Text>
    </View>
  );

  const LoggedOut = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShow: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const LoggedIn = () => (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShow: false }}
          />
          <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isLoggedIn) {
    return <LoggedIn />;
  }
  return <LoggedOut />;
};

export default App;
