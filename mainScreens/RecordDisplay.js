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


const RecordDisplay = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
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
        style={{ backgroundColor: 'white', padding: 20,borderWidth:0.50 }}>
        <Text style={styles.Text}>Id: {item.user_id}</Text>
        <Text style={styles.Text}>Name: {item.username}</Text>
        <Text style={styles.Text}>Password: {item.password}</Text>
        <Text style={styles.Text}>Email: {item.email}</Text>
        <Text style={styles.Text}>Address: {item.address}</Text>
        <Text style={styles.Text}>phoneNo: {item.phoneNo}</Text>
        <Text style={styles.Text}>roleType: {item.roleType}</Text>

      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );

 
  
};

export default RecordDisplay;

const styles = StyleSheet.create({
  Text:{
    fontFamily:"Helvetica-Bold",
      fontSize:17,
      paddingHorizontal:33,
      },
})