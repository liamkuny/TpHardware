import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';

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
        const isEmergencyContact =
          item.phoneNumbers &&
          item.phoneNumbers.some((phoneNumber) => phoneNumber.label === 'emergency');

        return (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.contactNumber}>
                {item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}
              </Text>
            </View>
            {isEmergencyContact && (
              <Ionicons name="ios-alert" size={24} color="red" style={styles.emergencyIcon} />
            )}
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
  emergencyIcon: {
    alignSelf: 'center',
  },
});

export default ContactScreen;
