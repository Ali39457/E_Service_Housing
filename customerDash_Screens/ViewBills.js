import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView,StyleSheet,ScrollView } from 'react-native';
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


const ViewBills = ({navigation,route}) => {
  let [flatListItems, setFlatListItems] = useState([{id:1}]);
  let [flatListItems1, setFlatListItems1] = useState([]);
  const [email,setEmail]=useState('')

  useEffect(() => {
    retrieveData();

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM bill_table ',
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

  let listItemView = (item) => {
    return (
      <View
        key={item.billId}
        style={{ backgroundColor: '#0D98BB', padding: 10,borderWidth:0.50,flexDirection:"row",height:70 }}>
         
         <View style={{width:60,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Bill ID</Text>
         </View>

         <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Account Title</Text>
         </View>
       
         <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Account No.</Text>
         </View>

         <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
         <Text style={styles.Text1}>Bank Name</Text>
         </View>
       
        <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Bill Type</Text>
        </View>

        <View style={{width:100,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Bill Amount</Text>
        </View>

        <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Tx ID</Text>
        </View>

        <View style={{width:130,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Date</Text>
        </View>

        {/* <View style={{width:180,borderWidth:1,backgroundColor:"#1e454c",justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.Text1}>Email</Text>
        </View> */}

      </View>
    );
  };

  let listItemView1 = (item) => {
    if(item.email===email){
      return (
        <View
          key={item.billId}
          style={{ backgroundColor: '#0D98BB', paddingLeft: 10,PaddingRight:10,flexDirection:"row",height:50 }}>
          
          <View style={{width:60,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.billId}</Text>
           </View>
  
          <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.accountTitle}</Text>
           </View>
              
           <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
           <Text style={styles.Text}>{item.accountNo}</Text>
           </View>
  
           <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
           <Text style={styles.Text}>{item.bankType}</Text>
           </View>
         
          <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.billType}</Text>
          </View>
  
          <View style={{width:100,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.billAmount}</Text>
          </View>
  
          <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.txId}</Text>
          </View>
  
          <View style={{width:130,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.billDate}</Text>
          </View>
          {/* <View style={{width:180,borderWidth:1,backgroundColor:"#E9FFFB",justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.Text}>{item.email}</Text>
          </View> */}
  
  
        </View>
      );
    };
    }
    

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

export default ViewBills;

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