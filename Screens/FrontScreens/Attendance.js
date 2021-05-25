// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StatusBar, StyleSheet, Alert } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import * as Contants from '../../constants/constants';
// import { Helper } from '../../Components/Helpers';
// import moment from 'moment';
// import Collapsible from 'react-native-collapsible';


// export default function AttendanceScreen({ navigation, route }) {

//     const [data, SetData] = useState([]);
//     const [apidata, setApiData] = useState([]);
//     const [loading, IsLoading] = useState(true);


//     // ......... Begin: AsynStorageData for EmpId ........ //
//     useEffect(() => {

//         Helper.getLoggedInData().then((response) => {
//             SetData(response);

//         }).catch((e) => {
//             console.log('eee', e);
//         });

//     }, [])
//     // ......... End: AsynStorageData for EmpId ........ //



//     // ......... Begin:  AttandaveApiCall useEffect ........ //
//     useEffect(() => {
//         if (data.length > 0) {
//             // console.log('cccc', route.params.AttendancePeriodId.PeriodId);
//             AttandanceApiCall();
//         }
//     }, [data])
//     // ......... End:  AttandaveApiCall useEffect ........ //




//     // ........... Begin: AttandanceApiCall ....... //
//     const AttandanceApiCall = async () => {
//         try {
//             // console.log('abc', Contants.API_URL + 'EmployeeInfo/IndividualAttendanceDetail?Empid=' + data[0].EmpId + '&periodId=' + route.params.AttendancePeriodId)
//             //  console.log('abc', Contants.API_URL + 'EmployeeInfo/EmployeeSalarySlip?Empid=' + data[0].EmpId + '&periodId=' + route.params.SalPeriodId)
//             const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/IndividualAttendanceDetail' , {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },

//                 body: JSON.stringify({
//                     Empid: data[0].EmpId,
//                     periodId: route.params.AttendancePeriodId

//                 })
//             });
//             const responseObj = await response.json();
//             // console.log('responceapi', responseObj)
//             if (responseObj.statusCode == 200) {
//                 let payload = JSON.parse(responseObj.payload);
//                // console.log('aaa', payload)
//                 if (payload.length > 0) {
//                     setApiData(payload);
//                     IsLoading(false);
//                 }
//                 else {
//                     Alert.alert(
//                         "Alert",
//                         "Record Not Found, Please Contact HR Department",
//                         [
//                             {
//                                 text: "Home",
//                                 onPress: () => navigation.navigate("HomeScreen"),
//                                 style: "cancel"
//                             },
//                             { text: "Ok", onPress: () => navigation.navigate("AttendanceFisicalScreen") }
//                         ],
//                         { cancelable: false }
//                     )
//                     // Alert.alert('No Attendance History Found')
//                 }
//             }

//         }
//         catch (e) {
//             console.log('Error', e);
//         }
//     }
//     // ........... End: AttandanceApiCall ....... //




//     // .........Begin: FlatList Function(_RenderItem) ........... //
//     const _RenderItem = ({ item }) => {
//         return <ItemView item={item} />
//     }

//     function ItemView({ item }) {
//         return (

//             <>
//                 <View style={{ marginHorizontal: wp('2%') }}>
//                     <Text style={{
//                         color: 'black',
//                         fontSize: wp('4%'),
//                         fontWeight: 'bold', padding: wp('1%')
//                     }}>{moment(item.Todate).format("MMMM D, YYYY")}</Text>
//                 </View>





//                 <View style={{
//                     flex: 1,
//                     borderWidth: 2,
//                     borderColor: '#CBCBCB',
//                     marginHorizontal: wp("1%"),
//                     borderRadius: 10,
//                     backgroundColor: '#fff',
//                     marginBottom: wp('1%'),
//                     padding: wp('1%')
//                 }}>



//                     <View style={styles.Attanempinfoview}>
//                         <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                             <Text style={styles.listtxt}>Day :</Text>
//                         </View>

//                         <View style={{ flex: 2, justifyContent: 'center' }}>
//                             <Text style={styles.listSubtxt}>
//                                 {
//                                     item.DayName
//                                 }
//                             </Text>



//                             {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                         </View>

//                     </View>

//                     <View style={styles.Attanempinfoview}>
//                         <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                             <Text style={styles.listtxt}>Time In :</Text>
//                         </View>

//                         <View style={{ flex: 2, justifyContent: 'center' }}>
//                             <Text style={styles.listSubtxt}>{moment(item.SignIn, 'hh:mm:ss').format("hh:mm A")}</Text>

//                             {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                         </View>

//                     </View>

//                     {item.AttStatus > 1 ?


//                         <>
//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                     <Text style={styles.listtxt}>Time Out :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={styles.listSubtxt}>{moment(item.SignOut, 'hh:mm:ss').format("hh:mm A")}</Text>
//                                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                                 </View>

//                             </View>

