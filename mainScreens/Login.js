import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,ScrollView,Pressable, LogBox,Dimensions,FlatList} from 'react-native';
import React,{useEffect,useState,useRef} from 'react';
const HEIGHT=Dimensions.get('window').height;
import SQLite from 'react-native-sqlite-storage';


// Open or create the database
const db = SQLite.openDatabase
(
  { name: 'UserDatabase.db', location: 'default' }
);


export default function Login({navigation}) {

    useEffect(()=>{
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    },[])

    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
   
   
    const UserLogin=()=>{
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM table_user WHERE username = ? AND password = ?',
            [username, password],
            (tx, results) => {
              if (results.rows.length > 0) {
                // Successful login
                if(results.rows.item(0).roleType==='Admin'){
                    navigation.navigate('Admin Dasboard')
                    Alert.alert('Logged in as: '+ results.rows.item(0).email)
                }
                else if(results.rows.item(0).roleType==='Customer'){
                  navigation.navigate('Customer Dashboard')
                  Alert.alert('Logged in as: '+ results.rows.item(0).email)
                }
                else {
                  navigation.navigate('Service Provider Dashboard')
                  Alert.alert('Logged in as: '+ results.rows.item(0).email)
                }
              } 
              else {
                // Invalid credentials
                Alert.alert('Invalid Credentials');
              }
            },
            error => console.error('Error executing query:', error)
          );
        });
        
        
      } catch (error) {
        console.log(error)
      }
    }
    
     

  

   //--------------------------------Main Code------------------------------------//

  return (
      
    <View style={styles.container}>


<View style={styles.linearGradientBg}>
<View>

<ScrollView showsVerticalScrollIndicator={false}>

<View style={styles.ProfileView}>

<Text style={styles.Text}>USER LOGIN</Text>
<Image source={require('../assets/logo.jpg')} resizeMode="cover" style={styles.Image}></Image>
</View>

      <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={username}
             keyboardType="email-address"
             placeholder="Username" 
             onChangeText={(value)=>setusername(value)} 
             />
       </View> 

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={password}
             placeholder="Password" 
             secureTextEntry={true}
             onChangeText={(value)=>setpassword(value)} 
             />
       </View> 

     
          
       
<View style={{alignItems:"center", marginTop:20,marginBottom:20}}> 
<View style={styles.registerBtnView}>
        <TouchableOpacity onPress={UserLogin}
        style={{height:40,elevation:20,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.registerBTnText}>LOGIN</Text>
        </TouchableOpacity>
</View>
</View>

</ScrollView>

</View>



</View>


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
      marginTop:20,
      fontWeight:"bold"
      },
    TextInputView:{
        paddingLeft:1,
        paddingRight:1,
      },
      TextInput:{
        backgroundColor:"#fff",
        height:40,
        borderRadius:15,
        elevation:2,
        borderWidth:1,
        borderColor:"#F2F3F4",
        fontSize:18,
        fontFamily:"helvetica-light-587ebe5a59211",
        textAlign:"center",
        paddingHorizontal:10,
        marginTop:10,
      },
      BTn:{
        backgroundColor:"#fff",
        height:40,
        borderRadius:15,
        elevation:2,
        borderWidth:1,
        borderColor:"#F2F3F4",
        fontSize:18,
        fontFamily:"helvetica-light-587ebe5a59211",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:10,
        marginTop:10,
      },
      btnText:{
        textAlign:"center",
        fontSize:18,
        fontFamily:"helvetica-light-587ebe5a59211",
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
        FlatListOuterView:{
            backgroundColor:"#fff",
            borderRadius:10,
            marginTop:1
        },

        FlatListView:{
            backgroundColor:"#fff",
                height:40,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:10,
                borderWidth:1.5,
                margin:5,
                borderColor:"#F2F3F4"
               
            }
    
})