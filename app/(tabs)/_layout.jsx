import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import CustomHeader from '../../components/header';
import "../../global.css"

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="currentlocation"
          options={{
            title: "Current Location",
            header: () => <CustomHeader tabName={"Ubicación Actual"} />,
          }}
        />
        <Tabs.Screen
          name="pointlocation"
          options={{
            title: "Point Location",
            header: () => <CustomHeader tabName={"Point Location"} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            header: () => <CustomHeader tabName={"Historial"} />,
          }}
        />
        <Tabs.Screen
          name="todaysroute"
          options={{
            title: "Today's Route",
            header: () => <CustomHeader tabName={"Ruta de Hoy "} />,
          }}
        />
        <Tabs.Screen
          name="historyLocationMap"
          options={{
            title: "History Location Map",
            headerShown: false
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout