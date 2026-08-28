import React from 'react';
import { StyleSheet, Text, View, Pressable, Button, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  // 1. Permission status is still loading
  if (!permission) {
    return <View style={styles.container} />;
  }

  // 2. Permission is not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // 3. Permission granted — render camera
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => console.log('Take picture')}>
            <Text style={styles.text}>Flip / Action</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});