import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
            <Text className="text-2xl font-pbold">Crear una Cuenta</Text>
            <Text className="text-gray-500 mt-2 font-pmedium text-center">
              Únete a nuestra comunidad registrándote con tu información.
            </Text>

            <View className="w-full mt-6">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                <TextInput
                  className="ml-3 flex-1 text-gray-600 font-pmedium"
                  placeholder="Nombre Completo"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white mt-4">
                <TextInput
                  className="ml-3 flex-1 text-gray-600 font-pmedium"
                  placeholder="Tu dirección de correo electrónico"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white mt-4">
                <TextInput
                  className="ml-3 flex-1 text-gray-600 font-pmedium"
                  placeholder="Crea una contraseña"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-white mt-4">
                <TextInput
                  className="ml-3 flex-1 text-gray-600 font-pmedium"
                  placeholder="Confirma tu contraseña"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <View className="w-full flex-row items-center my-6">
              <View className="flex-1 h-0.5 bg-gray-200" />
              <Text className="mx-4 text-gray-500 font-pmedium">O regístrate con</Text>
              <View className="flex-1 h-0.5 bg-gray-200" />
            </View>

            {/* Google Sign-Up Button */}
            <TouchableOpacity className="w-full flex-row justify-center items-center border border-gray-300 py-3 rounded-lg mt-6 bg-white">
              <Image 
                source={require("../../assets/Google.png")}
                style={{ width: 24, height: 24 }}
                className="mr-2"
              />
              <Text className="text-gray-700 font-psemibold">Registrarse con Google</Text>
            </TouchableOpacity>

            {/* Regular Sign-Up Button */}
            <TouchableOpacity className="w-full bg-[#23a9da] py-3 rounded-lg mt-4 items-center">
              <Text className="text-white text-lg font-psemibold">Registrarse</Text>
            </TouchableOpacity>

            <Text className="text-gray-500 mt-4 font-pmedium">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/sign-in">
                <Text className="text-[#23a9da] font-pmedium">Inicia sesión</Text>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
