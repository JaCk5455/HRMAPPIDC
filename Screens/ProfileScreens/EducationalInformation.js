import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import { MaterialCommunityIcons, Fontisto, AntDesign, Feather, FontAwesome, Foundation, SimpleLineIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import * as Contants from '../../constants/constants';

import { Helper } from '../../Components/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function EducationalInformationScreen({ route  }) {

    //   const [data, SetData] = useState([]);
    const [apidata, SetApiData] = useState([]);
    const [loading, IsLoading] = useState(false);


    // const { Edudata } = route.params;




    // useEffect(() => {

    //     Helper.getLoggedInData().then((response) => {
    //         //console.log('aaa', response)
    //         // SetData(response);
    //         SetData(response)

    //         //console.log('abc', response)
    //     }).catch((e) => {
    //         console.log('eee', e);
    //     });

    // }, [])

    // useEffect(() => {
    //     // console.log('aaaaaa', route)
    //     if (route.params.data) {
    //         // console.log(data[0].EmpId);
    //         ProfileEduApiData();
    //         IsLoading(false);
    //     }

    // }, [])




    // const ProfileEduApiData = async () => {
    //     try {

    //         // const response = await fetch(Contants.API_URL + 'Login/EmployeeLogin'
    //         const response = await fetch(Contants.API_URL + 'EmployeeInfo/EmployeeEmpEduInfo?Empid=' + route.params.data, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },

    //             body: JSON.stringify({
    //                 Empid: route.params.data

    //             })
    //         });
    //         const responseObj = await response.json();
    //         //console.log('aaa', responseObj)
    //         if (responseObj.statusCode == 200) {
    //             let payload = JSON.parse(responseObj.payload);
    //             if (payload.length > 0) {
    //                 SetApiData(payload);
    //                 IsLoading(false);

    //             }
    //             else {
    //                 Alert.alert('Error')
    //             }
    //         }

    //     }
    //     catch (e) {
    //         console.log('Error', e);
    //     }
    // }
  
  


    return (

        <ScrollView style={styles.profileDetailContainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <View style={{flex:1 , justifyContent:'center'}}> 
            
                <ActivityIndicator size="small" color="#008080" />
                </View>
                 :
                <>


                    <View>
                        <View style={styles.profileItem}>
                            
                            <Ionicons name="newspaper-outline" size={wp('7%')} color="#006666" />
                            <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                                <Text style={styles.profileSubItem}>Degree Title</Text>




                                {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>BS(CS)</Text> */}


                                 {route.params.Edudata[0].Degree == '' || route.params.Edudata[0].Degree == null || route.params.Edudata[0].Specialization == '' || route.params.Edudata[0].Specialization == null ?
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                    :
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].Degree + '(' + route.params.Edudata[0].Specialization + ')'}</Text>
                                }

                            </View>
                        </View>


                        <View style={styles.profileItem}>
                            <AntDesign name="calendar" size={wp('7%')} color="#006666" />
                            <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                                <Text style={styles.profileSubItem}>Completion Date</Text>


                                
                                {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>August 17,2015</Text> */}

                                 {route.params.Edudata[0].CompletionDate == '' || route.params.Edudata[0].CompletionDate == null ?
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                    :
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{moment(route.params.Edudata[0].CompletionDate).format("MMMM D, YYYY")}</Text>
                                }

                            </View>
                        </View>

                        <View style={styles.profileItem}>
                            <FontAwesome5 name="building" size={wp('7%')} color="#006666" />
                            <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                                <Text style={styles.profileSubItem}>University/College/Institute</Text>
                                
                                
                                
                                {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>University of Michigan</Text> */}




                                 {route.params.Edudata[0].Institution == '' || route.params.Edudata[0].Institution == null ?
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                    :
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].Institution}</Text>
                                }

                            </View>
                        </View>

                        <View style={styles.profileItem}>
                            <SimpleLineIcons name="calculator" size={wp('7%')} color="#006666" />
                            <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
                                <Text style={styles.profileSubItem}>Grade/GPA/Percentage</Text>
                                {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{apidata.length > 0 ? (apidata[0].ObtainedGPA == null || apidata[0].ObtainedGPA == '' ? 'N/A' : apidata[0].ObtainedGPA) : ''} </Text> */}


                                {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>2.5</Text> */}

                                 {route.params.Edudata[0].ObtainedGPA == '' || route.params.Edudata[0].ObtainedGPA == null ?
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
                                    :
                                    <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].ObtainedGPA}</Text>
                                }
                            </View>
                        </View>



                    </View>

                </>
            }

        </ScrollView>

    );

}


const styles = StyleSheet.create({
    profileDetailContainer: {
        flex: 1,
        backgroundColor: '#fff'
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