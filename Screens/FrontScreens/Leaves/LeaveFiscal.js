import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Alert, PickerIOSItem } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../../constants/constants';
import { Picker, Item } from "native-base";
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

export default function LeaveFisicalScreen({ navigation, route }) {

    const [yearapidata, setYearApiData] = useState([]);
    const [selectedyearvalue, setSelectedYearValue] = useState(null);
    const [monthapidata, setMonthApiData] = useState([]);
    const [slctfrommonthvalue, setSlctFromMonthValue] = useState(null);
    const [slcttomonthvalue, setSlctToMonthValue] = useState(null);
    const [loading, IsLoading] = useState(true);
    const [selectfrommonthlabel, setSelectedFromMonthLabel] = useState('');
    const [slcttomonthlabel, setSlctToMonthLabel] = useState('');
    const [toMonthPickerData, setToMonthPickerData] = useState([]);

    // useEffect(() => {
    //     // console.log('abbbbbbbb', route.params.FiscalYears)
    //     if (route.params.FiscalYears.length > 0) {
    //         IsLoading(false)

    //     }
    // }, [])



    useEffect(() => {
        FicicalYearApiCall();
    }, [])

    useEffect(() => {
        if (selectedyearvalue !== null) {
            // console.log('aaa', yearapidata[0].fiscalyearid)
            MonthApiCall();
        }
    }, [selectedyearvalue])





    // Year Api data
    const FicicalYearApiCall = async () => {
        try {
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalyearList', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const responseObj = await response.json();
            //console.log(responseObj)
            if (responseObj.statusCode == 200) {
                let payloadData = JSON.parse(responseObj.payload);

                //  console.log('aaa', payloadData)
                if (payloadData.length > 0) {
                   // console.log('fiscal year', payloadData)
                    setYearApiData(payloadData);
                    IsLoading(false);
                }
                else {
                    Alert.alert('Error')
                }
            }
        }
        catch (e) {
            console.log('Error', e);
        }
    }



    // month Api Data
    const MonthApiCall = async () => {
        try {
            // const response = await fetch(Contants.API_URL + 'EmployeeInfo/FiscalYearPeriodList?fiscalyearId=' + selectedyearvalue, {
                const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalYearPeriodList', {

            method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fiscalYearId: selectedyearvalue


                })
            });
            const responseObj = await response.json();

            // console.log(responseObj)
            if (responseObj.statusCode == 200) {
                let payloaddata = JSON.parse(responseObj.payload);
                if (payloaddata.length > 0) {
                    setMonthApiData(payloaddata);
                    IsLoading(false);
                    //   console.log('month', payloaddata)
                }
                else {
                    Alert.alert('Error')
                }
            }
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    React.useEffect(() => {
        //  console.log(slctfrommonthvalue);
        let itempArray = [];
        monthapidata.map((item, index) => {
            //  console.log('map lop', item);
            if (slctfrommonthvalue <= item.PeriodId) {
                itempArray.push(item);
            }
        });
        setToMonthPickerData(itempArray);
    }, [slctfrommonthvalue]);



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?

                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <ActivityIndicator size="small" color="#008080" />
                </View>
                :


                <>

                    <View style={{ marginTop: wp('5%'), marginHorizontal: wp('5%'), }}>
                        <Text style={{ fontSize: wp('5%'), fontWeight: 'bold', }}>
                            Select Fiscal Year
                    </Text>
                    </View>


                    <View style={{
                        alignItems: "center",
                        // marginHorizontal: 30
                    }}>
                        <Item style={{ width: "90%", marginVertical: 15 }}>
                            {Platform.OS === "android" ? (
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select Year"
                                    placeholderStyle={{ color: "#4000ff" }}
                                    style={{ borderWidth: 0.3, borderColor: 'green' }}
                                    note={false}
                                    selectedValue={selectedyearvalue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedYearValue(itemValue)
                                        // console.log('yearchangvalue', itemValue)

                                    }}>

                                    <Picker.Item label="Select Year" value="" />
                                    {yearapidata.length > 0 ? yearapidata.map((item, index) => {
                                        return (<Picker.Item label={item.name} value={item.fiscalyearid} />)

                                    }) : null}
                                </Picker>
                            ) : (
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<AntDesign name="down" size={24} color="#66b2b2"
                                            style={{ paddingRight: wp('1.3%') }} />}

                                        placeholder="Select Year"
                                        placeholderStyle={{ color: "#66b2b2" }}
                                        // placeholderIconColor="#4000ff"
                                        style={{ borderWidth: 1, borderColor: '#b2d8d8', width: wp('90%') }}

                                        note={false}
                                        selectedValue={selectedyearvalue}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSelectedYearValue(itemValue)
                                        }
                                        }

                                    >
                                        {yearapidata.length > 0 ? yearapidata.map((item, index) => {
                                            return (<Picker.Item label={item.name} value={item.fiscalyearid} />)

                                        }) : null}
                                    </Picker>
                                )}
                        </Item>
                    </View>



                    {selectedyearvalue !== null ? <>

                        <View style={{ marginTop: wp('5%'), marginHorizontal: wp('5%'), }}>
                            <Text style={{ fontSize: wp('5%'), fontWeight: 'bold' }}>
                                From
                        </Text>
                        </View>

                        <View style={{ alignItems: "center", }}>


                            <Item style={{ width: "90%", marginVertical: 15 }}>
                                {Platform.OS === "android" ? (
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select Month"
                                        note={false}
                                        selectedValue={slctfrommonthvalue}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSlctFromMonthValue(itemValue)
                                            //  console.log('fromid', itemValue)

                                            monthapidata.map((item, index) => {
                                                if (item.PeriodId == itemValue) {
                                                    setSelectedFromMonthLabel(item.Name)
                                                }
                                            })

                                        }}>
                                        <Picker.Item label="Select Month" value="" />
                                        {monthapidata.length > 0 ? monthapidata.map((item, index) => {
                                            // if(slctfrommonthvalue <= slcttomonthvalue){
                                            //     return (<Picker.Item label={item.Name} value={item.PeriodId} />)
                                            // }
                                            return (<Picker.Item label={item.Name} value={item.PeriodId} />)
                                        }) : null}
                                    </Picker>
                                ) : (
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<AntDesign name="down" size={24} color="#66b2b2"
                                                style={{ paddingRight: wp('1.3%') }} />}
                                            placeholder="Select Month"
                                            placeholderStyle={{ color: "#66b2b2" }}
                                            placeholderIconColor="#007aff"
                                            style={{ borderWidth: 1, borderColor: '#b2d8d8', width: wp('90%') }}
                                            note={false}
                                            selectedValue={slctfrommonthvalue}
                                            onValueChange={(itemValue, itemIndex) => {

                                                setSlctFromMonthValue(itemValue)
                                                //   console.log('fromid', itemValue)

                                                monthapidata.map((item, index) => {
                                                    if (item.PeriodId == itemValue) {
                                                        setSelectedFromMonthLabel(item.Name)
                                                    }
                                                })
                                                // console.log('aaa', itemValue)
                                            }}>
                                            {monthapidata.length > 0 ? monthapidata.map((item, index) => {

                                                return (<Picker.Item label={item.Name} value={item.PeriodId} />)
                                            }) : null}
                                        </Picker>
                                    )}
                            </Item>
                        </View>
                    </> : null}


                    {slctfrommonthvalue !== null ? <>
                        <View style={{ marginTop: wp('5%'), marginHorizontal: wp('5%'), }}>
                            <Text style={{ fontSize: wp('5%'), fontWeight: 'bold' }}>
                                To
                        </Text>
                        </View>

                        <View style={{ alignItems: "center", }}>


                            <Item style={{ width: "90%", marginVertical: 15 }}>
                                {Platform.OS === "android" ? (

                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select Month"
                                        note={false}
                                        selectedValue={slcttomonthvalue}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSlctToMonthValue(itemValue)
                                            //   console.log('aaa', itemValue)

                                            monthapidata.map((item, index) => {
                                                if (item.PeriodId == itemValue) {
                                                    setSlctToMonthLabel(item.Name)
                                                }
                                            })

                                        }}>
                                        <Picker.Item label="Select Month" value="" />
                                        {toMonthPickerData.length > 0 ? toMonthPickerData.map((item, index) => {
                                            return (<Picker.Item label={item.Name} value={item.PeriodId} />)

                                        }) : null}
                                    </Picker>
                                ) : (
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<AntDesign name="down" size={24} color="#66b2b2"
                                                style={{ paddingRight: wp('1.3%') }} />}
                                            placeholder="Select Month"
                                            placeholderStyle={{ color: "#66b2b2" }}
                                            placeholderIconColor="#007aff"
                                            style={{ borderWidth: 1, borderColor: '#b2d8d8', width: wp('90%') }}
                                            note={false}
                                            selectedValue={slcttomonthvalue}
                                            onValueChange={(itemValue, itemIndex) => {

                                                setSlctToMonthValue(itemValue)
                                                //       console.log('Toid', itemValue)

                                                monthapidata.map((item, index) => {
                                                    if (item.PeriodId == itemValue) {
                                                        setSlctToMonthLabel(item.Name)
                                                    }

                                                })
                                                // console.log('aaa', itemValue)
                                            }}>
                                            {toMonthPickerData.length > 0 ? toMonthPickerData.map((item, index) => {
                                                return (<Picker.Item label={item.Name} value={item.PeriodId} />)

                                            }) : null}
                                        </Picker>
                                    )}
                            </Item>
                        </View>
                    </> : <></>}


                    {selectedyearvalue !== null && slctfrommonthvalue !== null && slcttomonthvalue ?
                        <View>
                            <View style={{ alignItems: 'center', marginTop: wp('5%'), }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#008080', height: wp('10%'), width: wp('30%'), alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                                    onPress={() => {
                                        {
                                            selectedyearvalue !== null && slctfrommonthvalue !== null && slcttomonthvalue !== null ?
                                                navigation.navigate('LeavesScreen', {
                                                    LeaveFromPeriodId: slctfrommonthvalue,
                                                    LeaveToPeriodID: slcttomonthvalue,
                                                    LeaveFiscalYear: selectedyearvalue,
                                                    LeaveFromMonths: selectfrommonthlabel,
                                                    LeaveToMonths: slcttomonthlabel
                                                }) :

                                                <View>
                                                    <Text style={{ color: 'red' }}>
                                                        {
                                                            Alert.alert(
                                                                "Alert",
                                                                "Please Fill Out All Fields",
                                                                [
                                                                    {
                                                                        text: "Cancel",
                                                                        onPress: () => console.log("Cancel Pressed"),
                                                                        style: "cancel"
                                                                    },
                                                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                                                ],
                                                                { cancelable: false }
                                                            )
                                                        }
                                                    </Text>
                                                </View>

                                        }

                                    }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Leaves</Text>
                                </TouchableOpacity>
                            </View>

                        </View> : <></>}
                </>
            }
        </View>
    );
}