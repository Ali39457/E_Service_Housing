import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,Button,ScrollView,Pressable, LogBox,Dimensions,FlatList} from 'react-native';
import React,{useEffect,useState,useRef} from 'react';
const HEIGHT=Dimensions.get('window').height;
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase(
  {
    name:'UserDatabase.db',
    location:'default'
  },
  ()=>{ },
   error=>{console.log(error)}
)


export default function RequestService({navigation}) {

 
  const [username,setusername]=useState('')
  const [email,setemail]=useState('')
  const [address,setaddress]=useState('')
  const [phoneNo,setphoneNo]=useState('')
  const [reason,setReason]=useState('')

  const [flatListItems1, setFlatListItems1] = useState([]);
  const [serviceType,setServiceType]=useState('')
  const [show,setshow]=useState(false)  

  const [flatListItems2, setFlatListItems2] = useState([]);

  const [emailCheck,setEmailCheck]=useState('')

  useEffect(() => {

    //-----------------------------Get Services --------------------//

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_service ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems1(temp);
        }
      );
    });

     //-----------------------------Get Logged-in user data from DATABASE--------------------//

     db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems2(temp);
        }
      );
    });
    
     //-----------------------------Get Logged-in user's email from AsyncStorage--------------------//

    retrieveData();
  }, []);

    //-----------------------------retrieveData Function--------------------//

  const retrieveData = async () => {

    try {
      await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
        var user=JSON.parse(value)
        setEmailCheck(user)
      }})
      
    } catch (e) {
      console.log('Failed to fetch the data from storage!', e)
    }

  };



    // let request_service = () => {
    //   console.log(username, email, address, phoneNo, serviceType);
  
    //   db.transaction(function (tx) {
    //     tx.executeSql(
    //       'INSERT INTO table_user (username, password, email, address, phoneNo, serviceType) VALUES (?,?,?,?,?,?)',
    //       [username, password, email, address, phoneNo, serviceType ],
    //       (tx, results) => {
    //         console.log('Results', results.rowsAffected);
    //         if (results.rowsAffected > 0) {
    //           Alert.alert(
    //             'Success',
    //             'Admin Registered Successfully',
    //             [
    //               {
    //                 text: 'Ok',
    //                 onPress: () => navigation.navigate('Admin Dashboard'),
    //               },
    //             ],
    //             { cancelable: false }
    //           );
    //         } else alert('Registration Failed');
    //       }
    //     );
    //   });
    // };

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

<FlatList
data={flatListItems2}
renderItem={({item})=>{
  if(item.email===emailCheck)
  {
    return(
<View>
      <View style={styles.TextInputView}>
          <TextInput style={styles.TextInput}  
           value={item.username}
           placeholder="Username" 
           editable={false}
           />
      </View> 


      <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={item.email}
             placeholder="Email" 
             editable={false}
             />
       </View> 


       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={item.address}
             placeholder="Address" 
             editable={false}
             />
       </View>

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={String(item.phoneNo)} 
             placeholder="Contact-No." 
             editable={false}
             />
       </View>

       {/* ////////////////-------Service Type-----Start-----/////////////////// */}

      {
          serviceType.length===0 ?
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}> Select Service</Text>
       </TouchableOpacity>
          </View> :
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}>{serviceType}</Text>
       </TouchableOpacity>
          </View>
      }
       

      {
          show ? 
          <View style={styles.FlatListOuterView}>
         <FlatList
            data={flatListItems1}
            renderItem={({item})=>{
                return ( 
                    <TouchableOpacity style={styles.FlatListView} onPress={()=>{
                        setshow(false)
                        Alert.alert(item.serviceName +" selected!")
                        setServiceType(item.serviceName)
                    }}>
                    <Text>{item.serviceName}</Text>
                    </TouchableOpacity>  
                )
            }}
            />
          </View>:null
      }

{/* ////////////////-------Service Type-----End-----/////////////////// */}

      <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput2}  
             value={reason}
             placeholder="Write Problem here" 
             onChangeText={(value)=>setReason(value)} 
             />
       </View>

<View style={{alignItems:"center", marginTop:10,marginBottom:20}}> 
<View style={styles.registerBtnView}>
{/* <LinearGradient  colors={['#61dff6','#0D98BB','#1e454c']} style={styles.linearGradient}> */}
        <TouchableOpacity onPress={()=>{
          console.log(item.username, item.email, item.address, item.phoneNo, serviceType,reason);
  
          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO table_user (username, password, email, address, phoneNo, serviceType) VALUES (?,?,?,?,?,?)',
              [username, password, email, address, phoneNo, serviceType,'Pending' ],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Admin Registered Successfully',
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
        }}
        style={{height:40,elevation:10,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.registerBTnText}>REGISTER</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
</View>
</View>


</View>
      
        )
  }

}}/>

       


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
         padding:10,
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
        color:"#000"
      },
      TextInput2:{
        backgroundColor:"#fff",
        height:80,
        borderRadius:15,
        elevation:2,
        borderWidth:1,
        borderColor:"#F2F3F4",
        fontSize:18,
        fontFamily:"helvetica-light-587ebe5a59211",
        textAlign:"center",
        paddingHorizontal:10,
        marginTop:10,
        color:"#000"
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
        color:"#000"
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