//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                     <Text style={styles.listtxt}>Attended Time :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={styles.listSubtxt}>{moment(item.AttendedTime, 'hh:mm').format("hh:mm ") + 'Hrs'}</Text>
//                                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                                 </View>

//                             </View>
//                         </>
//                         :
//                         <>
//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                     <Text style={styles.listtxt}>Time Out :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={{
//                                         padding: wp('1%'),
//                                         fontSize: wp('3.6%'),
//                                         color: '#FF2E00',
//                                         fontWeight: '700'
//                                     }}>Missing</Text>
//                                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                                 </View>

//                             </View>

//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                     <Text style={styles.listtxt}>Attended Time :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={styles.listSubtxt}>--</Text>
//                                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                                 </View>

//                             </View>
//                         </>}









//                         {item.AttStatus > 1 ?
//                         <View style={styles.Attanempinfoview}>
//                             <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                 {
//                                 item.Extra.charAt(0).toUpperCase()== 'E'?
//                                 <Text style={styles.listtxt}>Extra Time :</Text> :
//                                 <Text style={styles.listtxt}>Short Time :</Text>
//                                 }
//                             </View>

                    
//                             <View style={{ flex: 2, justifyContent: 'center' }}>


//                             {
//                                 item.Extra.charAt(0).toUpperCase()== 'E'?
//                                 <Text style={{
//                                     padding: wp('1%'),
//                                     fontSize: wp('3.6%'),
//                                     color: 'green',
//                                     fontWeight: "700"
//                                 }}>
//                                     {moment(item.Extra, 'hh:mm:ss').format("HH:mm:ss")}
//                                     {/* {item.Extra} */}
//                                 </Text> :
//                                 <Text style={{
//                                     padding: wp('1%'),
//                                     fontSize: wp('3.6%'),
//                                     color: '#FF2E00',
//                                     fontWeight: "700"
//                                 }}>{moment(item.Extra, 'hh:mm:ss').format("HH:mm:ss ")}
//                                 </Text>

//                                }


//                                 {/* <Text style={{
//                                     padding: wp('1%'),
//                                     fontSize: wp('3.6%'),
//                                     color: 'green',
//                                     fontWeight: "700"
//                                 }}>{moment(item.Extra, 'hh:mm:ss').format("hh:mm:ss ")}
//                                 </Text> */}

//                             </View>


// {/* <View style={{ flex: 2, justifyContent: 'center' }}>
//                                 <Text style={{
//                                     padding: wp('1%'),
//                                     fontSize: wp('3.6%'),
//                                     color: 'green',
//                                     fontWeight: "700"
//                                 }}>{item.Extra.charAt(0)}</Text>

//                             </View> */}




//                         </View> : null}
//                     {/* {item.AttStatus > 1 ?
//                         <View style={styles.Attanempinfoview}>
//                             <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                 <Text style={styles.listtxt}>Extra :</Text>
//                             </View>

//                             <View style={{ flex: 2, justifyContent: 'center' }}>
//                                 <Text style={{
//                                     padding: wp('1%'),
//                                     fontSize: wp('3.6%'),
//                                     color: 'green',
//                                     fontWeight: "700"
//                                 }}>{moment(item.Extra, 'hh:mm:ss').format("hh:mm:ss ")}</Text>

//                             </View>

//                         </View> : null} */}


//                     {
//                         //item.Late !== '00:00:00' && item.AttendedTime < "08:00" ?
//                         item.Late !== '00:00:00' ?
//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.7, justifyContent: 'center' }}>
//                                     <Text style={styles.listtxt}>Late :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={{
//                                         padding: wp('1%'),
//                                         fontSize: wp('3.6%'),
//                                         color: '#FF2E00',
//                                         fontWeight: "700"
//                                     }}>{item.Late}</Text>
//                                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                                 </View>

//                             </View>

//                             : null}


//                 </View>
//             </>



//         )
//     }

//     // .........End: FlatList Function(_RenderItem) ........... //




//     const _Refresh = () => {
//         <View style={{ flex: 1, justifyContent: 'center' }}>

//             <ActivityIndicator size="small" color="#008080" />
//         </View>
//     }

//     // ......... End: FlatList Function(_Refresh & getItemLayout ) ........... //

// const _ListHeader = () =>{
//     return(
//         <View style={[styles.ViewSection, { marginBottom: wp('1%') }]}>

//          <View style={{ marginHorizontal: wp('2%'), alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('2%'), }}>




//             {route.params.AttendancePeriodName == '' || route.params.AttendancePeriodName == null ?
//                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
//                 :
//                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendancePeriodName}</Text>
//             }


//             {route.params.AttendanceFiscalName == '' || route.params.AttendanceFiscalName == null ?
//                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
//                 :
//                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendanceFiscalName}</Text>
//             }

//          </View>




//          <View style={{ marginHorizontal: wp('2%'), marginBottom: wp('2%') }}>

