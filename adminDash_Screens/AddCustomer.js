import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,ScrollView,Pressable, LogBox,Dimensions,FlatList} from 'react-native';
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


export default function AddCustomer({navigation}) {

    useEffect(()=>{
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    },[])


    let register_user = () => {
      console.log(username, password, email, address, phoneNo, roleType);
  
      if (!username) {
        alert('Please fill name');
        return;
      }
      if (!password) {
        alert('Please fill password');
        return;
      }
      if (!email) {
        alert('Please fill email');
        return;
      }

      if (!address) {
        alert('Please fill address');
        return;
      }

      if (!phoneNo) {
        alert('Please fill phoneNo');
        return;
      }

      if (!roleType) {
        alert('Please fill roleType');
        return;
      }
  
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (username, password, email, address, phoneNo, roleType) VALUES (?,?,?,?,?,?)',
          [username, password, email, address, phoneNo, roleType ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Customer Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Admin Dashboard'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
          }
        );
      });
    };

    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [email,setemail]=useState('')
    const [address,setaddress]=useState('')
    const [phoneNo,setphoneNo]=useState('')
    const [Data,setData]=useState()
    const [roleType,setroleType]=useState('Customer')
    const [show,setshow]=useState(false)  
   //--------------------------------Main Code------------------------------------//

  return (
      
    <View style={styles.container}>

{/* <LinearGradient  colors={['#47B6BC','#65C4BD','#47B6BC','#0D98BB']} style={styles.linearGradientBg}> */}
<View style={styles.linearGradientBg}>
<View>

<ScrollView showsVerticalScrollIndicator={false}>

<View style={styles.ProfileView}>

{/* <Text style={styles.Text}>USER REGISTERATION</Text> */}
<Image source={require('../assets/logo.jpg')} resizeMode="cover" style={styles.Image}></Image>
</View>

      <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={username} keyboardType="email-address"
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

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={email} keyboardType="email-address"
             placeholder="Email" 
             onChangeText={(value)=>setemail(value)} 
             />
       </View> 


       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={address} keyboardType="email-address"
             placeholder="Address" 
             onChangeText={(value)=>setaddress(value)} 
             />
       </View>

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={phoneNo} keyboardType="numeric"
             placeholder="Contact-No." 
             maxLength={11}
             onChangeText={(value)=>setphoneNo(value)} 
             />
       </View>

      {
          roleType.length===0 ?
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}>Please Select Role</Text>
       </TouchableOpacity>
          </View> :
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}>{roleType}</Text>
       </TouchableOpacity>
          </View>
      }
       

      {
          show ? 
          <View style={styles.FlatListOuterView}>
         <FlatList
            data={Data}
            renderItem={({item})=>{
                return ( 
                    <TouchableOpacity style={styles.FlatListView} onPress={()=>{
                        setshow(false)
                        Alert.alert(item.title +" selected!")
                        setroleType(item.title)
                    }}>
                    <Text>{item.title}</Text>
                    </TouchableOpacity>  
                )
               
            }}
            />
          </View>:null
      }
            
       
<View style={{alignItems:"center", marginTop:20,marginBottom:20}}> 
<View style={styles.registerBtnView}>
{/* <LinearGradient  colors={['#61dff6','#0D98BB','#1e454c']} style={styles.linearGradient}> */}
        <TouchableOpacity onPress={()=>register_user()}
        style={{height:40,elevation:10,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.registerBTnText}>REGISTER</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
</View>
</View>

</ScrollView>

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
                // elevation:30,
                backgroundColor:"#0D98BB",
                // shadowColor:"#E9FFFB",
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