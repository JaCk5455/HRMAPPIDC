import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../../constants/constants';
import { Helper } from '../../../Components/Helpers';
import moment from 'moment';


export default function AttendanceScreen({ navigation, route }) {

    const [data, SetData] = useState([]);
    const [apidata, setApiData] = useState([]);
    const [loading, IsLoading] = useState(true);
    const [empworkinghrs, setEmpWorkingHrs] = useState('')

    // ......... Begin: AsynStorageData for EmpId ........ //
    useEffect(() => {

        Helper.getLoggedInData().then((response) => {
            SetData(response);

        }).catch((e) => {
            console.log('eee', e);
        });

    }, [])
    // ......... End: AsynStorageData for EmpId ........ //



    // ......... Begin:  AttandaveApiCall useEffect ........ //
    useEffect(() => {
        if (data.length > 0) {
            // console.log('cccc', route.params.AttendancePeriodId.PeriodId);
            AttandanceApiCall();
        }
    }, [data])
    // ......... End:  AttandaveApiCall useEffect ........ //




    // ........... Begin: AttandanceApiCall ....... //
    const AttandanceApiCall = async () => {
        try {
            // console.log('abc', Contants.API_URL + 'EmployeeInfo/IndividualAttendanceDetail?Empid=' + data[0].EmpId + '&periodId=' + route.params.AttendancePeriodId)
            //  console.log('abc', Contants.API_URL + 'EmployeeInfo/EmployeeSalarySlip?Empid=' + data[0].EmpId + '&periodId=' + route.params.SalPeriodId)
            // const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/IndividualAttendanceDetail' , {
                const response = await fetch(Contants.API_URL + 'EmployeeInfo/V2/IndividualAttendanceDetail' , {
                    method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId,
                    periodId: route.params.AttendancePeriodId

                    // Empid: 277,
                    // periodId: 104

                })
            });
            const responseObj = await response.json();
          //   console.log('responceapi', responseObj)
            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);
               // payload=payload.reverse();
               //vc console.log('aaa', payload)
                if (payload.length > 0) {
                    setApiData(payload);
                    IsLoading(false);

                    let WorkingHour = payload.filter(v => v.EmpWorkingHours !== null).map((item, Index) => {
                        return item.EmpWorkingHours
                    })
                    // let EmpWorkingHours = WorkingHour[0];
                    setEmpWorkingHrs(WorkingHour);

                   // console.log('Abc' , WorkingHour)



      

                }
                else {
                    Alert.alert(
                        "Alert",
                        "Record Not Found, Please Contact HR Department",
                        [
                            {
                                text: "Home",
                                onPress: () => navigation.navigate("HomeScreen"),
                                style: "cancel"
                            },
                            { text: "Ok", onPress: () => navigation.navigate("AttendanceFisicalScreen") }
                        ],
                        { cancelable: false }
                    )
                    // Alert.alert('No Attendance History Found')
                }
            }

        }
        catch (e) {
            console.log('Error', e);
        }
    }
    // ........... End: AttandanceApiCall ....... //


 // ........... Begin: Convert MinutesTo Hours ....... //

 function timeConvert(n) {
    let num = (n || 0);
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let rminutes = num - rhours * 60;
    return addPadding(rhours, 2) + ":" + addPadding(rminutes) + " Hrs";
   }
   function addPadding(num, pad = 2) {
    return (num || 0).toString().padStart(pad, '0');
   }

