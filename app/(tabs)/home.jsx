import { Platform, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native'
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('@user_name'); // Recuperamos el nombre del usuario
        if (name) {
          setUserName(name);
        }
      } catch (e) {
        console.error("Error fetching user data", e);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('@user_token'); // Limpiar el token
      await AsyncStorage.removeItem('@user_name'); // Limpiar el nombre de usuario
      console.log("Sesión cerrada con éxito");
      router.replace('/sign-in'); 
    } catch (e) {
      console.error("Error al cerrar sesión", e);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white" >
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-[#23a9da] h-72 p-6 rounded-b-3xl shadow-md shadow-black" > 
          <View className="flex-row justify-between">
            <Text className="text-lg font-pbold text-white">{userName}</Text>
            <TouchableOpacity onPress={handleSignOut}>
              <Image
                source={require("../../assets/icons/logout.png")}
                style={{ width: 30, height: 30 }}
                className="mr-2"
              />
            </TouchableOpacity>
          </View>
          <View className="items-center mt-10">
            <Image
              source={require("../../assets/images.png")}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md shadow-black"
            />
            {/* <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-full mt-10">
              <Text className="text-black font-semibold">View profile</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Info Section */}
        <View className="m-10 p-4 bg-gray-100 rounded-lg shadow-md shadow-black">
          <Text className="text-gray-700 text-center font-pregular">
            Bienvenido/a a XGIO, elige una de las opciones para comenzar a navegar por la aplicación.
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row flex-wrap justify-center gap-10 px-4 ">

        <View className="flex-col items-center gap-4">
            <Image 
              source={require("../../assets/TodaysRoute.png")}
              style={{ width: 80, height: 80 }}
              className="mr-2"
            />
            <Link href="/todaysroute" asChild>
              <TouchableOpacity className="bg-[#23a9da] p-4 rounded-lg w-44 shadow-md shadow-black">
                <Text className="text-white text-center font-pbold">Ruta de hoy</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-col items-center gap-4">
            <Image 
              source={require("../../assets/CurrentLocation.png")}
              style={{ width: 80, height: 80 }}
              className="mr-2"
            />
            <Link href="/currentlocation" asChild>
              <TouchableOpacity className="bg-[#23a9da] p-4 rounded-lg w-44 shadow-md shadow-black">
                <Text className="text-white text-center font-pbold">Ubicación Actual</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View className="flex-row flex-wrap justify-center gap-10 px-4 mt-10">
          <View className="flex-col items-center gap-4">
            <Image 
              source={require("../../assets/History.png")}
              style={{ width: 80, height: 80 }}
              className="mr-2"
            />
            <Link href="/history" asChild>
              <TouchableOpacity className="bg-[#23a9da] p-4 rounded-lg w-44 shadow-md shadow-black">
                <Text className="text-white text-center font-pbold">Historial</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
