import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import OverviewScreen from './screens/OverviewScreen';
import RequirementsScreen from './screens/RequirementsScreen';
import StandardsScreen from './screens/StandardsScreen';
import RiskScreen from './screens/RiskScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import CitationsScreen from './screens/CitationsScreen';

// Import data
import { initializeData } from './data/projectData';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialize app data on first load
        await initializeData();
        setIsReady(true);
      } catch (error) {
        console.log('Initialization error:', error);
        setIsReady(true);
      }
    };

    initApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a5f" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#1e3a5f',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#f5f5f5',
            borderTopColor: '#ddd',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginTop: -5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Overview') {
              iconName = 'dashboard';
            } else if (route.name === 'Requirements') {
              iconName = 'list-alt';
            } else if (route.name === 'Standards') {
              iconName = 'library-books';
            } else if (route.name === 'Risk') {
              iconName = 'warning';
            } else if (route.name === 'Projects') {
              iconName = 'folder';
            } else if (route.name === 'Citations') {
              iconName = 'note';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Overview"
          component={OverviewScreen}
          options={{
            title: 'Overview',
          }}
        />
        <Tab.Screen
          name="Requirements"
          component={RequirementsScreen}
          options={{
            title: 'Requirements',
          }}
        />
        <Tab.Screen
          name="Standards"
          component={StandardsScreen}
          options={{
            title: 'Standards',
          }}
        />
        <Tab.Screen
          name="Risk"
          component={RiskScreen}
          options={{
            title: 'Risk',
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{
            title: 'Projects',
          }}
        />
        <Tab.Screen
          name="Citations"
          component={CitationsScreen}
          options={{
            title: 'Citations',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
