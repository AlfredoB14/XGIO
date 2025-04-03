import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const HistoryCard = ({ location }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/historyLocationMap',
      params: {
        date: location.date,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        address: location.address,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="p-4 bg-white m-2 rounded-lg shadow">
        <Text className="text-lg font-pbold">{location.name}</Text>
        <Text className="text-gray-600">{location.address}</Text>
        <Text className="text-gray-600">{location.date}</Text>
      </View>
    </Pressable>
  );
};

export default HistoryCard;