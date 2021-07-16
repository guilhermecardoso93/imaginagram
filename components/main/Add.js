import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';

const Add = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
   const [camera, setCamera] = useState(null);
  const [image, setImage] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async ()  => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }

  };

  useEffect(() => {
    (async () => {
      const cameraRequest = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraRequest.status === "granted");
      const galleryRequest = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryRequest.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === null) {
    return <Text>No access to camera</Text>;
  }






  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection:'row' }}>
        <Camera ref={ref => setCamera(ref)} style={{flex:1, aspectRatio:1}}type={type} ratio={'1:1'} />
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
      <Button title="Take Picture"onPress={() =>takePicture()}/>
      <Button title="Select from Gallery" onPress={() =>pickImage()}/>
      <Button title="Save" onPress={() =>navigation.navigate('Save',{image})}/>
      {image && <Image source={{uri: image}} style={{ flex:1}}/>}
    </View>
  );
};

export default Add;

//const styles = StyleSheet.create({ ... });
