import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView,StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
  {
    name:'UserDatabase.db',
    location:'default'
  },
  ()=>{ },
   error=>{console.log(error)}
)


const RemoveServiceProvider = ({navigation,route}) => {
  let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user ',
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

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.25,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', padding: 10,borderWidth:0.50,flexDirection:"row" }}>
         
         <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c"}}>
         <Text style={styles.Text1}>Username</Text>
         </View>
       
         <View style={{width:100,borderWidth:1,backgroundColor:"#1e454c"}}>
         <Text style={styles.Text1}>Email</Text>
         </View>
       
        <View style={{width:110,borderWidth:1,backgroundColor:"#1e454c"}}>
        <Text style={styles.Text1}>Address</Text>
        </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#1e454c"}}>
        <Text style={styles.Text1}>Phone No</Text>
        </View>


      </View>
    );
  };

  let listItemView1 = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#0D98BB', paddingLeft: 10,PaddingRight:10,flexDirection:"row" }}>
        <View style={{width:80,borderWidth:1,backgroundColor:"#E9FFFB"}}>
        <Text style={styles.Text}>{item.username}</Text>
         </View>
       
         <View style={{width:100,borderWidth:1,backgroundColor:"#E9FFFB"}}>
         <Text style={styles.Text}>{item.email}</Text>
         </View>
       
        <View style={{width:110,borderWidth:1,backgroundColor:"#E9FFFB"}}>
        <Text style={styles.Text}>{item.address}</Text>
        </View>

        <View style={{width:80,borderWidth:1,backgroundColor:"#E9FFFB"}}>
        <Text style={styles.Text}>{item.phoneNo}</Text>
        </View>


      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#0D98BB' }}> 
      <View > 
          <FlatList
            data={flatListItems}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
          <FlatList style={{marginTop:-5}}
            data={flatListItems1}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView1(item)}
          />
      </View>
    </SafeAreaView>
  );

 
  
};

export default RemoveServiceProvider;

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