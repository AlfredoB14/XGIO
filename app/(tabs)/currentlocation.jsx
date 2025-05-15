import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet from '../../components/bottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentLocation = () => {
  const [locations, setLocations] = useState([]); // Cambiado a locations (plural)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@user_token');
      if (!token) throw new Error('No token found');

      const response = await fetch('https://backend-xgio.vercel.app/get-latest-location', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data = await response.json();
      setLocations(data);
      setError(null); // limpiamos el error si fue exitoso
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#23a9da" />
        <Text>Cargando Información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.map}
          region={{
            latitude: locations?.latitude || 0, // Usando el primer elemento del array
            longitude: locations?.longitude || 0,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
            <Marker
              coordinate={{
                latitude: locations.latitude || 0,
                longitude: locations.longitude || 0,
              }}
            />
        </MapView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    width: '100%',
    height: 800,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default CurrentLocation;