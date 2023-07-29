import  React,{useEffect,useState } from 'react';
import { View,Text,StyleSheet, Dimensions,TouchableOpacity,ScrollView,FlatList,Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH=Dimensions.get("window").width;

const Customer = ({navigation,route}) => {
 const [email,setEmail]=useState('')
 const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    retrieveData();
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

  const data = [
    // array of data items here
     { id: 1, title: 'Manage Bills',Press:'Manage Bills' },
     { id: 2, title: 'View Bills',Press:'View Bills' },
     { id: 3, title: 'Request Service',Press:'Request Service' },
     { id: 4, title: 'View Service Status',Press:'View Service Status' },
     { id: 5, title: 'Contact Us',Press:'Contact Us' },
     { id: 6, title: 'Feedback',Press:'Feedback' },
  ];
  
 
  return (
    <View style={styles.container}>

        {/*---------------------------------------- Header & LogOut Button-----Start------------------------------------ */}
  <View style={styles.mainHeader}>
        <View style={{flexDirection:"row",width:WIDTH,justifyContent:"center"}}>
            <View>
            <Text style={styles.CustomText1}>Customer Dashboard</Text>
            </View>

            <TouchableOpacity style ={{position:"absolute",right:33}} onPress={() => setModalVisible(true)}>
            <Text style={styles.CustomText2}>︙</Text>
            </TouchableOpacity>

       </View>
 {/*---------------------------------------- Modal start----------------------------------------- */}

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

<View style={styles.centeredView}>
          <View style={styles.modalView}>

          <View style={styles.CustomBtn}>   

  <TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"#2a2a72",width:100,height:50,borderRadius:7,elevation:5}} 
   onPress={()=>{navigation.replace("Login")}}>
     <Text style={styles.CustomBtnText}>Log Out</Text>
  </TouchableOpacity> 


</View>

<TouchableOpacity style={styles.CloseBTnView} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.CustomBtnClose}>✖</Text>
</TouchableOpacity>

            </View>
            
            </View>

        </Modal>
    {/*---------------------------------------- Modal End----------------------------------------- */}
</View>
{/*---------------------------------------- Header & LogOut Button-----Start------------------------------------ */}


      <ScrollView>
        <View style={styles.innerContainer}>

          <Text style={styles.Text}>Logged in as: {email}</Text>
          <View style={styles.GridView}>
            <FlatList 
            data={data}
            numColumns={3}
            renderItem={({item})=>{
              return(
                <TouchableOpacity style={[styles.itemGridView]}
                onPress={()=>navigation.navigate(item.Press)}>
                  <Text style={styles.Text1}>{item.title}</Text>   
                </TouchableOpacity>
              )
            }}
            />

          </View>

        </View>
     
      </ScrollView>
 
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#0D98BB',
    
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  GridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  Text:{
  fontSize:17,
  fontWeight:"800",
  color:"#fff",
  marginBottom:30,
  marginTop:20
  },
  Text1:{
    fontSize:15,
    color:"#000",
    textAlign:"center"
  },
  itemGridView: {
    // Customize your item's styles here
    margin: 3,
    height: 100,
    width:119.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9FFFB',
    paddingHorizontal:5,
    borderRadius:5,
    elevation:5
  },
  mainHeader:{
    backgroundColor:"#47B6BC",
    height:52,
    justifyContent:"center",
    alignItems:"flex-end"
  },
  CustomBtnText:{
    fontSize:14,
    paddingHorizontal:2,
    fontFamily:"Helvetica-Bold",
    color:"#fff",
    textAlign:"center"
  },
  CustomText2:{
    fontSize:19,
    paddingHorizontal:2,
    fontFamily:"Helvetica-Bold",
    color:"#fff",
  },
  CustomText1:{
    fontSize:18,
    paddingHorizontal:2,
    fontFamily:"Helvetica-Bold",
    color:"#fff",
    textAlign:"center"
  },
  CustomBtnClose:{
    fontSize:20,
    color:"#1e454f",
    fontFamily:"Helvetica-Bold",
    textAlign:"center",
    marginTop:10
  },
  CloseBTnView:{
    top:0,
    position:"absolute",
    right:10,
  },
  centeredView: {
    flex: 1,
    marginTop: 40,
  },
  modalView: {
    marginLeft: 80,
    marginRight: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 50,
    paddingLeft:33,
    paddingRight:33,
    height:150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Customer;
