import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import BottomSheet from '../../components/bottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const TodaysRoute = () => {
  const [locations, setLocations] = useState([]); // Ensure locations is always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@user_token');
      if (!token) throw new Error('No token found');
  
      const response = await fetch('https://backend-xgio-delta.vercel.app/get-current-location', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
  
      const data = await response.json();
      const locationsData = Array.isArray(data.locations) ? data.locations : [];
      setLocations(locationsData);
      
      // Actualizar la región del mapa cuando se obtienen nuevas ubicaciones
      setMapRegion(calculateInitialRegion(locationsData));
      setError(null); // limpiamos el error si fue exitoso
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular la región inicial basada en las ubicaciones
  const calculateInitialRegion = (locations) => {
    if (!locations || locations.length === 0) {
      // Valor por defecto si no hay ubicaciones
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      };
    }

    // Si solo hay una ubicación, centrar en esa
    if (locations.length === 1) {
      return {
        latitude: locations[0]?.latitude || 0,
        longitude: locations[0]?.longitude || 0,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      };
    }

    // Para múltiples ubicaciones, calcular el centro y el zoom apropiado
    let minLat = locations[0]?.latitude || 0;
    let maxLat = locations[0]?.latitude || 0;
    let minLng = locations[0]?.longitude || 0;
    let maxLng = locations[0]?.longitude || 0;

    // Encontrar los valores mínimos y máximos de latitud y longitud
    locations.forEach(location => {
      const lat = location?.latitude || 0;
      const lng = location?.longitude || 0;
      
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    // Calcular el centro
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Calcular el delta (zoom) con un pequeño padding
    const latDelta = (maxLat - minLat) * 1.2 || 0.01;
    const lngDelta = (maxLng - minLng) * 1.2 || 0.01;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3
    };
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
      <View className="flex-1 bg-gray-200">
        <View style={styles.errorContainer}>
          <Text className="text-center text-2xl font-pbold text-gray-600 mt-10">No se ha empezado una ruta el día de hoy</Text>
        </View>

        <View style={{ marginTop: 20 }}>
        <Text
          style={{ color: '#23a9da', fontSize: 16, textDecorationLine: 'underline' }}
          onPress={fetchLocations}
        >
          Reintentar
        </Text>
        </View>
      </View>
    );
  }
  
  if(locations && locations.length > 0) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MapView 
            style={styles.map}
            region={mapRegion} // Usando region en lugar de initialRegion para actualizar en cada enfoque
          >
            {locations.map((location, index) => {
              const isFirstOrLast = index === 0 || index === locations.length - 1;
                return isFirstOrLast ? (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location?.latitude || 0,
                    longitude: location?.longitude || 0,
                  }}
                  title={location?.title || `Marker ${index + 1}`}
                  description={location?.description || ''}
                />
              ) : (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location?.latitude || 0,
                    longitude: location?.longitude || 0,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    borderColor: 'rgba(255, 0, 0, 0.9)',
                    borderWidth: 1,
                  }} />
                </Marker>
              );
            })}
          </MapView>
        </ScrollView>
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-gray-200">
      <Text className="text-center text-2xl font-pbold text-gray-600 mt-10">No hay ubicaciones disponibles</Text>
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
    textAlign: 'center',
    padding: 50,
  },
  errorText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default TodaysRoute;