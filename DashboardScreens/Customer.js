import  React,{useEffect,useState } from 'react';
import { View,Text,StyleSheet, Dimensions,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Customer = ({navigation,route}) => {
 const [email,setEmail]=useState('')

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
});

export default Customer;
