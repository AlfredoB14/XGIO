import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  // ← agregamos Polyline
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentLocation = () => {
  const [coordinates, setCoordinates] = useState([]);   // todos los puntos del día
  const [latestLocation, setLatestLocation] = useState(null); // último punto para el Marker
  const [totalDistance, setTotalDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolyline = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@user_token');
      if (!token) throw new Error('No token found');

      // Obtenemos la polyline del día de hoy (sin parámetro date = hoy)
      const response = await fetch('https://backend-xgio-delta.vercel.app/get-polyline', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch polyline');
      }

      const data = await response.json();

      // coordinates viene como [{lat, lng, timestamp}, ...]
      // MapView necesita [{latitude, longitude}, ...]
      const mapped = data.coordinates.map((point) => ({
        latitude: point.lat,
        longitude: point.lng,
      }));

      setCoordinates(mapped);
      setLatestLocation(mapped[mapped.length - 1]); // el último punto = posición actual
      setTotalDistance(data.total_distance_km);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPolyline();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#23a9da" />
        <Text>Cargando recorrido...</Text>
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

  // Centrar el mapa en el último punto conocido
  const mapCenter = latestLocation || { latitude: 0, longitude: 0 };

  return (
    <View style={styles.container}>

      {/* Tarjeta con la distancia recorrida */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Recorrido de hoy</Text>
        <Text style={styles.infoValue}>{totalDistance} km</Text>
        <Text style={styles.infoSub}>{coordinates.length} puntos registrados</Text>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: mapCenter.latitude,
          longitude: mapCenter.longitude,
          latitudeDelta: 0.01,   // zoom más cerrado para ver el recorrido
          longitudeDelta: 0.01,
        }}
      >
        {/* Línea del recorrido completo */}
        {coordinates.length > 1 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#23a9da"
            strokeWidth={4}
          />
        )}

        {/* Marcador en la posición actual (último punto) */}
        {latestLocation && (
          <Marker
            coordinate={latestLocation}
            title="Posición actual"
            pinColor="#23a9da"
          />
        )}

        {/* Marcador en el punto de inicio */}
        {coordinates.length > 0 && (
          <Marker
            coordinate={coordinates[0]}
            title="Inicio del recorrido"
            pinColor="#2ecc71"
          />
        )}
      </MapView>

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
    flex: 1,
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
  infoCard: {
    backgroundColor: '#f0f9fd',
    padding: 16,
    margin: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#23a9da',
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23a9da',
  },
  infoSub: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
});

export default CurrentLocation;
