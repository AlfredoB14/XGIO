import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CustomHeader from '../../components/header';
import BottomSheet from '../../components/bottomSheet';

const HistoryLocationMap = () => {
  // Use useLocalSearchParams instead of useSearchParams
  const { date, latitude, longitude, name, address } = useLocalSearchParams();
  
  // Parse the latitude and longitude to numbers
  const lat = parseFloat(latitude) || 37.78825;
  const lng = parseFloat(longitude) || -122.4324;

  console.log("Params received:", { date, latitude, longitude });
  console.log("Parsed coordinates:", { lat, lng });

  return (
    <View className="flex-1 bg-white">
      <CustomHeader tabName={`Ubicación: ${name}`} />
      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title={`Location on ${date}`}
            description={`Latitude: ${lat}, Longitude: ${lng}`}
          />
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
});

export default HistoryLocationMap;