import { Platform, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" >
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-[#23a9da] h-96 p-6 rounded-b-3xl shadow-md shadow-black" style={{ paddingTop: Platform.OS === "android" ? 70 : 40 }} > 
          <View className="flex-row justify-between">
            <Text className="text-lg font-pbold text-white">Good Morning, Aldri</Text>
            <Text className="font-psemibold text-white">Rabu, 4 Maret 2020</Text>
          </View>
          <View className="items-center mt-16">
            <Image
              source={{ uri: "https://via.placeholder.com/80" }}
              className="w-32 h-32 rounded-full bg-gray-300"
            />
            {/* <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-full mt-10">
              <Text className="text-black font-semibold">View profile</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Info Section */}
        <View className="m-10 p-4 bg-gray-100 rounded-lg shadow-md shadow-black">
          <Text className="text-gray-700 text-center font-pregular">
            Heyy Travelers! Check out our map guidance with user tracker, 
            so you can find your destination with no sweat :)
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row flex-wrap justify-center gap-10 px-4 ">

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
          <View className="flex-col items-center gap-4">
            <Image 
              source={require("../../assets/PointLocation.png")}
              style={{ width: 80, height: 80 }}
              className="mr-2"
            />
            <Link href="/pointlocation" asChild>
              <TouchableOpacity className="bg-[#23a9da] p-4 rounded-lg w-44 shadow-md shadow-black">
                <Text className="text-white text-center font-pbold">Point Location</Text>
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
        </View>
      </ScrollView>

      <StatusBar barStyle='light-content' />
    </SafeAreaView>
  );
}

export default Home
