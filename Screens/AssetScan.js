import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Button, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

export default function AssetScanScreen() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scangetdata, setScanGetData] = useState("");
  const [data, setData] = useState([]);
 


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  // useEffect(() => {
  //   if (data !== null || data !== "") {
  //     GetDataAssetApi()
  //   }

  // }, [scandata])



  // ........... Begin:ApiCall ............... //
  const GetDataAssetApi = async () => {
    try {

      // Live...   const response = await fetch(Contants.API_URL + 'EmployeeInfo/FiscalYearPeriodList?fiscalyearId=' + maxfiscalid, {

      // const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalYearPeriodList', {

      const response = await fetch('https://reports.idc.net.pk/OrbitEmpServiceStg/api/FixedAsset/V1/FixedAssetDetailBy', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Barcode : scangetdata

          Barcode: "00001-00001"

        })
      });
      const responseObj = await response.json();
     // console.log(responseObj)

      if (responseObj.statusCode == 200) {
        let payload = JSON.parse(responseObj.payload);
        console.log('dataaaaaa', payload)
        if (payload.length > 0) {
          setData(payload);
          // setShowModal(true);
        }

      }
    }
    catch (e) {
      console.log('MonthError', e);
    }
  }
  //........... End:ApiCall ............... //









  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanGetData(data);
    console.log("Scannnnnnn", scangetdata)
    const { navigate } = navigation;
    navigate('AssetDetailsScreen', {Scandata: data})
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // const _Back = () => {
  //   return (
  //     setShowModal(true)
  //   )
  // }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#008080' barStyle="light-content" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}

      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});