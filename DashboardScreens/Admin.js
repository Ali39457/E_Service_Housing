import  React,{useEffect,useState } from 'react';
import { View,Text,StyleSheet, Dimensions,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Admin = ({navigation,route}) => {
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
     { id: 1, title: 'Add Admin',Press:'Add Admin' },
     { id: 2, title: 'Remove Admin',Press:'Remove Admin' },
     { id: 3, title: 'Add Service',Press:'Add Service' },
     { id: 4, title: 'Remove Service',Press:'Remove Service' },
     { id: 5, title: 'Add Customer',Press:'Add Customer' },
     { id: 6, title: 'Remove Customer',Press:'Remove Customer' },
     { id: 7, title: 'Add Service Provider',Press:'Add ServiceProvider' },
     { id: 8, title: 'Remove Service Provider',Press:'Remove Service Provider' },
     { id: 9, title: 'Active Users',Press:'Active Users' },
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

export default Admin;