// ........... End: Convert MinutesTo Hours ....... //

    // .........Begin: FlatList Function(_RenderItem) ........... //
    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }

    function ItemView({ item }) {
        return (

            <>
                <View style={{ marginHorizontal: wp('2%'), flexDirection: 'row' }}>

                    <Text style={{ color: 'black', fontSize: wp('4%'), fontWeight: 'bold', padding: wp('1%'), color: '#008080' }}>
                        {moment(item.AttendanceDate).format("MMMM D, YYYY")}
                    </Text>


                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', padding: wp('1%'), color: '#008080' }}>
                        {
                            "(" + item.DayName + ")"
                        }
                    </Text>
                </View>


                <View style={{
                    flex: 1,
                    borderWidth: 2,
                    borderColor: '#CBCBCB',
                    marginHorizontal: wp("1%"),
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginBottom: wp('1%'),
                    padding: wp('1%')
                }}>



                    {/* <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                            <Text style={styles.listtxt}>Day :</Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.listSubtxt}>
                                {
                                    item.DayName
                                }
                            </Text>
                        </View>
                        
                    </View> */}


                    {item.AttendanceTimeIN == null && item.AttendanceTimeOut == null && item.LeaveType == null ?







                        <View style={styles.Attanempinfoview}>
                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                <Text style={styles.listtxt}>Status :</Text>
                            </View>

                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: "700" }}>
                                    Absent
                            </Text>

                            </View>

                        </View>


                        :
                        <>


                            {item.LeaveType !== null ?
                                <>
                                    {item.AttendanceTimeIN !== null && item.LeaveType !== null ?
                                        <>
                                            <View style={styles.Attanempinfoview}>
                                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                    <Text style={styles.listtxt}>Shift Timings:</Text>
                                                </View>

                                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    {item.ShiftTimeIN == null || item.ShiftTimeIN == undefined ?
                                                        <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: '700' }}>Not Defined</Text>
                                                        :
                                                        <Text style={styles.listSubtxt}>{moment(item.ShiftTimeIN, 'hh:mm:ss').format("hh:mm A") + '-' + moment(item.ShiftTimeOut, 'hh:mm:ss').format("hh:mm A")}</Text>
                                                    }
                                                </View>

                                            </View>


                                            <View style={styles.Attanempinfoview}>
                                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                    <Text style={styles.listtxt}>Time In :</Text>
                                                </View>

                                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    {item.AttendanceTimeIN == null || item.AttendanceTimeIN == undefined ?
                                                        <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: '700' }}>Missing</Text>
                                                        :
                                                        <Text style={styles.listSubtxt}>{moment(item.AttendanceTimeIN).format("hh:mm A")}</Text>
                                                    }
                                                </View>

                                            </View>


                                            <View style={styles.Attanempinfoview}>


                                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                    <Text style={styles.listtxt}>Status :</Text>
                                                </View>

                                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#0041c4', fontWeight: "700" }}>
                                                        {item.LeaveType + ' (' + item.AttStatus + ')'}
                                                    </Text>

                                                </View>

                                            </View>

                                        </>

                                        :



                                        <View style={styles.Attanempinfoview}>


                                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                <Text style={styles.listtxt}>Status :</Text>
                                            </View>

                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#0041c4', fontWeight: "700" }}>
                                                    {item.LeaveType + ' (' + item.AttStatus + ')'}
                                                </Text>

                                            </View>

                                        </View>


                                    }
                                </>
                                :
                                <>
                                    <View style={styles.Attanempinfoview}>
                                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                            <Text style={styles.listtxt}>Shift Timings:</Text>
                                        </View>

                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            {item.ShiftTimeIN == null || item.ShiftTimeIN == undefined ?
                                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: '700' }}>Not Defined</Text>
                                                :
                                                <Text style={styles.listSubtxt}>{moment(item.ShiftTimeIN, 'hh:mm:ss').format("hh:mm A") + '-' + moment(item.ShiftTimeOut, 'hh:mm:ss').format("hh:mm A")}</Text>
                                            }
                                        </View>

                                    </View>


                                    <View style={styles.Attanempinfoview}>
                                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                            <Text style={styles.listtxt}>Time In :</Text>
                                        </View>

                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            {item.AttendanceTimeIN == null || item.AttendanceTimeIN == undefined ?
                                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: '700' }}>Missing</Text>
                                                :
                                                <Text style={styles.listSubtxt}>{moment(item.AttendanceTimeIN).format("hh:mm A")}</Text>
                                            }
                                        </View>

                                    </View>



                                    <View style={styles.Attanempinfoview}>
                                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                            <Text style={styles.listtxt}>Time Out :</Text>
                                        </View>

                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>

                                            {item.AttendanceTimeOut == null ?
                                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: '700' }}>Missing</Text>
                                                :
                                                <Text style={styles.listSubtxt}>{moment(item.AttendanceTimeOut).format("hh:mm A")}</Text>
                                            }
                                            {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                        </View>

                                    </View>

                                    {item.AttendanceTimeOut !== null && item.AttendanceTimeIN !== null ?
                                        <View style={styles.Attanempinfoview}>
                                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                <Text style={styles.listtxt}>Attended Time :</Text>
                                            </View>

                                            
                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                {item.TimeInMins > 0 ?
                                                // <Text style={styles.listSubtxt}>{moment().startOf('day').add(item.TimeInMins, 'minutes').format('hh:mm') + ' Hrs'}</Text>

                                                <Text style={styles.listSubtxt}>{timeConvert(item.TimeInMins)}</Text>

                                                :
                                               <Text style={styles.listSubtxt}>0</Text>
                                                }
                                            </View>

                                        </View> :
                                        null
                                    }


                                    {item.Late !== '00:00:00' ?
                                        <View style={styles.Attanempinfoview}>
                                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                                <Text style={styles.listtxt}>Late :</Text>
                                            </View>

                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                <Text style={{ padding: wp('1%'), fontSize: wp('3.6%'), color: '#FF2E00', fontWeight: "700" }}>
                                                    {item.Late}
                                                </Text>
                                                {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                            </View>

                                        </View>
                                        : null
                                    }
                                </>
                            }
                        </>

                    }



                    {/* {item.AttStatus > 1 ?
                        <View style={styles.Attanempinfoview}>
                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                {
                                item.Extra.charAt(0).toUpperCase()== 'E'?
                                <Text style={styles.listtxt}>Extra Time :</Text> :
                                <Text style={styles.listtxt}>Short Time :</Text>
                                }
                            </View>

                    
                            <View style={{ flex: 2, justifyContent: 'center' }}>


                              {
                                item.Extra.charAt(0).toUpperCase()== 'E'?
                                <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: 'green',
                                    fontWeight: "700"
                                }}>
                                    
                                </Text> :
                                <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: '#FF2E00',
                                    fontWeight: "700"
                                }}>{moment(item.Extra, 'hh:mm:ss').format("HH:mm:ss ")}
                                </Text>

                               }
 </View>
 </View> : null} */}

                    {/* <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: 'green',
                                    fontWeight: "700"
                                }}>{moment(item.Extra, 'hh:mm:ss').format("hh:mm:ss ")}
                                </Text> */}




                    {/* <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: 'green',
                                    fontWeight: "700"
                                }}>{item.Extra.charAt(0)}</Text>

                            </View> */}









                </View>
            </>



        )
    }

    // .........End: FlatList Function(_RenderItem) ........... //




    const _Refresh = () => {
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <ActivityIndicator size="small" color="#008080" />
        </View>
    }

    // ......... End: FlatList Function(_Refresh & getItemLayout ) ........... //

    const _ListHeader = () => {
        return (
            <View style={[styles.ViewSection, { marginBottom: wp('1%') }]}>

                <View style={{ marginHorizontal: wp('2%'), alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('2%'), }}>




                    {route.params.AttendancePeriodName == '' || route.params.AttendancePeriodName == null ?
                        <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
                        :
                        <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendancePeriodName}</Text>
                    }


                    {route.params.AttendanceFiscalName == '' || route.params.AttendanceFiscalName == null ?
                        <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
                        :
                        <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendanceFiscalName}</Text>
                    }

                </View>




                <View style={{ marginHorizontal: wp('2%'), marginBottom: wp('2%') }}>

                    <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.9, justifyContent: 'center' }}>
                            <Text style={styles.Attanemptxt}>Employee Name :</Text>

                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.Attanempsubtxt}>{apidata.length > 0 ? (apidata[0].FullName == null || apidata[0].FullName == '' ? 'N/A' : apidata[0].FullName) : 'N/A'}</Text>
                            {/* <Text style={styles.Attanempsubtxt}>{empworkinghrs.length > 0 ? (empworkinghrs[0] == null || empworkinghrs[0] == '' ? 'N/A' : empworkinghrs[0]) + ' Hrs' : 'N/A'}</Text> */}

                            {/* {empworkinghrs.length > 0 ? (empworkinghrs[0] == null || empworkinghrs[0] == '' ? 'N/A' : empworkinghrs[0]) + ' Hrs' : 'N/A'} */}
                        </View>

                    </View>


                    <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.9, justifyContent: 'center' }}>
                            <Text style={styles.Attanemptxt}>Total Working Hours :</Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>

                            {/* <Text style={[styles.Attanempsubtxt, { color: '#0041c4' }]}>{apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}</Text> */}
                            <Text style={styles.Attanempsubtxt}>{empworkinghrs.length > 0 ? (empworkinghrs[0] == null || empworkinghrs[0] == '' ? 'N/A' : empworkinghrs[0]) + ' Hrs' : 'N/A'}</Text>

                            {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                        </View>

                    </View>
                </View>

            </View>

        )
    }
    return (

        <View style={styles.AttanMainContainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <ActivityIndicator size="small" color="#008080" />
                </View>

                :
                <>

                   
                    <View >
                        <FlatList
                            data={apidata}
                            renderItem={_RenderItem}
                            // keyExtractor={keyExtractorVisit}
                            refreshing={_Refresh}
                            // getItemLayout={getItemLayout}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={_ListHeader}
                        />
                    </View>
                </>
            }
        </View >

    );
}
const styles = StyleSheet.create({
    AttanMainContainer: {
        flex: 1,
        backgroundColor: '#D8D8D8',

    },
    ViewSection: {

        backgroundColor: '#fff',
        marginTop: wp('1.5%'),
        marginHorizontal: wp('1%'),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBCBCB',
        paddingBottom: wp('2%'),


    },
    Attanempinfoview: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#D8D8D8',
        marginHorizontal: wp('2%'),
        paddingTop: wp('1%')
    },

    Attanemptxt: {
        paddingTop: wp('2%'),
        color: 'black',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    Attanempsubtxt: {
        paddingTop: wp('2%'),
        fontSize: wp('3.6%'),
    },
    listtxt: {
        padding: wp('1%'),
        color: 'black',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    listSubtxt: {
        padding: wp('1%'),
        fontSize: wp('3.6%'),
        color: '#777',
        fontWeight: "700"
    }

})