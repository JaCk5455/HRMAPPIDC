import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../constants/constants';
import { Helper } from '../../Components/Helpers';
import moment from 'moment';
import { Picker, Item } from "native-base";
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
// import { ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window');


export default function MainAttendanceScreen({ navigation , route}) {

    const [data, SetData] = useState([]);
    const [apidata, setApiData] = useState([]);
    const [loading, IsLoading] = useState(true);
    const [yearapidata, setYearApiData] = useState([]);
    const [monthapidata, SetMonthApiData] = useState([]);
    const [maxfiscalid, setMaxFiscalId] = useState(null);
    const [maxperiodid, setMaxPeriodId] = useState(null);




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
        if (data.length > 0 && maxperiodid !== null) {
            // console.log('cccc', route.params.AttendancePeriodId.PeriodId);
            AttandanceApiCall();
        }
    }, [data, maxperiodid])
    // ......... End:  AttandaveApiCall useEffect ........ //



    // .......... Begin: Fiscalyear useEffect ........... //
    useEffect(() => {
        FicicalYearApiCall();
    }, [])
    // ........... End: Fiscalyear useEffect ...........//




    useEffect(() => {
        let Maxfiscalvalue = [];
        if (yearapidata.length > 0) {

            Maxfiscalvalue = Math.max.apply(Math, yearapidata.map((item) => {
                return item.fiscalyearid;
            }))



            // yearapidata.map((item) => {
            //     Maxfiscalvalue = Math.max(item.fiscalyearid)
            // })
            // console.log('map lop', Maxfiscalvalue);

            setMaxFiscalId(Maxfiscalvalue);
          //  console.log('maxfiscalvalue' , maxfiscalid)
        }
    }, [yearapidata])



    useEffect(() => {
        if (maxfiscalid !== null) {
            // console.log('aaa', yearapidata[0].fiscalyearid)
            MonthApiCall();
        }
    }, [maxfiscalid])



    useEffect(() => {
        let abc = [];
        let minPeriodValue;
        if (monthapidata.length > 0) {
            // monthapidata.map((value) => {
            //     // abc = value.IsPayGenerated
            //     if (value.IsPayGenerated == 1) {
            //         MaxPeriodValue = Math.max(value.PeriodId + 1)
            //     }
            //     // abc.push(MaxPeriodValue + 1)

            // })


            minPeriodValue = Math.min.apply(Math, monthapidata.map((item) => {
                if (item.IsPayGenerated == 0) {
                    //    console.log('aaa', item.PeriodId)
                    return item.PeriodId;
                }
                else {
                    return Infinity;
                }

            }))


//console.log('minPeriodValue' , minPeriodValue)
            setMaxPeriodId(minPeriodValue)
            // setMaxPeriodId(abc)

            //  console.log('maxperidvalue', MaxPeriodValue)

        }

    }, [monthapidata])





    //............. Begin: Year Api Data ............... //   
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
            //     console.log('aaa', payloadData)
                if (payloadData.length > 0) {
                    //console.log('fescalyear', payloadData)
                    setYearApiData(payloadData);
                    // IsLoading(false);
                }
                else {
                    Alert.alert('Error')
                }
            }
        }
        catch (e) {
            console.log('YearApiError', e);
        }
    }
    //............. End: Year Api Data ............... //



    //............. Begin: Month Api Data ............... //
    const MonthApiCall = async () => {
        try {

            // const response = await fetch(Contants.API_URL + 'EmployeeInfo/FiscalYearPeriodList?fiscalyearId=' + maxfiscalid, {
                const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalYearPeriodList', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fiscalYearId: maxfiscalid

                })
            });
            const responseObj = await response.json();
            //console.log(responseObj)
            if (responseObj.statusCode == 200) {
                let payloaddata = JSON.parse(responseObj.payload);
                // console.log('month', payloaddata)
                if (payloaddata.length > 0) {
                    SetMonthApiData(payloaddata);
                    // IsLoading(false);
                }
                else {
                    Alert.alert('Error')
                }
            }
        }
        catch (e) {
            console.log('MonthApiError', e);
        }
    }
    //............. End: Month Api Data ............... //



    // ........... Begin: AttandanceApiCall ....... //
    const AttandanceApiCall = async () => {
        try {
           //  console.log('abc', Contants.API_URL + 'EmployeeInfo/IndividualAttendanceDetail?Empid=' + data[0].EmpId + '&periodId=' + maxperiodid)
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/IndividualAttendanceDetail' , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId,
                    periodId: maxperiodid
                    // periodId: 104,
                    //  Empid: 277
                    

                })
            });
            const responseObj = await response.json();
            // console.log('responceapi', responseObj)
            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);
               // console.log('Attandancedata', payload)
                if (payload.length > 0) {
                    setApiData(payload);
                    IsLoading(false);
                }
                else {
                    Alert.alert(
                        "Alert",
                        " No record found for the current month.",
                        [
                            {
                                text: "Previous Record",
                                onPress: () => navigation.navigate("AttendanceFisicalScreen"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
                        ],
                        { cancelable: false }
                    )
                    // Alert.alert('No Attendance History Found')
                }
            }

        }
        catch (e) {
            console.log('AttandanceApiError', e);
            Alert.alert(
                "Alert",
                "Record Not Found, Please Contact HR Department",
                [
                    {
                        text: "Previous Record",
                        onPress: () => navigation.navigate("AttendanceFisicalScreen"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
                ],
                { cancelable: false }
            )
        }
    }
    // ........... End: AttandanceApiCall ....... //


    // .........Begin: FlatList Function(_RenderItem) ........... //
    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }

    function ItemView({ item }) {
        return (

            <>
                <View style={{ marginHorizontal: wp('2%') }}>
                    <Text style={{
                        color: 'black',
                        fontSize: wp('4%'),
                        fontWeight: 'bold', padding: wp('1%')
                    }}>{moment(item.Todate).format("MMMM D, YYYY")}</Text>
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



                    <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                            <Text style={styles.listtxt}>Day :</Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.listSubtxt}>
                                {
                                    item.DayName
                                }
                            </Text>



                            {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                        </View>

                    </View>

                    <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.7, justifyContent: 'center' }}>
                            <Text style={styles.listtxt}>Time In :</Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.listSubtxt}>{moment(item.SignIn, 'hh:mm:ss').format("hh:mm A")}</Text>

                            {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                        </View>

                    </View>

                    {item.AttStatus > 1 ?


                        <>
                            <View style={styles.Attanempinfoview}>
                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                    <Text style={styles.listtxt}>Time Out :</Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={styles.listSubtxt}>{moment(item.SignOut, 'hh:mm:ss').format("hh:mm A")}</Text>
                                    {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                </View>

                            </View>

                            <View style={styles.Attanempinfoview}>
                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                    <Text style={styles.listtxt}>Attended Time :</Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={styles.listSubtxt}>{moment(item.AttendedTime, 'hh:mm').format("hh:mm ") + 'Hrs'}</Text>
                                    {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                </View>

                            </View>
                        </>
                        :
                        <>
                            <View style={styles.Attanempinfoview}>
                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                    <Text style={styles.listtxt}>Time Out :</Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={{
                                        padding: wp('1%'),
                                        fontSize: wp('3.6%'),
                                        color: '#FF2E00',
                                        fontWeight: '700'
                                    }}>Missing</Text>
                                    {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                </View>

                            </View>

                            <View style={styles.Attanempinfoview}>
                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                    <Text style={styles.listtxt}>Attended Time :</Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={styles.listSubtxt}>--</Text>
                                    {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                </View>

                            </View>
                        </>}


                    {item.AttStatus > 1 ?
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
                                    {moment(item.Extra, 'hh:mm:ss').format("HH:mm:ss")}
                                    {/* {item.Extra} */}
                                </Text> :
                                <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: '#FF2E00',
                                    fontWeight: "700"
                                }}>{moment(item.Extra, 'hh:mm:ss').format("HH:mm:ss ")}
                                </Text>

                               }


                                {/* <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: 'green',
                                    fontWeight: "700"
                                }}>{moment(item.Extra, 'hh:mm:ss').format("hh:mm:ss ")}
                                </Text> */}

                            </View>


{/* <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{
                                    padding: wp('1%'),
                                    fontSize: wp('3.6%'),
                                    color: 'green',
                                    fontWeight: "700"
                                }}>{item.Extra.charAt(0)}</Text>

                            </View> */}




                        </View> : null}


                    {
                        //item.Late !== '00:00:00' && item.AttendedTime < "08:00" ?
                        item.Late !== '00:00:00' ?
                            <View style={styles.Attanempinfoview}>
                                <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                    <Text style={styles.listtxt}>Late :</Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={{
                                        padding: wp('1%'),
                                        fontSize: wp('3.6%'),
                                        color: '#FF2E00',
                                        fontWeight: "700"
                                    }}>{item.Late}</Text>
                                    {/* <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text> */}

                                </View>

                            </View>

                            : null}


                </View>
            </>



        )
    }

    // .........End: FlatList Function(_RenderItem) ........... //

    const _Refresh = () => { return(
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <ActivityIndicator size="small" color="#008080" />
        </View>
    )
    }

    // ......... End: FlatList Function(_Refresh & getItemLayout ) ........... //

    const _ListHeader =()=>{
return(
    <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: 8, flexDirection: 'column', padding: wp('1%') }}>
                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Total Working Hours</Text>


                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                        {apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}
                    </Text>
                </View>


                <View style={{ flex: 1.5, marginTop: wp('2%'), borderRadius: 8, padding: wp('1%'), backgroundColor: '#0041c4', marginHorizontal: wp('1.5%'), justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AttendanceFisicalScreen', {
                            // FiscalYears: yearapidata
                        })
                    }}
                    >
                       
                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: wp('3%') }}>
                            Previous Record
                                </Text>


                    </TouchableOpacity>
                </View>
                </View>
)
    }



    return (
        <View style={styles.AttanMainContainer}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />


            


            {/* <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: 8, flexDirection: 'column', padding: wp('1%') }}>
                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Total Working Hours</Text>


                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                        {apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}
                    </Text>
                </View>


                <View style={{ flex: 1.5, marginTop: wp('2%'), borderRadius: 8, padding: wp('1%'), backgroundColor: '#0041c4', marginHorizontal: wp('1.5%'), justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AttendanceFisicalScreen', {
                            // FiscalYears: yearapidata
                        })
                    }}
                    >
                       
                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: wp('3%') }}>
                            Previous Record
                                </Text>


                    </TouchableOpacity>
                </View>

            </View> */}

            {/* <View style={{ marginHorizontal: wp('2%'), marginBottom: wp('2%') }}>

                 <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.9, justifyContent: 'center' }}>
                            <Text style={styles.Attanemptxt}>Employee Name :</Text>

                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.Attanempsubtxt}>{apidata.length > 0 ? (apidata[0].FullName == null || apidata[0].FullName == '' ? 'N/A' : apidata[0].FullName) : 'N/A'}</Text>

                        </View>

                    </View> 


                 <View style={styles.Attanempinfoview}>
                        <View style={{ flex: 1.9, justifyContent: 'center' }}>
                            <Text style={styles.Attanemptxt}>Total Working Hours :</Text>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center' }}>

                            <Text style={[styles.Attanempsubtxt, { color: '#0041c4' }]}>{apidata.length > 0 ? (apidata[0].EmpWorkingHours == null || apidata[0].EmpWorkingHours == '' ? 'N/A' : apidata[0].EmpWorkingHours) + ' Hrs' : 'N/A'}</Text>


                        </View>

                    </View>

            </View> */}

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
                            ListHeaderComponent = {_ListHeader}
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

        resizeMode: 'contain',
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