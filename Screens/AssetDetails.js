import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../constants/constants';


export default function AssetDetailsScreen({ navigation, route }) {


    const [data, setData] = React.useState([]);
    const [loading, IsLoading] = React.useState(true);

    useEffect(() => {

        if (route.params.Scandata.length > 0) {
            GetDataAssetApi()
            console.log("Data after scan", route.params.Scandata);
        }
        else {

            Alert.alert(
                "Info",
                "No Record Found.",
                [

                    { text: "OK", onPress: () => { navigation.navigate('AssetScanScreen') } }
                ],
                { cancelable: false }
            )

        }

    }, [])




    // ........... Begin:ApiCall ............... //
    const GetDataAssetApi = async () => {
        try {
            //abcdes
            // Live...   const response = await fetch(Contants.API_URL + 'EmployeeInfo/FiscalYearPeriodList?fiscalyearId=' + maxfiscalid, {

            // const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalYearPeriodList', {

            //const response = await fetch('https://reports.idc.net.pk/OrbitEmpServiceStg/api/FixedAsset/V1/FixedAssetDetailBy', {

            const response = await fetch(Contants.API_URL + 'FixedAsset/V1/FixedAssetDetailBy', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Barcode: route.params.Scandata

                    //   Barcode: "00001-00001"
                    //abc


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
                        "Info",
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

        <View style={styles.container}>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <ActivityIndicator size="small" color="#008080" />
                </View> :


                <View style={styles.MainView}>


                    <View>

                        <Text style={{ fontWeight: 'bold', fontSize: wp("4%"), textAlign: 'center', color: '#008080' }}>
                            {
                                data.length > 0 ? (data[0].Name == "" || data[0].Name == null ? "N/A" : data[0].Name) : "N/A"
                            }
                        </Text>

                        <Text style={{
                            textAlign: "center", paddingTop: wp('2%'),
                            fontSize: wp('3.4%'),
                            color: '#808080'
                        }}>
                            {
                                data.length > 0 ? (data[0].Specifictaion == "" || data[0].Specifictaion == null ? "N/A" : data[0].Specifictaion) : "N/A"
                            }
                        </Text>
                    </View>






                    <View style={{ marginTop: wp("4%") }}>


                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Manufacture :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>




                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].Manufacture == "" || data[0].Manufacture == null ? "N/A" : data[0].Manufacture) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>



                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Inventory Type :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>

                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].InventoryType == "" || data[0].InventoryType == null ? "N/A" : data[0].InventoryType) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>





                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Location :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>

                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].Location == "" || data[0].Location == null ? "N/A" : data[0].Location) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>




                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Model No :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>

                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].ModelNo == "" || data[0].ModelNo == null ? "N/A" : data[0].ModelNo) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>



                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Tag No :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>

                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].TagNo1 == "" || data[0].TagNo1 == null ? "N/A" : data[0].TagNo1) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>



                        <View style={styles.infoview}>

                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={styles.infotxt}>Serial No :</Text>
                            </View>

                            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>

                                <Text style={styles.infosubtxt}>
                                    {
                                        data.length > 0 ? (data[0].SerialNo == "" || data[0].SerialNo == null ? "N/A" : data[0].SerialNo) : "N/A"
                                    }
                                </Text>
                            </View>

                        </View>


                    </View>

                </View>
            }

        </View>



    );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f1'
    },

    MainView: {
        marginHorizontal: wp("3%"),
        marginVertical: wp("5%"),
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 4,
        padding: wp('4%'),
        shadowRadius: 3,
        backgroundColor: '#fff'

    },


    infoview: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#D8D8D8',
        marginHorizontal: wp('2%'),
        paddingTop: wp('1%')
    },

    infotxt: {
        paddingTop: wp('2%'),
        // color: '#59ABE3',
        color: 'black',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    infosubtxt: {
        paddingTop: wp('2%'),
        fontSize: wp('3.6%'),
        fontWeight: 'bold',
        color: '#808080'


    },


})