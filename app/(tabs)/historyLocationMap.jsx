import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import CustomHeader from '../../components/header';
import BottomSheet from '../../components/bottomSheet';

const HistoryLocationMap = () => {
  const { date, latitude, longitude, name, address, locations: locationsParam } = useLocalSearchParams();
  const [locationsArray, setLocationsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  
  // Parse the latitude and longitude to numbers (for the initial marker)
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  useEffect(() => {
    try {
      // Parse the locations string back to an array if it exists
      if (locationsParam) {
        const parsedLocations = JSON.parse(locationsParam);
        setLocationsArray(Array.isArray(parsedLocations) ? parsedLocations : []);
      } else {
        // If no locations array is provided, create an array with the single location
        setLocationsArray([{
          latitude: lat,
          longitude: lng
        }]);
      }
      
      // Set the map region based on the current location data
      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    } catch (error) {
      console.error("Error parsing locations:", error);
      // Fallback to single location if parsing fails
      setLocationsArray([{
        latitude: lat,
        longitude: lng
      }]);
      
      // Set fallback map region
      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [locationsParam, lat, lng, date, name]); // Added more dependencies to rerun when screen reopens

  console.log("Params received:", { date, latitude, longitude, name });
  console.log("Total locations:", locationsArray.length);

  if (loading || !mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#23a9da" />
        <Text>Cargando Información...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <CustomHeader tabName={`Ruta del día: ${name}`} />
      <ScrollView>
        <MapView
          style={styles.map}
          region={mapRegion} // Using region instead of initialRegion to update on rerender
        >
          {locationsArray.map((location, index) => {
            const isFirstOrLast = index === 0 || index === locationsArray.length - 1;
            const parsedLat = parseFloat(location.latitude) || lat;
            const parsedLng = parseFloat(location.longitude) || lng;
              return isFirstOrLast ? (
              <Marker
              key={index}
              coordinate={{
                latitude: parsedLat,
                longitude: parsedLng,
              }}
              title={`Ubicación ${index + 1}`}
              description={`Latitud: ${location.latitude}, Longitud: ${location.longitude}`}
              />
            ) : (
              <Marker
                key={index}
                coordinate={{
                  latitude: parsedLat,
                  longitude: parsedLng,
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

      <BottomSheet longitude={lng} latitude={lat} name={name} address={address} date={date}/>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 800,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryLocationMap;