import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView,StyleSheet,ScrollView, TouchableOpacity, Alert } from 'react-native';
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

const RemoveAdmin = ({navigation,route}) => {
//   let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);
  const [email,setEmail]=useState('')

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE roleType="Admin" AND email="admin@gmail.com"',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems1(temp);
        }
      );
    });
    retrieveData();
  }, []);

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

  let listItemView1 = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB',padding:33 }}>
            
         <View style={{flexDirection:"row"}}>
         <Text style={styles.Text1}>✉  </Text>
         <Text style={styles.Text2}>: {item.email}</Text>
         </View>
       
        <View style={{flexDirection:"row"}}>
        <Text style={styles.Text3}>✆ </Text>
        <Text style={styles.Text4}>: {item.phoneNo}</Text>
        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#0D98BB' }}> 
     <View style={styles.innerContainer}>
        <Text style={styles.Text}>Logged in as: {email}</Text>
     </View>

     <View style={{paddingLeft:33}}>
     <Text style={styles.Text0}>Contact Us, </Text>
     </View>

      <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} >
       
          <FlatList style={{marginTop:-40}}
            data={flatListItems1}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView1(item)}
          />
      </ScrollView>
    </SafeAreaView>
  );

 
  
};

export default RemoveAdmin;

const styles = StyleSheet.create({
innerContainer: {
justifyContent: 'center',
alignItems: 'center',
 },

Text0:{
fontSize:17,
color:"#fff",
marginBottom:10,
marginTop:10,
     },

Text:{
fontSize:17,
fontWeight:"800",
color:"#fff",
marginBottom:30,
marginTop:20,
textAlign:"center",
 },

Text1:{
  fontFamily:"Helvetica-Bold",
  fontSize:35,
  fontWeight:"900",
  textAlign:"center",
  color:"#fff",
  marginBottom:1
    },
Text2:{
  fontSize:17,
  textAlign:"center",
  color:"#fff",
  marginTop:16,
  marginLeft:-7
},
Text3:{
    fontSize:30,
    textAlign:"center",
    fontWeight:"900",
    color:"#fff",
    marginBottom:1
  },
  Text4:{
    fontSize:17,
    textAlign:"center",
    color:"#fff",
    marginTop:11
  }
})