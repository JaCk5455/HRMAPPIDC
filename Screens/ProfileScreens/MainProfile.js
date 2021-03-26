import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions,  StatusBar , 
ActivityIndicator } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,

} from 'react-native-paper';
import {  Spinner } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
import * as Contants from '../../constants/constants';
import { Helper } from '../../Components/Helpers';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function MainProfileScreen({ navigation }) {

    const [data, SetData] = useState([]);
    const [personalapidata, SetPersonalApiData] = useState([]);
    const [eduapidata, SetEduApiData] = useState([]);
    const [loading, IsLoading] = useState(true);


    useEffect(() => {

        Helper.getLoggedInData().then((response) => {
            // SetData(response);
            SetData(response)
            // console.log('abc', response)

        }).catch((e) => {
            console.log('eee', e);
        });

    }, [])
    useEffect(() => {
        if (data.length > 0) {
            const abortController = new AbortController();
            const signal = abortController.signal;
            //  console.log(data.Table[0].EmpId);
            ProfileApiData(signal);
            return function cleanup() {
                abortController.abort();
            }
        }


    }, [data])



    // const StoreData = async (payload) => {
    //     //console.log(payload);
    //     try {

    //         await AsyncStorage.setItem('@Profilepayload', JSON.stringify(payload));

    //     } catch (e) {
    //         console.log('data not found', e);
    //     }


    // };





    const ProfileApiData = async (signal) => {
        try {

            const response = await fetch(Contants.API_URL + 'Employeeinfo/EmployeePerosnalDetails?Empid=' + data[0].EmpId, {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId


                })
            });
            const responseObj = await response.json();
          //  console.log(responseObj)
            if (responseObj.statusCode == 200) {
                let payloadData = JSON.parse(responseObj.payload);
               // console.log(payloadData)
                if (payloadData.Table.length > 0) {
                    SetPersonalApiData(payloadData.Table);
                    // console.log('aaa', payloadData.Table)
                    // StoreData(payload);
                    IsLoading(false);
                }
                else {
                    Alert.alert('Error')
                }
                if (payloadData.Table2.length > 0) {
                    SetEduApiData(payloadData.Table2);
                    // console.log('aaa', payloadData.Table2)
                    // StoreData(payload);
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



    return (


        <View style={styles.MainProfilecontainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <View style={{flex:1 , justifyContent:'center'}} >
                    <ActivityIndicator size="small" color="#008080"  />

                  {/* //  <Spinner color='#008080'  /> */}

                    {/* <ActivityIndicator animating={true} color={Colors.red800} /> */}
                </View>
                :
                <>
                
                    <View style={styles.profileinfoBoxWrapper}>


                        <View style={styles.profileinfoBox}>

                            <LinearGradient
                                colors={["#006666", "#b2d8d8"]}
                                style={{ height: "45%" }} />
                            <View style={{ alignItems: 'center', marginBottom: wp("1%") }} >
                                <Avatar.Image
                                    // source={{ uri: ((apidata[0].EmployeePic) ? `data:image/png;base64,${apidata[0].EmployeePic}` : (apidata[0].Gender == "M" || apidata[0].Gender == "Male" ? Contants.USER_IMAGE.MALE : Contants.USER_IMAGE.FEMALE)) }}
                                    source={{ uri: (data.length > 0 ? (data[0].EmployeePic ? `data:image/png;base64,${data[0].EmployeePic}` : (data[0].EmployeeGender == "M" || data[0].EmployeeGender == "Male" ? Contants.USER_IMAGE.MALE : Contants.USER_IMAGE.FEMALE)) : 'N/A') }}
                                    size={wp('27%')}
                                    style={{ marginTop: wp('-18%') }}
                                />

                                <Title style={styles.title}>{personalapidata.length > 0 ? (personalapidata[0].EmpName == null || personalapidata[0].EmpName == '' ? 'N/A' : personalapidata[0].EmpName) : 'N/A'} </Title>

                                <Caption style={styles.caption}>{personalapidata.length > 0 ? (personalapidata[0].Designation == null || personalapidata[0].Designation == '' ? 'N/A' : personalapidata[0].Designation) : ''}</Caption>
                            </View>
                        </View>


                        {/* <View style={styles.profileinfoBox}>

                            <LinearGradient
                                colors={["#006666", "#b2d8d8"]}
                                style={{ height: "45%" }} />
                            <View style={{ alignItems: 'center', marginBottom: wp("1%") }} >
                                <Avatar.Image
                                    // source={{ uri: ((apidata[0].EmployeePic) ? `data:image/png;base64,${apidata[0].EmployeePic}` : (apidata[0].Gender == "M" || apidata[0].Gender == "Male" ? Contants.USER_IMAGE.MALE : Contants.USER_IMAGE.FEMALE)) }}
                                    source={{ uri: (data.length > 0 ? (data[0].EmployeePic ? `data:image/png;base64,${data[0].EmployeePic}` : (data[0].EmployeeGender == "M" || data[0].EmployeeGender == "Male" ? Contants.USER_IMAGE.MALE : Contants.USER_IMAGE.FEMALE)) : 'N/A') }}
                                    size={wp('27%')}
                                    style={{ marginTop: wp('-18%') }}
                                />

                                <Title style={styles.title}>{personalapidata.length > 0 ? (personalapidata[0].EmpName == null || personalapidata[0].EmpName == '' ? 'N/A' : personalapidata[0].EmpName) : 'N/A'} </Title>

                                <Caption style={styles.caption}>{personalapidata.length > 0 ? (personalapidata[0].Designation == null || personalapidata[0].Designation == '' ? 'N/A' : personalapidata[0].Designation) : ''}</Caption>
                            </View>
                        </View> */}

                        <View style={{ flex: 1.3, paddingHorizontal: wp('2.5%') }}>
                            <View style={{ flexDirection: 'row', marginTop: wp('5%'), paddingLeft: wp('2.5%'), alignItems: 'center' }}>

                                <Icon name="map-marker-radius" color="#006666" size={20} />
                                <Text style={styles.profileinfotext}>{personalapidata.length > 0 ? (personalapidata[0].Location == null || personalapidata[0].Location == '' ? 'N/A' : personalapidata[0].Location) : ''}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', marginTop: wp('4%'), paddingLeft: wp('2.5%') }}>
                                <Icon name="phone" color="#006666" size={20} />
                                <Text style={styles.profileinfotext}>{personalapidata.length > 0 ? (personalapidata[0].Cell == null || personalapidata[0].Cell == '' ? 'N/A' : personalapidata[0].Cell) : ''}</Text>

                            </View>


                            <View style={{ flexDirection: 'row', marginTop: wp('4%'), paddingLeft: wp('2.5%'), paddingBottom: wp('2%') }}>
                                <Icon name="email" color="#006666" size={20} />
                                <Text style={styles.profileinfotext}>{personalapidata.length > 0 ? (personalapidata[0].EmployeeContactEmail == null || personalapidata[0].EmployeeContactEmail == '' ? 'N/A' : personalapidata[0].EmployeeContactEmail) : ''}</Text>

                            </View>
                        </View>
                    </View>


                    <View style={styles.profilemenusection}>
                        <ScrollView>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('PersonalInformationScreen', {
                                    data: personalapidata
                                })
                            }}>
                                <View style={styles.menuItem}>

                                    <View style={{ flex: 1.2, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%'), alignItems: 'center' }}>

                                        <FontAwesome name="user" size={24} color="#006666" />
                                    </View>

                                    <View style={{ flex: 10, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%') }}>
                                        <Text style={styles.menuItemText}>Personal Information</Text>
                                        {/* <Ionicons style={{ alignSelf: 'center', position: 'absolute', right: 10 }} name="ios-eye" size={24} color="#777" /> */}
                                        <AntDesign name="rightcircleo" size={22} color="#777" style={{ alignSelf: 'center', position: 'absolute', right: 1 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EducationalInformationScreen', {
                                    Edudata: eduapidata
                                })
                            }}>
                                <View style={styles.menuItem}>

                                    <View style={{ flex: 1.2, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%'), alignItems: 'center' }}>
                                        {/* <MaterialIcons name="cast-for-education" size={24} color="#0066FF" /> */}
                                        <FontAwesome name="graduation-cap" size={24} color="#006666" />
                                    </View>

                                    <View style={{ flex: 10, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%') }}>

                                        <Text style={[styles.menuItemText]}>Educational Information</Text>
                                        {/* <Ionicons style={{ alignSelf: 'center', position: 'absolute', right: 10 }} name="ios-eye" size={24} color="#777" /> */}
                                        {/* <AntDesign name="arrowright" size={20} color="#777" style={{ alignSelf: 'center', position: 'absolute', right: 10 }} /> */}
                                        <AntDesign name="rightcircleo" size={22} color="#777" style={{ alignSelf: 'center', position: 'absolute', right: 1 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                navigation.navigate('ContactInformationScreen', {
                                    data: personalapidata
                                })
                            }}>
                                <View style={styles.menuItem}>

                                    <View style={{ flex: 1.2, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%'), alignItems: 'center' }}>
                                        <MaterialIcons name="contact-phone" size={24} color="#006666" />
                                    </View>

                                    <View style={{ flex: 10, backgroundColor: '#fff', justifyContent: 'center', height: hp('5%') }}>

                                        <Text style={styles.menuItemText}>Contact Information</Text>
                                        {/* <Ionicons style={{ alignSelf: 'center', position: 'absolute', right: 10 }} name="ios-eye" size={20} color="#777" /> */}
                                        <AntDesign name="rightcircleo" size={22} color="#777" style={{ position: 'absolute', right: 1 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                </>
            }

        </View >






    );
}
const styles = StyleSheet.create({
    MainProfilecontainer: {
        flex: 1,
        backgroundColor: '#D8D8D8'
    },


    profileinfoBoxWrapper: {
        flex: 3,
        backgroundColor: '#fff'
    },
    profileinfoBox: {
        flex: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#CBCBCB',
    },

    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        // marginBottom: wp('5%'),
    },


    title: {
        marginTop: wp('2%'),
        fontSize: wp('7%'),
        fontWeight: 'bold',
    },
    caption: {
        fontSize: wp('5%'),
        fontWeight: '500',
        marginTop: wp('1%'),
        marginBottom: wp('1%')
    },
    userInfoSection: {
        paddingHorizontal: 10,
        paddingTop: wp('4%')
    },

    profileinfotext: {
        color: "#777777",
        marginLeft: wp('6%'),
        fontSize: wp('4%')
    },



    profilemenusection: {
        flex: 2,
        backgroundColor: '#fff',
        marginTop: wp('2%'),
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingLeft: wp('4%'),
        borderBottomWidth: 0.5,
        borderBottomColor: '#CBCBCB',
    },

    menuItemText: {
        color: '#777777',
        paddingLeft: wp('6%'),
        fontWeight: 'bold',
        fontSize: wp('4.5%'),
        lineHeight: 26,
    },
});