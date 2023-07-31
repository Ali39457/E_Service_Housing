
import * as React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../mainScreens/SplashScreen';
import SelectScreen from '../mainScreens/SelectScreen';
import Register from '../mainScreens/Register';
import RecordDisplay from '../adminDash_Screens/RecordDisplay';
import Login from '../mainScreens/Login';
import Admin from '../DashboardScreens/Admin';
import Customer from '../DashboardScreens/Customer';
import ServiceProvider from '../DashboardScreens/ServiceProvider';
import AddAdmin from '../adminDash_Screens/AddAdmin';
import AddCustomer from '../adminDash_Screens/AddCustomer';
import AddServiceProvider from '../adminDash_Screens/AddServiceProvider';
import RemoveAdmin from '../adminDash_Screens/RemoveAdmin';
import RemoveCustomer from '../adminDash_Screens/RemoveCustomer';
import RemoveServiceProvider from '../adminDash_Screens/RemoveServiceProvider';
import AddService from '../adminDash_Screens/AddService';
import RemoveService from '../adminDash_Screens/RemoveService';
import ContactUs from '../mainScreens/ContactUs';
import FeedBack from '../mainScreens/FeedBack';
import FeedbackDisplay from '../adminDash_Screens/FeedbackDisplay';
import RequestService from '../customerDash_Screens/RequestService';
import ManageBills from '../customerDash_Screens/ManageBills';
import ViewBills from '../customerDash_Screens/ViewBills';
import ViewServiceStatus from '../customerDash_Screens/ViewServiceStatus';
import DisplayBills from '../adminDash_Screens/DisplayBills';
import ApproveService from '../serviceProvider_Screens/ApproveService';
import RemoveServiceReq from '../adminDash_Screens/RemoveServiceReq';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.header}>  
     
      <Stack.Screen name="E-Service Housing App" component={SplashScreen} options={{headerTitleAlign:"center",headerBackVisible:false,}}/>
      <Stack.Screen name="Select" component={SelectScreen} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerTitleAlign:"center",headerBackVisible:false,headerShown:false}}/>
      

      <Stack.Screen name="Admin Dashboard" component={Admin} options={{headerTitleAlign:"center",headerShown:false}}/>
      <Stack.Screen name="Customer Dashboard" component={Customer} options={{headerTitleAlign:"center",headerShown:false}}/>
      <Stack.Screen name="Service Provider Dashboard" component={ServiceProvider} options={{headerTitleAlign:"center",headerShown:false}}/>
      
      <Stack.Screen name="Add Admin" component={AddAdmin} options={{headerTitleAlign:"center"}}/> 
      <Stack.Screen name="Add Customer" component={AddCustomer} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Add Service Provider" component={AddServiceProvider} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Remove Admin" component={RemoveAdmin} options={{headerTitleAlign:"center"}}/> 
      <Stack.Screen name="Remove Customer" component={RemoveCustomer} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Remove Service Provider" component={RemoveServiceProvider} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Active Users" component={RecordDisplay} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="View Feedback" component={FeedbackDisplay} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Add Service" component={AddService} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Remove Service" component={RemoveService} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="View Users Bill" component={DisplayBills} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Remove Service Request" component={RemoveServiceReq} options={{headerTitleAlign:"center"}}/>

      <Stack.Screen name="Contact Us" component={ContactUs} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Feedback" component={FeedBack} options={{headerTitleAlign:"center"}}/>

      <Stack.Screen name="Manage Bills" component={ManageBills} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="View Bills" component={ViewBills} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="View Service Status" component={ViewServiceStatus} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Request Service" component={RequestService} options={{headerTitleAlign:"center"}}/>

      <Stack.Screen name="Approve Service" component={ApproveService} options={{headerTitleAlign:"center"}}/>


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
