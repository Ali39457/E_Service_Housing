import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,Pressable,Dimensions} from 'react-native';
import React,{useEffect,useState,useRef} from 'react';
const HEIGHT=Dimensions.get('window').height;


import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
  {
    name:'UserDatabase.db',
    location:'default'
  },
  ()=>{ },
   error=>{console.log(error)}
)

export default function SelectScreen({navigation}) {

useEffect(() => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), password VARCHAR(20), email VARCHAR(50), address VARCHAR(255), phoneNo INT(12),roleType VARCHAR(50))',
            []
          );
        }
      }
    );
  });
}, []);
   //--------------------------------Main Code------------------------------------//

  return (
      
    <View style={styles.container}>
{/* <LinearGradient  colors={['#47B6BC','#65C4BD','#47B6BC','#0D98BB']} style={styles.linearGradientBg}> */}
<View style={styles.linearGradientBg}>
<View>
<View style={styles.ProfileView}>
<Text style={styles.Text}>E-Service Housing App</Text>
<Image source={require('../assets/logo.jpg')} resizeMode="cover" style={styles.Image}></Image>
</View>

<View style={{alignItems:"center", marginTop:20,marginBottom:20}}> 
<View style={styles.registerBtnView}>
{/* <LinearGradient  colors={['#61dff6','#0D98BB','#1e454c']} style={styles.linearGradient}> */}
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}
        style={{height:40,elevation:20,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.registerBTnText}>REGISTER</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
</View>
</View>

<View style={{alignItems:"center",marginBottom:20}}> 
<View style={styles.LoginBtnView}>
{/* <LinearGradient  colors={['#61dff6','#0D98BB','#61dff6']} style={styles.linearGradient}> */}
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}
        style={{height:40,elevation:20,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.LoginBTnText}>LOGIN</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
</View>
</View>
    

</View>



</View>

{/* </LinearGradient> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
         flex:1,
         padding:20,
         justifyContent:"center",
         backgroundColor:"#0D98BB",
         
    },
    mobileView:{
      height:HEIGHT,
      paddingTop:33,
      paddingBottom:33,
      justifyContent:"center"
    },
    innerMobileView:{
      elevation:10,
      shadowColor:"#E9FFFB",
      borderColor:"#1e454c",
    },
    Text:{
      fontFamily:"Helvetica-Bold",
      fontSize:21,
      textAlign:"center",
      color:"#fff",
      marginTop:50,
      fontWeight:"bold"
      },
    TextInputView:{
        paddingLeft:23,
        paddingRight:23,
      },
      TextInput:{
        backgroundColor:"#fff",
        height:50,
        borderRadius:15,
        elevation:2,
        borderWidth:1,
        borderColor:"#F2F3F4",
        fontSize:18,
        fontFamily:"helvetica-light-587ebe5a59211",
        textAlign:"center",
        paddingHorizontal:10,
        marginTop:10
      },
      ProfileView:{
        justifyContent:"center",
        alignItems:"center"
      },
      LoginBtnView:{
        height:40,
        width:"100%",
        paddingLeft:23,
        paddingRight:23,
      },
      LoginBTnText:{
        fontSize:14,
        paddingHorizontal:2,
        width:"100%",
        fontFamily:"Helvetica-Bold",
        color:"#fff",
        textAlign:"center"
    },
    registerBtnView:{
        height:40,
        width:"100%",
        paddingLeft:23,
        paddingRight:23,
      },
      registerBTnText:{
        fontSize:14,
        paddingHorizontal:2,
        width:"100%",
        fontFamily:"Helvetica-Bold",
        color:"#fff",
        textAlign:"center"
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
        linearGradient: {
            flex: 1,
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
            },
        linearGradientBg: {
                flex: 1,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:30,
                elevation:30,
                backgroundColor:"#0D98BB",
                shadowColor:"#E9FFFB",
                },
    
})