import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import HistoryCard from '../../components/historyCard'


const History = () => {
  // This is example data - replace with your actual data source
  const savedLocations = [
    { id: 1, name: 'Home', address: '123 Main St', date: '2023-11-20' },
    { id: 2, name: 'Work', address: '456 Office Ave', date: '2023-11-19' },
    // Add more locations as needed
  ];

  return (
    <View className="flex-1 bg-gray-200">
      <ScrollView className="flex-1">
        {savedLocations.length === 0 ? (
          <Text className="text-center text-2xl font-pbold text-gray-600 mt-10">No hay ubicaciones guardadas</Text>
        ) : (
          <>
            <Text className="text-center text-2xl font-pbold text-gray-600 mt-10 mb-10">Ubicaciones Guardadas</Text>
            {savedLocations.map((location) => (
              <HistoryCard key={location.id} location={location} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default History