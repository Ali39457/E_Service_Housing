import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React,{ useEffect } from 'react';
const Height=Dimensions.get("window").height;


export default function SplashScreen({navigation}) {

  useEffect(()=>{
     setTimeout(()=>{
     navigation.navigate('Select')
     },500)
  },[])
  
 //--------------------------------Main Code-----------------------------------//

  return (
    <View style={styles.container}>
{/* <LinearGradient  colors={['#47B6BC','#65C4BD','#47B6BC','#0D98BB']} style={styles.linearGradientBg}> */}
      <View style={styles.TextView}>
      <Image source={require('../assets/logo.jpg')} resizeMode="cover" style={styles.Image}></Image>
      <Text style={styles.Text}>Welcome to E-Service Housing App</Text>
      </View>
      {/* </LinearGradient> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#0D98BB",
  },
  TextView:{
   justifyContent:"center",
   alignItems:"center",
   height:Height-200
  },
  Text:{
    fontFamily:"Helvetica-Bold",
    fontSize:21,
    textAlign:"center",
    color:"#fff",
    width:"90%",
    fontWeight:"bold"
  },
    Image:{
      height:200,
      width:200,
      borderRadius:100,
      borderWidth:1,
      borderColor:"#4092a1",
      overflow:"hidden",
      marginBottom:30,
      marginTop:30
        },
  linearGradientBg: {
    flex: 1,
    },

})
