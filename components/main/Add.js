import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Camera } from "expo-camera";

const Add = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection:'row' }}>
        <Camera style={{flex:1, aspectRatio:1}}type={type} ratio={'1:1'} />
      </View>
      <Button
        title="Flip camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
    </View>
  );
};

export default Add;

//const styles = StyleSheet.create({ ... });
