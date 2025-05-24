import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, Heart, Tag } from 'lucide-react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const { colors } = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#4294ff',
            tabBarInactiveTintColor: colors.text,
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 10,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Inter-Medium',
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: 'Favorites',
              tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="tags"
            options={{
              title: 'Tags',
              tabBarIcon: ({ color, size }) => <Tag size={size} color={color} />,
            }}
          />
        </Tabs>
      </ThemeProvider>
    </AuthProvider>
  );
}