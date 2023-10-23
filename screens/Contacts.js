
import React, { useEffect, useState } from 'react';
import { View, Text , FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


const ContactScreen=()=>{


const [contacts, setContacts]=useState();
useEffect(()=>{

  (async()=>{
    const {status}=await Contacts.requestPermissionsAsync();
    if(status==='granted')
    {
      const {data}=Contacts.getContactsAsync({

        fields:[Contacts.Fields.PhoneNumbers]
      })
      if(data.length>0) 
      {
        setContacts(data);
      } 
    }

  })
})
return(
  <FlatList
  style={{width:'100%', padding:20, marginTop:50}}
  data={contacts}
  keyExtractor={item=>item.id}
  renderItem={({item})=>{
  return(
    <View style={{borderBottomWidth:2}}>
       <Text style={{fontSize:20, fontWeight: 'bold'}}>{item.name} </Text>
       <Text style={{fontSize:17}}>, (item.PhoneNumbers && item.PhoneNumbers[0] && item.PhoneNumbers[0].number) </Text>
    </View>
  )
}}
  />

  
)
}
export default ContactScreen;
