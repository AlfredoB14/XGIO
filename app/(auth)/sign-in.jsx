import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Función para almacenar el token en AsyncStorage
  const storeToken = async (token, name) => {
    try {
      await AsyncStorage.setItem('@user_token', token);
      await AsyncStorage.setItem('@user_name', name); // Guardar el nombre de usuario
    } catch (e) {
      console.error("Error saving token", e);
    }
  };

  // Función para el login
  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();

      if (data.token) {
        await storeToken(data.token, data.display_name);  // Guardar el token

        console.log("Login exitoso");
        
        // Redirigir al usuario a la pantalla de inicio
        router.replace('/(tabs)/home');
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Alert.alert("Error", "Ocurrió un error durante el login. Verifica tu conexión a internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-2xl font-pbold">Acceder a la Cuenta</Text>
            <Text className="text-gray-500 mt-2 font-pmedium text-center">
              ¡Bienvenido de nuevo! Inicia sesión para continuar.
            </Text>

            <View className="w-full mt-6">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                <TextInput
                  className="ml-3 flex-1 text-gray-600 font-pmedium"
                  placeholder="Tu dirección de correo electrónico"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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

            <Text className="text-[#23a9da] self-end mt-2 font-pmedium mb-6">
              ¿Olvidaste tu contraseña?
            </Text>

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
            <TouchableOpacity 
              className="w-full bg-[#23a9da] py-3 rounded-lg mt-4 items-center"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-lg font-psemibold">Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            {/* Skip Login Button
            <TouchableOpacity 
              className="w-full border-2 border-[#23a9da] py-3 rounded-lg mt-4 items-center"
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text className="text-[#23a9da] text-lg font-psemibold">Continuar sin iniciar sesión</Text>
            </TouchableOpacity> */}

            <Text className="text-gray-500 mt-4 font-pmedium">
              ¿Necesitas crear una cuenta? 
              <Link href="/sign-up">
                <Text className="text-[#23a9da] font-pmedium"> Regístrate</Text>
              </Link> 
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;