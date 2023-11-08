import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.LastName],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactName}>
                {item.firstName} {item.lastName}
              </Text>
              {item.phoneNumbers ? (
                item.phoneNumbers.map((phoneNumber, keyy) => (
                  <Text key={keyy} style={styles.contactNumber}>
                    {phoneNumber.number}
                  </Text>
                ))
              ) : null}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 17,
  },
});

export default ContactScreen;
