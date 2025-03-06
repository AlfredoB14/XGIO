import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6 space-y-5" >

        <Image source={require("../assets/logo.jpg")} className="w-48 h-48 mb-20"/>

        <Text className="text-3xl font-pbold mb-10" >Bienvenido/a a XGIO</Text>
        <Text className="text-xl text-center font-pregular mb-10">Guiando con amor y precisión: con nuestra aplicación, el cuidado no conoce límites.</Text>
        
        <Link href="/sign-in" asChild>
          <TouchableOpacity className="w-full bg-[#23a9da] py-3 rounded-lg items-center">
            <Text className="text-white text-lg font-psemibold">Empieza aquí</Text>
          </TouchableOpacity>
        </Link>
    </View>
  );
}
// 