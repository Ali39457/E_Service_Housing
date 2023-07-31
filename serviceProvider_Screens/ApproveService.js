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


const ApproveService = ({navigation,route}) => {

  /////////////////----States----////////////////////////////

  let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);
 /////////////////----useEffect----////////////////////////////

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM request_service',
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

     /////////////////----retrieveData----////////////////////////////

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

   /////////////////----retrieveData----////////////////////////////


  const UpdateStatus = (userId) => {
    db.transaction((tx) => {
      // Execute the SQL query to delete the user
      tx.executeSql('UPDATE request_service SET status = "Accepted" WHERE serviceId = ?', [userId], (txObj, resultSet) => {
        // Handle success (optional)
        Alert.alert('Request Accepted.');
        navigation.replace('Approve Service')
      },
      (txObj, error) => {
        // Handle error (optional)
        Alert.alert('Error deleting user:', error);
      });
    });
  }

     /////////////////------listItemView----////////////////////////////

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', padding: 10,borderWidth:0.50,flexDirection:"row",height:70 }}>
         
         <View style={{width:60,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>User ID</Text>
         </View>

         <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Username</Text>
         </View>
       
         <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Email</Text>
         </View>
       
        <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Address</Text>
        </View>

        <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Phone No</Text>
        </View>

        <View style={{width:100,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Service Type</Text>
        </View>

        <View style={{width:150,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Problem</Text>
        </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Status</Text>
        </View>

      </View>
    );
  };

     /////////////////------listItemView-1----////////////////////////////

  let listItemView1 = (item) => {
      if(item.status==='Pending'){
        return (
            <View
              key={item.serviceId}
              style={{ backgroundColor: '#0D98BB', paddingLeft: 10,PaddingRight:10,flexDirection:"row",height:50 }}>
              
              <View style={{width:60,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.serviceId}</Text>
               </View>
      
              <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.username}</Text>
               </View>
                  
               <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
               <Text style={styles.Text}>{item.email}</Text>
               </View>
             
              <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.address}</Text>
              </View>
      
              <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.phoneNo}</Text>
              </View>
      
              <View style={{width:100,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.serviceType}</Text>
              </View>
      
              <View style={{width:150,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.Text}>{item.reason}</Text>
              </View>
      
            <TouchableOpacity 
            onPress={()=>UpdateStatus(item.serviceId)}
            style={{width:80,borderWidth:1,elevation:10,backgroundColor:"#2a2a72",justifyContent:"center",alignItems:"center",borderColor:"#fff",borderWidth:2}}>
            <Text style={styles.Text1}>Accept</Text>
            </TouchableOpacity>
      
            </View>
          );
      }
      
  };


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#0D98BB' }}> 
      <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} > 
          <FlatList
            data={flatListItems}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
          <FlatList style={{marginTop:60,position:"absolute"}}
            data={flatListItems1}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView1(item)}
          />
      </ScrollView>
    </SafeAreaView>
  );

 
  
};

export default ApproveService;

const styles = StyleSheet.create({
Text:{
    fontFamily:"Helvetica-Bold",
      fontSize:15,
      textAlign:"center",
      },
Text1:{
  fontFamily:"Helvetica-Bold",
    fontSize:15,
    fontWeight:"800",
    textAlign:"center",
    color:"#fff",
    },
Text2:{
  fontSize:17,
  fontWeight:"800",
  color:"#fff",
  marginBottom:30,
  marginTop:20
}
})