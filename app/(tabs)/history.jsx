import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import HistoryCard from '../../components/historyCard';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const History = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    try {
      const token = await AsyncStorage.getItem('@user_token'); // Retrieve the token from AsyncStorage
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch('https://backend-xgio-delta.vercel.app/get-routes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      
      // Transform the data from object to array format
      const locationsArray = Object.entries(data).map(([date, dateData]) => {
        return {
          date: date,
          locations: dateData.locations || [],
        };
      });
      
      setLocations(locationsArray);
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

  return (
    <View className="flex-1 bg-gray-200">
      <ScrollView className="flex-1">
        {locations.length === 0 ? (
          <Text className="text-center text-2xl font-pbold text-gray-600 mt-10">No hay historial</Text>
        ) : (
          <>
            <Text className="text-center text-2xl font-pbold text-gray-600 mt-10 mb-10">Historial de Rutas</Text>
            {locations.map((routeData, index) => {
              return (
                <HistoryCard 
                  key={index} 
                  location={{
                    route_name: routeData.date,
                    timestamp: routeData.locations[0]?.timestamp || "Sin fecha",
                    latitude: routeData.locations[0]?.latitude,
                    longitude: routeData.locations[0]?.longitude,
                    locations: routeData.locations
                  }} 
                />
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default History;