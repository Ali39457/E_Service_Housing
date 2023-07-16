
import * as React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../mainScreens/SplashScreen';
import SelectScreen from '../mainScreens/SelectScreen';
import Register from '../mainScreens/Register';
import RecordDisplay from '../mainScreens/RecordDisplay';
import Login from '../mainScreens/Login';
import Admin from '../DashboardScreens/Admin';
import Customer from '../DashboardScreens/Customer';
import ServiceProvider from '../DashboardScreens/ServiceProvider';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.header}>  
      {/* <Stack.Screen name="Users Record" component={RecordDisplay} options={{headerTitleAlign:"center",headerBackVisible:false,}}/>  */}
      <Stack.Screen name="E-Service Housing App" component={SplashScreen} options={{headerTitleAlign:"center",headerBackVisible:false,}}/>
      <Stack.Screen name="Select" component={SelectScreen} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name="Admin Dasboard" component={Admin} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Customer Dashboard" component={Customer} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Service Provider Dashboard" component={ServiceProvider} options={{headerTitleAlign:"center"}}/>
      
       </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;


const styles = StyleSheet.create({
  header:{
    headerTitleAlign: 'center',
    headerStyle:{backgroundColor:"#47B6BC",color:"#fff"},
    headerTitleStyle: {color:"#fff",fontFamily:"Helvetica-Bold",fontWeight:"bold"},
    headerTintColor: '#fff'
  },
})
