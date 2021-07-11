import React from 'react';
import { Text, View, Button } from 'react-native';

const Landing = ({ navigation}) => (
  <View style={ {flex:1, justifyContent: 'center', alignItems:"center"}}>
    <Text style={{marginBottom:'1rem'}}>Hello Imagigram!</Text>
    <Button 
      title="Register" 
      onPress={() => navigation.navigate("Register")}/>
    <Button 
      title="Login" 
      onPress={() => navigation.navigate("Login")}/>
  </View>

);

export default Landing;