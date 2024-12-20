import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPage() {
  const [location, setLocation] = useState<null | Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const refreshLocation = async () => {
    let updatedLocation = await Location.getCurrentPositionAsync({});
    setLocation(updatedLocation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Location</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <View>
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="tomato" />
      )}
      <Button title="Refresh Location" onPress={refreshLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
});
