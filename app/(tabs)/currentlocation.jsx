import { StyleSheet, Text, View, ScrollView } from 'react-native'
import MapView from 'react-native-maps'
import React from 'react'
import BottomSheet from '../../components/bottomSheet'

const CurrentLocation = () => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </ScrollView>

      <BottomSheet />      
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 800,
  },
})

export default CurrentLocation;