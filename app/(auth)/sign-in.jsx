import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

const SignIn = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-pbold">Acceder a la Cuenta</Text>
      <Text className="text-gray-500 mt-2 font-pmedium">¡Bienvenido de nuevo! Inicia sesión para continuar.</Text>

      <View className="w-full mt-6">
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
          <TextInput
            className="ml-3 flex-1 text-gray-600 font-pmedium"
            placeholder="Tu dirección de correo electrónico"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white mt-4">
          <TextInput
            className="ml-3 flex-1 text-gray-600 font-pmedium"
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <Text className="text-[#23a9da] self-end mt-2 font-pmedium mb-6" >¿Olvidaste tu contraseña?</Text>

      <View className="w-full flex-row items-center my-6">
        <View className="flex-1 h-0.5 bg-gray-200" />
        <Text className="mx-4 text-gray-500 font-pmedium">O continúa con</Text>
        <View className="flex-1 h-0.5 bg-gray-200" />
      </View>

      {/* Google Sign-In Button */}
      <TouchableOpacity className="w-full flex-row justify-center items-center border border-gray-300 py-3 rounded-lg mt-6 bg-white">
        <Image 
          source={require("../../assets/Google.png")}
          style={{ width: 24, height: 24 }}
          className="mr-2"
        />
        <Text className="text-gray-700 font-psemibold">Iniciar Sesión con Google</Text>
      </TouchableOpacity>

      {/* Regular Sign-In Button */}
      <Link href="/(tabs)/home" asChild>
        <TouchableOpacity className="w-full bg-[#23a9da] py-3 rounded-lg mt-4 items-center">
          <Text className="text-white text-lg font-psemibold">Iniciar Sesión</Text>
        </TouchableOpacity>
      </Link>

      <Text className="text-gray-500 mt-4 font-pmedium">
        ¿Necesitas crear una cuenta? <Text className="text-[#23a9da] font-pmedium">Regístrate</Text>
      </Text>
    </View>
  );
}
export default SignIn