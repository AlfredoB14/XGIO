import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ tabName }) => {
  return (
    <SafeAreaView>
      <View className="flex-row gap-10 items-center h-20 bg-[#23a9da]">
        <Link href="/home" className="pl-4">
          <Ionicons name="arrow-back" size={28} color="white" />
        </Link>
        <Text className="text-white text-xl font-pbold">{tabName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;