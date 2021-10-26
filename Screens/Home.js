import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Helper } from '../Components/Helpers';
import * as Contants from '../constants/constants';

const { height, width } = Dimensions.get('window');



export default function HomeScreen() {
    const navigation = useNavigation();
    const [data, SetData] = React.useState([]);
    const [yearapidata, setYearApiData] = React.useState([]);
    const [monthapidata, setMonthApiData] = React.useState([]);
    
    const [maxfiscalid, setMaxFiscalId] = React.useState(null);
    const [maxperiodid, setMaxPeriodId] = React.useState(null);
    const [leave, setLeave] = React.useState([])
    const [absent, setAbsent] = React.useState([])
    const [late, setLate] = React.useState([])
    const [managerst, setManagerSt] = React.useState([])

    const [gridItems, setGridItems] = React.useState(
        [
            { name: 'Leaves', icon: require('../assets/EmpLeaves.png'), navigateTo: 'MainLeaveScreen' },
            { name: 'Salary Slip', icon: require('../assets/empsalary.png'), navigateTo: 'MainSalarySlip' },
            { name: 'Attendance', icon: require('../assets/Attendancee.png'), navigateTo: 'MainAttendanceScreen' },
            // { name: 'Encashment', icon: require('../assets/Encashment.jpg'), navigateTo: 'EncashmentScreen' },
            { name: 'Loan Application', icon: require('../assets/loanapplication.jpg'), navigateTo: 'LoanApplicationScreen'},

        ]
    )

    // const gridItems = [
    //     { name: 'Leaves', icon: require('../assets/EmpLeaves.png'), navigateTo: 'MainLeaveScreen' },
    //     { name: 'Salary Slip', icon: require('../assets/empsalary.png'), navigateTo: 'MainSalarySlip' },
    //     { name: 'Attendance', icon: require('../assets/Attendancee.png'), navigateTo: 'MainAttendanceScreen' },
    //     // { name: 'Encashment', icon: require('../assets/Encashment.jpg'), navigateTo: 'EncashmentScreen' },
    //     { name: 'Loan Application', icon: require('../assets/loanapplication.jpg'), navigateTo: 'LoanApplicationScreen' },

    //     { name: 'Leaves Approvals', icon: require('../assets/LeaveAprove.png'), navigateTo: 'LeavesApprovalStatusScreen'}

    // ];


    // ......... Begin: AsynStorageData for EmpId ........ //
    React.useEffect(() => {
        Helper.getLoggedInData().then((response) => {
            SetData(response);
            // console.log("aaa", data)

        }).catch((e) => {
            console.log('eee', e);
        });

    }, [])
    // ......... End: AsynStorageData for EmpId ........ //



    // .......... Begin: Fiscalyear useEffect ........... //
    React.useEffect(() => {
        FicicalYearApiCall();
    }, [])
    // ........... End: Fiscalyear useEffect ...........//

    //............. Begin: Get MaxFiscalyearValue ........//
    React.useEffect(() => {
        let Maxfiscalvalue = [];
        if (yearapidata.length > 0) {
            Maxfiscalvalue = Math.max.apply(Math, yearapidata.map((item) => {
                return item.fiscalyearid;
            }))

            setMaxFiscalId(Maxfiscalvalue);
            //console.log("maxFId", Maxfiscalvalue)
        }

    }, [yearapidata])
    //............. End: Get MaxFiscalyearValue ........//



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
            if (responseObj.statusCode == 200) {
                let payloadData = JSON.parse(responseObj.payload);

                if (payloadData.length > 0) {

                    setYearApiData(payloadData);

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


    React.useEffect(() => {

        if (maxfiscalid !== null) {
            MonthApiCall();
        }

    }, [maxfiscalid])






    // .......... Begin: MonthApi useEffect ........... //
    React.useEffect(() => {


       
            let minPeriod;
            if (monthapidata.length > 0) {

                minPeriod = Math.min.apply(Math, monthapidata.map((item) => {

                    if (item.IsPayGenerated == 0) {
                        return item.PeriodId;

                    }
                    else {
                        return Infinity;
                    }

                }))

                setMaxPeriodId(minPeriod)


                console.log('maxperidvalue', maxperiodid)

            }
   


    }, [monthapidata])
    // .......... End: MonthApi useEffect ........... //




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
            if (responseObj.statusCode == 200) {
                let payloaddata = JSON.parse(responseObj.payload);
                // console.log('month', payloaddata)
                if (payloaddata.length > 0) {
                    setMonthApiData(payloaddata);
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




    React.useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (data.length > 0 && maxfiscalid !== null && maxperiodid !== null)
            getPersonalRecord(signal)

    }, [data, maxfiscalid , maxperiodid ])



    //..................Begin: GetPersonalData .....................//

    const getPersonalRecord = async (signal) => {
        try {

            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/SelfCount', {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId,
                    // Empid: 277,
                    // FiscalYearId: 10,
                    // fromPeriodId: 113,
                    // ToPeriodId: 113,
                    FiscalYearId: maxfiscalid,
                        fromPeriodId: maxperiodid,
                        ToPeriodId: maxperiodid

                })
            });
            const responseObj = await response.json();

            if (responseObj.statusCode == 200) {

                let payloadData = JSON.parse(responseObj.payload);
                //  console.log("apidata", payloadData)
                if (payloadData.Table.length > 0) {
                    setLeave(payloadData.Table);

                }

                if (payloadData.Table1.length > 0) {
                    setAbsent(payloadData.Table1);


                }


                if (payloadData.Table2.length > 0) {
                    setLate(payloadData.Table2);

                }

                if (payloadData.Table3.length > 0) {
                    setManagerSt(payloadData.Table3);

                    let A = payloadData.Table3;
                    if (A.length && A[0].managerst == 1) {
                        let B = gridItems;
                        let checkIfLeaveApprovalExist = B.filter(x => x.name == 'Leaves Approvals').length;
                        if (!checkIfLeaveApprovalExist) {
                            B.push({ name: 'Leaves Approvals', icon: require('../assets/LeaveAprove.png'), navigateTo: 'LeavesApprovalStatusScreen' })
                            setGridItems(B)
                        }
                    }
                    else {
                        let B = gridItems;
                        let checkIfLeaveApprovalExist = B.filter(x => x.name == 'Leaves Approvals').length;
                        if (checkIfLeaveApprovalExist) {
                            B.pop()
                            setGridItems(B)
                        }
                    }


                }

            }

        }
        catch (error) {
            console.log('Error', error);
        }
    }
    //..................End: GetPersonalData .....................//



    const _ListHeader = () => {
        return (
            <View>
                <View style={styles.Lst_Header}>
                    <View style={{ borderWidth: 0.5, borderRadius: wp("1%"), marginBottom: wp("3%"), borderColor: '#008080', backgroundColor: '#008080' }}>
                        <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Attandance Details</Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                Late:
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "red", fontSize: wp("3%") }}>
                                {late.length > 0 ? (late[0].Late == "" || late[0].Late == null ? "N/A" : (late[0].Late > 1 ? late[0].Late + " Days" : late[0].Late + ' Day')) : 'N/A'}
                            </Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                Absant:
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "red", fontSize: wp("3%") }}>
                                {absent.length > 0 ? (absent[0].Absent == "" || absent[0].Absent == null ? "N/A" : (absent[0].Absent > 1 ? absent[0].Absent + " Days" : absent[0].Absent + ' Day')) : 'N/A'}
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                Leaves:
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "red", fontSize: wp("3%") }}>
                                {leave.length > 0 ? (leave[0].Leave == "" || leave[0].Leave == null ? "0" : leave[0].Leave) : "N/A"}
                            </Text>

                        </View>
                    </View>
                </View>

                {/* {abc[0].managersst == 1 ?
                    <View style={styles.Lst_Header}>

                        <View style={{ borderWidth: 0.5, borderRadius: wp("1%"), marginBottom: wp("3%"), borderColor: '#008080', backgroundColor: '#008080' }}>
                            <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Employee Daily Report</Text>

                        </View>

                        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                    Late:
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "red", fontSize: wp("3%") }}>
                                    {abc.length > 0 ? abc[0].TodayEmpLate : "N/A"}
                                </Text>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                    Absant:
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "red", fontSize: wp("3%") }}>
                                    {abc.length > 0 ? abc[0].TodayEmpAbsents: "N/A"}
                                </Text>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
                                    Leaves:
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "red", fontSize: wp("3%") }}>
                                    {abc.length > 0 ? abc[0].TodayEmpOnLeave:'N/A'}
                                </Text>

                            </View>
                        </View>

                        <View style={{ marginBottom: wp("1%"), marginTop: wp("2%") }}>

                            <TouchableOpacity onPress={() => navigation.navigate('LeavesApprovalStatusScreen')}
                                style={{ backgroundColor: 'orange', borderWidth: 0.5, borderRadius: wp("2%"), borderColor: 'orange', }}>
                                <AntDesign name="rightcircleo" size={wp('6%')} color="#777" style={{ position: "absolute", right: Platform.isPad ? 5 : 2, top: "15%" }} />
                                <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Pending Leaves Aprovals/Rejections</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : <></>} */}

            </View>

        )
    }

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />


            {/* <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Islamabad Diagnostic Center Pvt. Ltd.</Text>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: wp('1%') }}> Welcome!</Text>
            </View> */}


            {/* <View style={styles.behind}> */}
            <View style={{ flex: 1, marginHorizontal: wp("3%"), marginTop: wp("3%") }}>

                <FlatList
                    data={gridItems}
                    // contentContainerStyle={{ paddingBottom: 200 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                shadowColor: 'rgb(0,0,0)',
                                shadowOffset: {
                                    width: 1,
                                    height: 1
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                elevation: 8,
                                backgroundColor: '#fff',
                                padding: 10,
                                margin: 10,
                                width: '45%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => { item.navigateTo ? navigation.navigate(item.navigateTo) : "" }}
                        >

                            <Image source={item.icon} style={{ width: wp('13%'), height: wp('13%'), marginBottom: wp('3%'), }} />
                            <Text style={{ color: "black" }}>{item.name}</Text>

                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={_ListHeader}

                />
            </View>

        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        // marginHorizontal: wp('5%'),
        // backgroundColor: '#0041c4',
        backgroundColor: '#008080',
        height: hp('18%'),
        width: wp('100%')
        // width: Dimensions.get('window').width

    },
    headerText: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        marginTop: wp('5%'),
        textAlign: 'center'
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
    },
    behind: {
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: hp('26%'),
        width: '100%',
        height: '100%',
        paddingHorizontal: '5%',
    },

    Lst_Header: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 4,
        padding: wp('4%'),
        shadowRadius: 3
    }
});