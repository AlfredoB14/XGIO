import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const HistoryCard = ({ location }) => (
    <View className="bg-white p-4 m-2 rounded-lg shadow-md flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-pbold">{location.name}</Text>
        <Text className="text-gray-600 font-pregular">{location.address}</Text>
        <Text className="text-gray-500 font-pregular">{location.date}</Text>
      </View>
      <Ionicons name="compass" size={32} color="#4B5563" />
    </View>
  );

export default HistoryCard
