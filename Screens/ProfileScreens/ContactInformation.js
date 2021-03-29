import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Fontisto, AntDesign, Feather, FontAwesome, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import { Helper } from '../../Components/Helpers';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ContactInformationScreen({ navigation, route }) {


    // useEffect(() => {

    //     Helper.getProfileData().then((response) => {
    //         //console.log('aaa', response)
    //         // SetData(response);
    //         SetData(response[0])
    //         IsLoading(false);

    //         //console.log('abc', response)
    //     }).catch((e) => {
    //         console.log('eee', e);
    //     });

    // }, [])



    return (
        <ScrollView style={styles.profileContactContainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

                <View>
                    <View style={styles.profileContactItem}>
                        {/* <Feather
                    name="user" size={30} color="#0041c4" /> */}

                        <Entypo name="newsletter" size={wp('7%')} color="#006666" />
                        <View style={styles.profileContactItemView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.profileContactSubItem}>Postal Address</Text>
                            </View>

                            <View>
                                {route.params.data[0].PostalAddress == '' || route.params.data[0].PostalAddress == null ?
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                    :
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].PostalAddress}</Text>
                                }
                            </View>


                        </View>
                    </View>


                    <View style={styles.profileContactItem}>
                        <Ionicons name="md-home" size={wp('7%')} color="#006666" />
                        {/* <AntDesign name="home" size={28} color="#0066FF" /> */}
                        <View style={styles.profileContactItemView}>
                            <Text style={styles.profileContactSubItem}>Permanent Address</Text>
                            {route.params.data[0].PermanentAddress == '' || route.params.data[0].PermanentAddress == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%'), }}>{route.params.data[0].PermanentAddress}</Text>

                            }

                        </View>
                    </View>


                    <View style={styles.profileContactItem}>
                        {/* <AntDesign name="idcard" size={28} color="#0066FF" /> */}
                        <FontAwesome name="vcard-o" size={wp('7%')} color="#006666" />
                        <View style={styles.profileContactItemView}>
                            <Text style={styles.profileContactSubItem}>Cnic</Text>
                            {route.params.data[0].CNIC == '' || route.params.data[0].CNIC == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].CNIC}</Text>
                            }
                        </View>
                    </View>

                    <View style={styles.profileContactItem}>
                        <Icon name="email" color="#006666" size={wp('7%')} />
                        <View style={styles.profileContactItemView}>
                            <Text style={styles.profileContactSubItem}>Employee Email</Text>
                            {route.params.data[0].EmployeeContactEmail == '' || route.params.data[0].EmployeeContactEmail == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].EmployeeContactEmail}</Text>
                            }
                        </View>
                    </View>

                    <View style={styles.profileContactItem}>
                        <Icon name="phone" color="#006666" size={wp('7%')} />
                        <View style={styles.profileContactItemView}>
                            <Text style={styles.profileContactSubItem}>Cell</Text>
                            {route.params.data[0].Cell == '' || route.params.data[0].Cell == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].Cell}</Text>
                            }
                        </View>
                    </View>

                    {/* <View style={styles.profileContactItem}>
                        <MaterialCommunityIcons name="home-map-marker" size={28} color="#006666" />
                        <View style={styles.profileContactItemView}>
                            <Text style={styles.profileContactSubItem}>Province(City)</Text>
                            <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                        
                        </View>

                    </View> */}

                </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    profileContactContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profileContactItem: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        flexDirection: 'row',
        paddingHorizontal: wp('3%'),
        paddingTop: wp('3%'),
        borderRadius: 8,
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
    },
    profileContactItemView: {
        flex: 1,
        marginBottom: wp('2%'),
        paddingLeft: wp('4%'),
        paddingBottom: wp('2%')


    }
    ,
    profileContactSubItem: {
        color: 'gray',
        fontSize: wp('4%'),

    }
});