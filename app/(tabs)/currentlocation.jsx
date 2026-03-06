import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentLocation = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [latestLocation, setLatestLocation] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugMsg, setDebugMsg] = useState('');

  const fetchPolyline = async () => {
    setLoading(true);
    setError(null);
    setDebugMsg('');

    try {
      const token = await AsyncStorage.getItem('@user_token');
      if (!token) throw new Error('No token found');

      const response = await fetch('https://backend-xgio-delta.vercel.app/get-polyline', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      // Si el backend devuelve 404 u otro error, caer al último punto conocido
      if (!response.ok) {
        setDebugMsg(`Sin polyline (HTTP ${response.status}), usando última ubicación...`);

        const fallback = await fetch('https://backend-xgio-delta.vercel.app/get-latest-location', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const fallbackData = await fallback.json();

        if (fallback.ok && fallbackData.latitude) {
          const point = {
            latitude: fallbackData.latitude,
            longitude: fallbackData.longitude,
          };
          setCoordinates([point]);
          setLatestLocation(point);
          setTotalDistance(0);
          setError(null);
        } else {
          setError('No hay datos de ubicación disponibles hoy.');
          setDebugMsg(`Fallback falló: ${JSON.stringify(fallbackData)}`);
        }
        return;
      }

      // Éxito — construir polyline
      const mapped = data.coordinates.map((point) => ({
        latitude: point.lat,
        longitude: point.lng,
      }));

      setCoordinates(mapped);
      setLatestLocation(mapped[mapped.length - 1]);
      setTotalDistance(data.total_distance_km);
      setError(null);

    } catch (err) {
      // Muestra el error real debajo del mensaje principal
      setError('Failed to fetch polyline');
      setDebugMsg(`Detalle: ${err.message}`);
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
        <Text style={styles.errorText}>{error}</Text>
        {/* Mensaje de debug — quítalo cuando funcione */}
        <Text style={styles.debugText}>{debugMsg}</Text>
      </View>
    );
  }

  const mapCenter = latestLocation || { latitude: 0, longitude: 0 };

  return (
    <View style={styles.container}>

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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {coordinates.length > 1 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#23a9da"
            strokeWidth={4}
          />
        )}

        {latestLocation && (
          <Marker
            coordinate={latestLocation}
            title="Posición actual"
            pinColor="#23a9da"
          />
        )}

        {coordinates.length > 0 && (
          <Marker
            coordinate={coordinates[0]}
            title="Inicio"
            pinColor="#2ecc71"
          />
        )}
      </MapView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  map: { width: '100%', flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  debugText: { color: '#888', fontSize: 11, textAlign: 'center' },
  infoCard: {
    backgroundColor: '#f0f9fd',
    padding: 16,
    margin: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#23a9da',
  },
  infoLabel: { fontSize: 13, color: '#888', marginBottom: 2 },
  infoValue: { fontSize: 28, fontWeight: 'bold', color: '#23a9da' },
  infoSub: { fontSize: 12, color: '#aaa', marginTop: 2 },
});

export default CurrentLocation;