//             <View style={styles.Attanempinfoview}>
//                 <View style={{ flex: 1.9, justifyContent: 'center' }}>
//                     <Text style={styles.Attanemptxt}>Employee Name :</Text>

//                 </View>

//                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                     <Text style={styles.Attanempsubtxt}>{apidata.length > 0 ? (apidata[0].FullName == null || apidata[0].FullName == '' ? 'N/A' : apidata[0].FullName) : 'N/A'}</Text>

//                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].EmployeeName == null || infodata[0].EmployeeName == '' ? 'N/A' : infodata[0].EmployeeName) : 'N/A'}</Text> */}
//                 </View>

//             </View>


//             <View style={styles.Attanempinfoview}>
//                 <View style={{ flex: 1.9, justifyContent: 'center' }}>
//                     <Text style={styles.Attanemptxt}>Total Working Hours :</Text>
//                 </View>

//                 <View style={{ flex: 2, justifyContent: 'center' }}>

//                     <Text style={[styles.Attanempsubtxt, { color: '#0041c4' }]}>{apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}</Text>

//                     {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

//                 </View>

//             </View>
//          </View>

//     </View>

//     )
// }
//     return (

//         <View style={styles.AttanMainContainer}>
//             <StatusBar backgroundColor='#008080' barStyle="light-content" />

//             {loading ?
//                 <View style={{ flex: 1, justifyContent: 'center' }}>

//                     <ActivityIndicator size="small" color="#008080" />
//                 </View>

//                 :
//                 <>

//                     {/* <View style={[styles.ViewSection, { marginBottom: wp('1%') }]}>

//                         <View style={{ marginHorizontal: wp('2%'), alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('2%'), }}>




//                             {route.params.AttendancePeriodName == '' || route.params.AttendancePeriodName == null ?
//                                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
//                                 :
//                                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendancePeriodName}</Text>
//                             }


//                             {route.params.AttendanceFiscalName == '' || route.params.AttendanceFiscalName == null ?
//                                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>N/A</Text>
//                                 :
//                                 <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#0041c4' }}>{route.params.AttendanceFiscalName}</Text>
//                             }

//                         </View>




//                         <View style={{ marginHorizontal: wp('2%'), marginBottom: wp('2%') }}>

//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.9, justifyContent: 'center' }}>
//                                     <Text style={styles.Attanemptxt}>Employee Name :</Text>

//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>
//                                     <Text style={styles.Attanempsubtxt}>{apidata.length > 0 ? (apidata[0].FullName == null || apidata[0].FullName == '' ? 'N/A' : apidata[0].FullName) : 'N/A'}</Text>

//                                 </View>

//                             </View>


//                             <View style={styles.Attanempinfoview}>
//                                 <View style={{ flex: 1.9, justifyContent: 'center' }}>
//                                     <Text style={styles.Attanemptxt}>Total Working Hours :</Text>
//                                 </View>

//                                 <View style={{ flex: 2, justifyContent: 'center' }}>

//                                     <Text style={[styles.Attanempsubtxt, { color: '#0041c4' }]}>{apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}</Text>


//                                 </View>

//                             </View>
//                         </View>

//                     </View> */}

//                     <View >
//                         <FlatList
//                             data={apidata}
//                             renderItem={_RenderItem}
//                             // keyExtractor={keyExtractorVisit}
//                             refreshing={_Refresh}
//                             // getItemLayout={getItemLayout}
//                             keyExtractor={(item, index) => index.toString()}
//                             ListHeaderComponent = {_ListHeader}
//                         />
//                     </View>
//                 </>
//             }
//         </View >

//     );
// }
// const styles = StyleSheet.create({
//     AttanMainContainer: {
//         flex: 1,
//         backgroundColor: '#D8D8D8',

//     },
//     ViewSection: {

//         backgroundColor: '#fff',
//         marginTop: wp('1.5%'),
//         marginHorizontal: wp('1%'),
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#CBCBCB',
//         paddingBottom: wp('2%'),


//     },
//     Attanempinfoview: {
//         flexDirection: 'row',
//         borderBottomWidth: 0.5,
//         borderColor: '#D8D8D8',
//         marginHorizontal: wp('2%'),
//         paddingTop: wp('1%')
//     },

//     Attanemptxt: {
//         paddingTop: wp('2%'),
//         color: 'black',
//         fontSize: wp('4%'),
//         fontWeight: 'bold'
//     },
//     Attanempsubtxt: {
//         paddingTop: wp('2%'),
//         fontSize: wp('3.6%'),
//     },
//     listtxt: {
//         padding: wp('1%'),
//         color: 'black',
//         fontSize: wp('4%'),
//         fontWeight: 'bold'
//     },
//     listSubtxt: {
//         padding: wp('1%'),
//         fontSize: wp('3.6%'),
//         color: '#777',
//         fontWeight: "700"
//     }

// })