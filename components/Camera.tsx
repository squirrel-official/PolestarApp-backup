import { CameraView, CameraProps, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';


export default function AppCamera() {
  // @ts-ignore: just being lazy with types here
  const cameraRef = useRef<CameraView>(undefined);
  const [facing, setFacing] = useState<CameraProps["facing"]>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureSizes, setPictureSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState(undefined);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Overlap the camera preview with a transparent button container for visual appeal */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
          {/* Empty onPress handler to prevent unnecessary actions */}
        </TouchableOpacity>

        {/* Add the control buttons directly inside the CameraView */}
        <View style={styles.flipPanel}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraPanel}>
          <TouchableOpacity style={styles.captureButton} onPress={async () => {
            const photo = await cameraRef.current?.takePictureAsync();
            alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`);
            console.log(JSON.stringify(photo));
          }}>
            <Fontisto name="camera" size={30} color="black" />
          </TouchableOpacity>
        </View>
        
      </CameraView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flipPanel: {
    position: 'absolute',
    marginTop:'15%',
    right: '1%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cameraPanel: {
    position: 'absolute',
    bottom: 30, // Adjust as needed
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'center',
    paddingHorizontal: 20,
  },
  flipButton: {
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 20,
  },
  captureButton: {
    backgroundColor: 'yellow',
    padding: 7,
    borderRadius: 20,
  }
});
