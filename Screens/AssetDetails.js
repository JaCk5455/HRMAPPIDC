import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import HomeStackScreen from '../Navigatorss/HomeStack'
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function AssetDetailsScreen({ navigation, route }) {


    const [data, setData] = React.useState([]);
    const [loading, IsLoading] = React.useState(false);

    useEffect(() => {

        route.params.Scandata.length
        if (route.params.Scandata.length > 0) {
            GetDataAssetApi()
            console.log("Data after scan", route.params.Scandata);
        }
        else {
            <View>
                <Text style={{ color: 'red' }}>
                    {
                        Alert.alert(
                            "Alert",
                            "No Record Found.",
                            [

                                { text: "OK", onPress: () => { navigation.navigate('AssetScanScreen') } }
                            ],
                            { cancelable: false }
                        )
                    }
                </Text>
            </View>
        }

    }, [])




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
                    Barcode: route.params.Scandata

                    //   Barcode: "00001-00001"


                })
            });
            const responseObj = await response.json();
            // console.log(responseObj)

            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);
                console.log('dataaaaaa', payload)
                if (payload.length > 0) {
                    setData(payload);
                    IsLoading(false);

                }
                else {
                    Alert.alert(
                        "Alert",
                        "No Record Found.",
                        [

                            { text: "OK", onPress: () => { navigation.navigate('AssetScanScreen') } }
                        ],
                        { cancelable: false }
                    )
                }

            }

        }
        catch (e) {
            console.log('Asset Api Error', e);
        }
    }
    //........... End:ApiCall ............... //



    return (

        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                margin: wp("3%"), borderWidth: 1, borderRadius: 8, borderColor: '#D3D3D3',
                borderWidth: 1,
                shadowOffset: { width: 0, height: 2 },
                shadowColor: 'black',
                shadowOpacity: 0.1,
                elevation: 4,
                padding: wp('4%'),
                shadowRadius: 3, backgroundColor:'#D3D3D3'
            }}>


<View style={{justifyContent:'center', alignItems:'center'}}>

<Text style={{fontWeight:'bold', fontSize:wp("4%")}}>
            {
                data.length > 0 ? (data[0].Name == "" || data[0].Name == null ? "N/A" : data[0].Name) : "N/A"
            }
        </Text>

        <Text style={{fontSize:wp("3%"), marginTop:wp("2%")}}>
            {
                data.length > 0 ? (data[0].Specifictaion == "" || data[0].Specifictaion == null ? "N/A" : data[0].Specifictaion) : "N/A"
            }
        </Text>

</View>

                <View style={{ flexDirection: "row", padding: wp("2%") }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', color: '#008080' }}>
                            {
                                data.length > 0 ? (data[0].TagNo1 == "" || data[0].TagNo1 == null ? "N/A" : data[0].TagNo1) : "N/A"
                            }

                        </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: "right" }}>
                            {
                                data.length > 0 ? (data[0].InventoryType == "" || data[0].InventoryType == null ? "N/A" : data[0].InventoryType) : "N/A"
                            }
                        </Text>
                    </View>


                </View>

               



            </View>

        </View>


    );
}