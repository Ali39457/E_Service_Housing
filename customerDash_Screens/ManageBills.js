import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Image,ScrollView,Pressable, LogBox,Dimensions,FlatList} from 'react-native';
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


export default function ManageBills({navigation}) {

   
    const [accountTitle,setAccountTitle]=useState('')
    const [accountNo,setAccountNo]=useState('')
    const [amount,setAmount]=useState('')
    const [txID,setTxID]=useState('')
    const [billDate,setBillDate]=useState('')
    const [email,setEmail]=useState('')

////////////////////---bankType---/////////////////////////////
    const [Data,setData]=useState([
        {id:"1",title:"JazzCash"},
        {id:"2",title:"EasyPaisa"},
        {id:"3",title:"Askari Bank"},
        {id:"4",title:"HBL Bank"},
        {id:"5",title:"Other Bank"},
    ]);
    const [bankType,setBankType]=useState('')
    const [show,setshow]=useState(false) 
    
//////////////////////Display-billType///////////////////////////
const [Data1,setData1]=useState([
  {id:"1",title:"Water Bill"},
  {id:"2",title:"Electricity Bill"},
  {id:"3",title:"Gas Bill"},
]);
    const [billType,setBillType]=useState('')
    const [show1,setshow1]=useState(false) 
/////////////////////////////////////////////////
   


    useEffect(()=>{
      retrieveData();
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    },[])
  
    const retrieveData = async () => {
  
      try {
        await AsyncStorage.getItem("@ApiData").then(value=>{if(value!=null){
          var user=JSON.parse(value)
          setEmail(user)
        }})
        
      } catch (e) {
        console.log('Failed to fetch the data from storage!', e)
      }
  
    };


    let register_user = () => {

        if (!accountTitle) {
            alert('Please fill Account Title');
            return;
          }

          if (!accountNo) {
            alert('Please fill Account No');
            return;
          }

    
        if (!bankType) {
            alert('Please Select Bank');
            return;
          }

          if (!billType) {
            alert('Please Select Bill');
            return;
          }


      db.transaction(function (tx) {

        //  tx.executeSql(
        //     'DROP TABLE bill_table',
        //         [],
        //         (txObj, resultSet) => {
        //           // Success callback
        //           console.log('Table removed successfully!');
        //         },
        //         (txObj, error) => {
        //           // Error callback
        //           console.log('Error creating table:', error);
        //         }
        //       );

        // tx.executeSql(
        //     `CREATE TABLE IF NOT EXISTS bill_table (billId INTEGER PRIMARY KEY,accountTitle TEXT,
        //     accountNo VARCHAR,bankType TEXT,billType TEXT,billAmount INTEGER,txId INTEGER,billDate VARCHAR,email TEXT)`,
        //     [],
        //     (txObj, resultSet) => {
        //       // Success callback
        //       console.log('Table created successfully!');
        //     },
        //     (txObj, error) => {
        //       // Error callback
        //       console.log('Error creating table:', error);
        //     }
        //   );


        tx.executeSql(
          'INSERT INTO bill_table (accountTitle,accountNo,bankType,billType,billAmount,txId,billDate,email) VALUES (?,?,?,?,?,?,?,?)',
          [accountTitle,accountNo,bankType,billType,amount,txID,billDate,email ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Bill Details Added Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => console.log('Manage Bills'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
          }
        );
      });
    };

    
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
             value={accountTitle}
             placeholder="Account Title" 
             onChangeText={(value)=>setAccountTitle(value)} 
             />
       </View> 

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={accountNo}
             placeholder="Account No" 
             onChangeText={(value)=>setAccountNo(value)} 
             />
       </View> 

{/* ////////////////-----BANK TYPE--------///////////////// */}

       {
          bankType.length===0 ?
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}>Select Bank</Text>
       </TouchableOpacity>
          </View> :
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow(true)}>
       <Text style={styles.btnText}>{bankType}</Text>
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
                        // Alert.alert(item.title +" selected!")
                        setBankType(item.title)
                    }}>
                    <Text>{item.title}</Text>
                    </TouchableOpacity>  
                )
               
            }}
            />
          </View>:null
      }
      
{/* ////////////////-----BILL TYPE--------///////////////// */}

      {
          billType.length===0 ?
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow1(true)}>
       <Text style={styles.btnText}>Select Bill</Text>
       </TouchableOpacity>
          </View> :
          <View>
              <TouchableOpacity style={styles.BTn} onPress={()=>setshow1(true)}>
       <Text style={styles.btnText}>{billType}</Text>
       </TouchableOpacity>
          </View>
      }
       

      {
          show1 ? 
          <View style={styles.FlatListOuterView}>
         <FlatList
            data={Data1}
            renderItem={({item})=>{
                return ( 
                    <TouchableOpacity style={styles.FlatListView} onPress={()=>{
                        setshow1(false)
                        // Alert.alert(item.title +" selected!")
                        setBillType(item.title)
                    }}>
                    <Text>{item.title}</Text>
                    </TouchableOpacity>  
                )
               
            }}
            />
          </View>:null
      }

      <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={amount} keyboardType="numeric"
             placeholder="Bill Amount" 
             onChangeText={(value)=>setAmount(value)} 
             />
       </View>


       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={txID} keyboardType="numeric"
             placeholder="TxID" 
             onChangeText={(value)=>setTxID(value)} 
             />
       </View>

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={billDate}
             placeholder="DD-MM-YYYY" 
             onChangeText={(value)=>setBillDate(value)} 
             />
       </View> 

       <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}  
             value={email} keyboardType='email-address'
             placeholder="Email" 
             editable={false}
            //  onChangeText={(value)=>setEmail(value)} 

             />
       </View> 


      

   
            
       
<View style={{alignItems:"center", marginTop:20,marginBottom:20}}> 
<View style={styles.registerBtnView}>
{/* <LinearGradient  colors={['#61dff6','#0D98BB','#1e454c']} style={styles.linearGradient}> */}
        <TouchableOpacity onPress={()=>register_user()}
        style={{height:40,elevation:10,borderRadius:15,justifyContent:"center",alignItems:"center",width:"100%",borderColor:'#2a2a72',backgroundColor:"#2a2a72"}}
        >
       <Text style={styles.registerBTnText}>Submit</Text>
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
        marginTop:5,
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
        marginTop:5,
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
        marginBottom:20,
        marginTop:10
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