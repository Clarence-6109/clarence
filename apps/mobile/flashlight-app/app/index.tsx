import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleTorch = () => {
    setIsTorchOn(!isTorchOn);
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera. Please grant permission in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashlight App</Text>
      <Button
        title={isTorchOn ? "Turn Off Flashlight" : "Turn On Flashlight"}
        onPress={toggleTorch}
      />
      {/* Hidden camera view to control torch */}
      <Camera
        style={styles.hiddenCamera}
        flashMode={
          isTorchOn
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  hiddenCamera: {
    width: 0,
    height: 0,
  },
});
