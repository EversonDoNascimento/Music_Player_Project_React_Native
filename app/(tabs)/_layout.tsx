import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#12141b",
          borderTopWidth: 0,
          padding: 20,
        },
        tabBarActiveTintColor: "#ffd93d",
      }}
    >
      <Tabs.Screen
        name="list"
        options={{
          title: "Músicas",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="music" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          title: "Player",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="play" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
