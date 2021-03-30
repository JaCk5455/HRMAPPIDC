import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Fontisto, AntDesign, Feather, FontAwesome, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Helper } from '../../Components/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';

export default function PersonalInformationScreen({ route }) {


    const [data, SetData] = useState([]);
    const [loading, IsLoading] = useState(false);



    // useEffect(() => {
    //     console.log('aaa', route)
    //     Helper.getProfileData().then((response) => {
    //         //console.log('aaa', response)
    //         // SetData(response);
    //         SetData(response[0]);
    //         IsLoading(false);
    //         //console.log('abc', response)
    //     }).catch((e) => {
    //         console.log('eee', e);
    //     });

    // }, [])






    return (

        <ScrollView style={styles.profileDetailContainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <ActivityIndicator size="small" color="#008080" /> :
                <View>


{/* 
<View style={styles.profileItem}>
                        <Feather
                            name="user" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>FirstName</Text>
                           
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>John</Text>
                            
                        </View>

                        <View style={{ flex: 1, marginBottom: wp('3%') }}>
                            <Text style={styles.profileSubItem}>MiddleName</Text>
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}></Text>
                            
                        

                        </View>

                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>LastName</Text>
                          
                        <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>Doe</Text>
                            

                        </View>
                        
                    </View> */}









                     <View style={styles.profileItem}>
                        <Feather
                            name="user" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>FirstName</Text>
                            {route.params.data[0].FirstName == '' || route.params.data[0].FirstName == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].FirstName}</Text>
                            }
                        </View>

                        <View style={{ flex: 1, marginBottom: wp('3%') }}>
                            <Text style={styles.profileSubItem}>MiddleName</Text>
                            {route.params.data[0].MiddleName == '' || route.params.data[0].MiddleName == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}></Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].MiddleName}</Text>
                            }

                        </View>

                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>LastName</Text>
                            {route.params.data[0].LastName == '' || route.params.data[0].LastName == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].LastName}</Text>
                            }

                        </View>
                        
                    </View>








{/* <View style={styles.profileItem}>
                        <Feather
                            name="user" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>FatherName</Text>
                            
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>John Doe</Text>
                            

                            
                        </View>
                    </View> */}

                      <View style={styles.profileItem}>
                        <Feather
                            name="user" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>FatherName</Text>
                            {route.params.data[0].FatherName == '' || route.params.data[0].FatherName == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].FatherName}</Text>
                            }

                            
                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        <AntDesign name="idcard" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Cnic</Text>

                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>11111-2222222-3</Text> */}

                             {route.params.data[0].CNIC == '' || route.params.data[0].CNIC == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].CNIC}</Text>
                            }



                        </View>
                    </View>

                    <View style={styles.profileItem}>
                        <Fontisto name="date" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>D.O.B</Text>
                            {route.params.data[0].DOB == '' || route.params.data[0].DOB == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{moment(route.params.data[0].DOB).format("MMMM D, YYYY")}</Text>
                            }

                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].DOB == null || data[0].DOB == '' ? 'N/A' : moment(data[0].DOB).format("MMMM D, YYYY")) : ''} </Text> */}
                        </View>
                    </View>

                    <View style={styles.profileItem}>
                        <MaterialCommunityIcons name="gender-male-female" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Gender</Text>
                            {route.params.data[0].Gender == '' || route.params.data[0].Gender == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].Gender}</Text>
                            }

                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].Gender == null || data[0].Gender == '' ? 'N/A' : data[0].Gender) : ''} </Text> */}
                        </View>
                    </View>

                    <View style={styles.profileItem}>
                        <MaterialCommunityIcons name="ring" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>MaritalStatus</Text>
                            {route.params.data[0].MaritalStatus == '' || route.params.data[0].MaritalStatus == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].MaritalStatus}</Text>
                            }
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].MaritalStatus == null || data[0].MaritalStatus == '' ? 'NA' : data[0].MaritalStatus) : ''} </Text> */}
                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        {/* <MaterialCommunityIcons name="islam" size={28} color="#0066FF" /> */}

                        <SimpleLineIcons name="user" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Religion</Text>
                            {route.params.data[0].Religion == '' || route.params.data[0].Religion == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].Religion}</Text>
                            }
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].Religion == null || data[0].Religion == '' ? 'N/A' : data[0].Religion) : ''} </Text> */}


                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        <Fontisto name="blood-drop" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>BloodGroup</Text>
                            {route.params.data[0].BloodGroup == '' || route.params.data[0].BloodGroup == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].BloodGroup}</Text>
                            }
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].BloodGroup == null || data[0].BloodGroup == '' ? 'N/A' : data[0].BloodGroup) : ''} </Text> */}
                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        <MaterialCommunityIcons name="office-building" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Department</Text>
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].DepartmentName == null || data[0].DepartmentName == '' ? 'N/A' : data[0].DepartmentName) : ''} </Text> */}

                            {route.params.data[0].DepartmentName == '' || route.params.data[0].DepartmentName == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].DepartmentName}</Text>
                            }


                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        {/* <FontAwesome name="group" size={28} color="#0066FF" /> */}
                        <Ionicons name="ios-people-outline" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Designation</Text>
                            {route.params.data[0].Designation == '' || route.params.data[0].Designation == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].Designation}</Text>
                            }

                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].Designation == null || data[0].Designation == '' ? 'N/A' : data[0].Designation) : ''} </Text> */}
                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        <MaterialCommunityIcons name="shape-polygon-plus" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Job Type</Text>

                            {route.params.data[0].JobType == '' || route.params.data[0].JobType == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.data[0].JobType}</Text>
                            }
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].JobType == null || data[0].JobType == '' ? 'N/A' : data[0].JobType) : ''} </Text> */}

                        </View>
                    </View>


                    <View style={styles.profileItem}>
                        <Fontisto name="date" size={wp('7%')} color="#006666" />
                        <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                            <Text style={styles.profileSubItem}>Joining Date</Text>
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{apidata.length > 0 ?
                        moment(apidata[0].JoiningDate).format("MMMM D, YYYY") : ''}</Text> */}
                            {route.params.data[0].JoiningDate == '' || route.params.data[0].JoiningDate == null ?
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                :
                                <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{moment(route.params.data[0].JoiningDate).format("MMMM D, YYYY")}</Text>
                            }
                            {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{data.length > 0 ? (data[0].JoiningDate == null || data[0].JoiningDate == '' ? 'N/A' : moment(data[0].JoiningDate).format("MMMM D, YYYY")) : ''} </Text> */}

                        </View>
                    </View>

                </View>
            }
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    profileDetailContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Indicator: {
        justifyContent: 'space-around',
        justifyContent: 'center'
    },
    profileItem: {
        borderWidth: 1, borderColor: '#E8E8E8',
        flexDirection: 'row',
        paddingHorizontal: wp('3%'),
        paddingTop: wp('3%'),
        borderRadius: 8,
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
        justifyContent: 'center'

    },
    profileSubItem: {
        color: 'gray',
        fontSize: wp('4%'),

    }
});