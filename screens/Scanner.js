import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default function Scanner(){
    const[hasPermission, setHasPermission]=useState(null);
    const[scanned, setScanned]=useState(false);

    useEffect (()=>{
        (async()=>{
            const{ status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status=='granted');
        })();
},[]);

const handleBarCodeScanned = ({type,data}) => {
    setScanned(true);
    alert(`Bar Code With Type ${type}and data ${Linking.openURL(`${data}`)}has been scanned`);
}
if (hasPermission=== null) {
    return <text>Requesting for Camera Permission</text>
}
if (hasPermission===false) {
    return <text>No access to Camera</text>
}

return(
    <view style={styles.container}>
        <BarCodeScanner
            onBarCodeScanner={scanned ? undefined: handleBarCodeScanned}
            style={stylesheet.absoluteFillObject}
        />
        {sca}
    </view>
)

}
