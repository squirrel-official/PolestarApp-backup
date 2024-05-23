import { CameraView, CameraProps, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          pictureSize={selectedSize}
        >
        </CameraView>     

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Take Picture"
          onPress={async () => {
            const photo = await cameraRef.current?.takePictureAsync();
            alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`);
            console.log(JSON.stringify(photo));
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  camera: {
    width: '100%',
    height: '80%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});