import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView,StyleSheet,ScrollView, TouchableOpacity, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
  {
    name:'UserDatabase.db',
    location:'default'
  },
  ()=>{ },
   error=>{console.log(error)}
)


const RemoveService = ({navigation,route}) => {
  let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);
  const [id,setId]=useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_service',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems1(temp);
        }
      );
    });
  }, []);

  const DeleteService = (userId) => {
    db.transaction((tx) => {
      // Execute the SQL query to delete the user
      tx.executeSql('DELETE FROM user_service WHERE serviceId = ?', [userId], (txObj, resultSet) => {
        // Handle success (optional)
        Alert.alert('Service deleted successfully.');
        navigation.replace('Remove Service')
      },
      (txObj, error) => {
        // Handle error (optional)
        Alert.alert('Error deleting user:', error);
      });
    });
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', padding: 10,flexDirection:"row",height:80 }}>
         
         <View style={{width:110,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Service ID</Text>
         </View>

         <View style={{width:182,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Service Name</Text>
         </View>
       
        <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Remove</Text>
        </View>

      </View>
    );
  };

  let listItemView1 = (item) => {
    return (
      <View
        key={item.serviceId}
        style={{ backgroundColor: '#0D98BB', paddingLeft: 10,PaddingRight:10,flexDirection:"row",height:60 }}>
        
        <View style={{width:110,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.serviceId}</Text>
         </View>

        <View style={{width:182,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.serviceName}</Text>
         </View>

        <TouchableOpacity onPress={() => {
          Alert.alert('Warning!', 'Are you sure that you want to delete this', [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () => DeleteService(item.serviceId)},
          ]);
          
        }}
        style={{width:80,borderWidth:1,elevation:10,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>DELETE</Text>
        </TouchableOpacity>

      </View>
    );
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
          <FlatList style={{marginTop:70,position:"absolute"}}
            data={flatListItems1}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView1(item)}
          />
      </ScrollView>
    </SafeAreaView>
  );

 
  
};

export default RemoveService;

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