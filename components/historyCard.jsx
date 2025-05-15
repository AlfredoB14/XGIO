import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const HistoryCard = ({ location }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/historyLocationMap',
      params: {
        date: location.timestamp,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.route_name,
        locations: JSON.stringify(location.locations), // Pasar todas las ubicaciones como string JSON
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="p-4 bg-white m-2 rounded-lg shadow">
        <Text className="text-lg font-pbold">{location.route_name}</Text>
        <Text className="text-gray-600">{location.timestamp}</Text>
      </View>
    </Pressable>
  );
};

export default HistoryCard;