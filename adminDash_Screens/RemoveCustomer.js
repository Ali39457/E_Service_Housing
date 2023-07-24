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


const RemoveCustomer = ({navigation,route}) => {
  let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);
  const [id,setId]=useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE roleType="Customer"',
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

  const DeleteUser = (userId) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM table_user WHERE user_id = ? AND roleType="Customer"', [userId], (txObj, resultSet) => {
        // Handle success 
        Alert.alert('Customer deleted successfully.');
        navigation.replace('Remove Customer')
      },
      (txObj, error) => {
        // Handle error 
        Alert.alert('Error deleting user:', error);
      });
    });
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', padding: 10,borderWidth:0.50,flexDirection:"row",height:70 }}>
         
         <View style={{width:60,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>User ID</Text>
         </View>

         <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Username</Text>
         </View>
       
         <View style={{width:120,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Email</Text>
         </View>
       
        <View style={{width:120,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Address</Text>
        </View>

        <View style={{width:100,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Phone No</Text>
        </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Role</Text>
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
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', paddingLeft: 10,PaddingRight:10,flexDirection:"row",height:50 }}>
        
        <View style={{width:60,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.user_id}</Text>
         </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.username}</Text>
         </View>
            
         <View style={{width:120,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text}>{item.email}</Text>
         </View>
       
        <View style={{width:120,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.address}</Text>
        </View>

        <View style={{width:100,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.phoneNo}</Text>
        </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text}>{item.roleType}</Text>
        </View>

        <TouchableOpacity onPress={() => {
          Alert.alert('Warning!', 'Are you sure that you want to delete this', [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () => DeleteUser(item.user_id)},
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

export default RemoveCustomer;

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