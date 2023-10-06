
import * as Contacts from 'expo-contacts';

async function solicitarPermisos() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permiso para acceder a los contactos denegado');
    return;
  }
}

async function obtenerContactos() {
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.Emails],
  });

  if (data.length > 0) {
    console.log(data);
  }
}

export { solicitarPermisos, obtenerContactos };
