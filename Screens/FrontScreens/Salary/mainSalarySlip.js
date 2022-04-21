import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../../constants/constants';
import { Helper } from '../../../Components/Helpers';
const { height, width } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import * as WebBrowser from 'expo-web-browser';


export default function MainSalarySlip({ navigation }) {
    const [fisicalapidata, SetFiscalApiData] = useState([]);
    const [monthapidata, SetMonthApiData] = useState([]);
    const [data, SetData] = useState([]);
    const [infodata, SetInfoData] = useState([]);
    const [allownsdata, SetAllownsData] = useState([]);
    const [deductiondata, SetDeductionData] = useState([]);
    const [loandata, setLoanData] = useState([]);
    const [noloandata, SetNoLoanData] = useState(true);
    const [maxfiscalid, setMaxFiscalId] = useState(null);
    const [maxperiodid, setMaxPeriodId] = useState(null);
    const [loading, IsLoading] = useState(true);
    const [salarynodata, setSalaryNoData] = useState(false)
    const [result, setResult] = useState(null);


    // ............. Begin: GetdatafromHelper  useEffect...............//
    useEffect(() => {
        Helper.getLoggedInData().then((response) => {
            SetData(response);

        }).catch((e) => {
            console.log('eee', e);
        });
    }, [])
    // ............. End: GetdatafromHelper useEffect...............//



    // ............. Begin: salaryapi useEffect ...............//
    useEffect(() => {
        if (data.length > 0 && maxperiodid !== null) {
            // console.log(route.params.SalPeriodId[0].PeriodId);
            SalaryApiData();
            // IsLoading(false);
        }
    }, [data, maxperiodid])
    // ............. End: salaryapi useEffect ...............//



    useEffect(() => {
        if (maxfiscalid !== null) {
            // console.log('aaa', yearapidata[0].fiscalyearid)
            MonthApiCall();
        }
    }, [maxfiscalid])






    // ............. Begin: GetMaxFiscalID ...............//

    useEffect(() => {
        let Maxfiscalvalue = [];
        if (fisicalapidata.length > 0) {

            Maxfiscalvalue = Math.max.apply(Math, fisicalapidata.map((item) => {
                return item.fiscalyearid;
            }))

            setMaxFiscalId(Maxfiscalvalue);
            // console.log('maxfiscalvalue', maxfiscalid)
        }
    }, [fisicalapidata])
    // ............. End: GetMaxFiscalID ...............//


    // ............. Begin: GetMaxPeriodID ...............//
    useEffect(() => {

        let maxPeriod;
        if (monthapidata.length > 0) {

            maxPeriod = Math.max.apply(Math, monthapidata.map((item) => {
                // console.log('maxperiod id', item.PeriodId)

                if (item.IsPayGenerated == 1) {
                    return item.PeriodId;


                }
                else {
                    return -Infinity;
                }
            }))

            setMaxPeriodId(maxPeriod)
            //console.log('maxperidvalue', maxPeriod)

        }

    }, [monthapidata])
    // ............. End: GetMaxPeriodID ...............//

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        FicicalYearApiCall(signal);
        return function cleanup() {
            abortController.abort();
        }
    }, [])


    // ........... Begin: Fiscal Year ApiCall ............... //
    const FicicalYearApiCall = async (signal) => {
        try {
            // console.log('fiscalyearApidata' , Contants.API_URL + 'EmployeeInfo/V1/FiscalyearList')
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalyearList', {
                signal: signal,
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
                // console.log('aaa', payloadData)
                if (payloadData.length > 0) {
                    // console.log('FiscalYear', payloadData)
                    SetFiscalApiData(payloadData);
                    // IsLoading(false);
                }
            }
        }
        catch (e) {
            console.log('FiscalError', e);
        }
    }
    // ........... End: Fiscal Year ApiCall ............... //



    // ........... Begin: Month ApiCall ............... //
    const MonthApiCall = async () => {
        try {

            // Live...   const response = await fetch(Contants.API_URL + 'EmployeeInfo/FiscalYearPeriodList?fiscalyearId=' + maxfiscalid, {

            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/FiscalYearPeriodList', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    //  fiscalYearId: maxfiscalid
                    //aaa
                    fiscalYearId: -1,
                })
            });
            const responseObj = await response.json();
            //  console.log(responseObj)

            if (responseObj.statusCode == 200) {
                let monthpayload = JSON.parse(responseObj.payload);
                // console.log('month', monthpayload)
                if (monthpayload.length > 0) {
                    SetMonthApiData(monthpayload);
                    // IsLoading(false);
                }
                else {
                    Alert.alert('Info', 'No Record Found, Please Contact HR.',
                        [{ text: "ok", onPress: () => { navigation.navigate('HomeScreen') } }]);
                }
            }
        }
        catch (e) {
            console.log('MonthError', e);
        }
    }
    //........... End: Month ApiCall ............... //




    //..................Begin: SalaryApiData ...................//
    const SalaryApiData = async () => {
        try {
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/EmployeeSalarySlip', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                     Empid: data[0].EmpId,
                   // Empid: 438,
                    periodId: maxperiodid,

                })
            });
            const responseObj = await response.json();
            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);
                // console.log('salary', payload)

                if (payload.Table.length > 0 || payload.Table1.length > 0 || payload.Table2.length > 0 || payload.Table3.length) {

                    if (payload.Table.length > 0) {
                        SetInfoData(payload.Table);
                        IsLoading(false);
                    }
                    else {
                        // Alert.alert(
                        //     "Info",
                        //     "No Record Found",
                        //     [
                        //         {
                        //             text: "Cancel",
                        //             onPress: () => navigation.navigate("HomeScreen"),
                        //             style: "cancel"
                        //         },
                        //         { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
                        //     ],
                        //     { cancelable: false }
                        // )
                        console.log("no table data")

                    }

                    if (payload.Table1.length > 0) {
                        SetAllownsData(payload.Table1);
                        IsLoading(false);
                    }
                    else {
                        console.log('No data Table1')
                    }

                    if (payload.Table2.length > 0) {
                        SetDeductionData(payload.Table2);
                        IsLoading(false);
                    }
                    else {
                        console.log('No data Table2')
                    }

                    if (payload.Table3.length > 0) {
                        setLoanData(payload.Table3);
                        IsLoading(false);
                        SetNoLoanData(false);
                    }
                    else {
                        SetNoLoanData(true);
                    }

                    setSalaryNoData(false);
                    IsLoading(false);
                }

                else {
                    setSalaryNoData(true);
                    IsLoading(false);
                }

            }

        }
        catch (e) {
            console.log('SalaryApiError', e);
            Alert.alert("Info", "No Record Found, please try again later")
            IsLoading(false);
        }
    }
    //..................End: SalaryApiData ...................//



    const GetAllownsData = () => {
        if (allownsdata.length > 0) {
            return (
                allownsdata.map((item, index) => {

                    return (
                        <Text
                            style={styles.InfoInnerTxt}
                            key={index}>
                            {item.Allowance}
                        </Text>
                    )
                })
            )
        }

    }

    const GetDetectionData = () => {
        if (deductiondata.length > 0) {
            return (
                deductiondata.map((item, index) => {

                    return (
                        <Text
                            style={styles.InfoInnerTxt}
                            key={index}>
                            {item.Deduction}
                        </Text>
                    )
                })
            )
        }
    }

    const getAllowanceSum = () => {
        if (allownsdata.length > 0) {
            let totalAllowance = 0;
            allownsdata.map((item, index) => {
                totalAllowance += item.Amount
            });
            return totalAllowance
        }
        else {
            return 0;
        }
    }

    const getDeductionSum = () => {
        if (deductiondata.length > 0) {
            let totalDeduction = 0;
            deductiondata.map((item, index) => {
                totalDeduction += item.Amount
            });
            return totalDeduction
        }
        else {
            return 0;
        }
    }


    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://reports.idc.net.pk/PatientReportsPortal/salary-slip?Empid=' + data[0].EmpId + '&periodId=' + maxperiodid);
        // setResult(result);
        return result;
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <ActivityIndicator size="small" color="#008080" />
                </View>
                :
                <>


                    {salarynodata ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:'#fff'}}>


                            <Text style={{ fontSize: wp('4.5%'), color: 'red', alignItems: 'center' }}>
                                No Record Found
                            </Text>

                            <View style={{ alignItems: 'center', marginTop: wp('3%'), }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('SalaryFisicalYearScreen', {
                                            FiscalYears: fisicalapidata
                                        })
                                    }}
                                    style={{ justifyContent: 'center', flexDirection: 'row', size: wp('3%'), padding: wp("1.5%") }}>
                                    <Text style={{ color: '#008080', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('3.5%') }}>
                                        Previous Record
                                    </Text>
                                    <MaterialCommunityIcons name="skip-previous-circle-outline" size={wp('5.5%')} color="#008080" />

                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={styles.salarytmaincontainer}>

                            <View style={[styles.ViewSection, { flexDirection: 'row' }]}>

                                <View style={{ flex: 1, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: wp('1%'), padding: wp('1%') }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            _handlePressButtonAsync()


                                        }}
                                        style={{ justifyContent: 'center', flexDirection: 'row', size: wp('3%'), padding: wp("1.5%") }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('4%') }}>
                                            Print Salary Slip
                                        </Text>
                                        <Ionicons name="ios-print-outline" size={wp('5.5%')} color="#fff" />

                                    </TouchableOpacity>

                                </View>

                                <View style={{ flex: 1, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), padding: wp('1%'), borderRadius: wp('1%') }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('SalaryFisicalYearScreen', {
                                                FiscalYears: fisicalapidata
                                            })
                                        }}
                                        style={{ justifyContent: 'center', flexDirection: 'row', size: wp('3%'), padding: wp("1.5%") }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('4%') }}>
                                            Previous Record
                                        </Text>
                                        <MaterialCommunityIcons name="skip-previous-circle-outline" size={wp('5.5%')} color="#fff" />

                                    </TouchableOpacity>
                                </View>

                            </View>

                            {/* infoView */}

                            <View style={styles.ViewSection}>

                                <View style={{ marginHorizontal: wp('2%'), alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('2%'), }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                style={{ width: wp('10%'), height: wp('10%'), marginBottom: wp('2%') }}
                                                // source={require('../../assets/logo.png')}
                                                source={require('../../../assets/logo.png')}
                                            />
                                        </View>


                                        <View style={{ flex: 10 }}>
                                            <Text style={{
                                                paddingLeft: wp('2%'),
                                                paddingTop: wp('2%'),
                                                color: '#0041c4',
                                                fontSize: wp('4.5%'),
                                                fontWeight: 'bold',
                                                // paddingLeft: wp('1%'),
                                                textAlign: 'center'
                                            }}>
                                                Islamabad Diognostic Centre(Pvt) Ltd.
                                            </Text>
                                        </View>

                                    </View>


                                    <Text style={{ fontSize: wp('4.5%'), fontWeight: '600', color: '#1f1f2e' }}>
                                        Salary Slip
                                    </Text>

                                    <Text
                                        style={{
                                            paddingTop: wp('1%'),
                                            fontSize: wp('4.5%'),
                                            fontWeight: '500',
                                            color: '#1f1f2e',
                                            textAlign: 'center'
                                        }}>
                                        {infodata.length > 0 ? (infodata[0].FiscalYear == null || infodata[0].FiscalYear == '' || infodata[0].Name == null || infodata[0].Name == '' ? 'N/A' : infodata[0].Name + ',' + infodata[0].FiscalYear) : 'N/A'}
                                    </Text>

                                    {/* 
                                <View style={{ flexDirection: 'row', marginTop: wp('1%') }}>
                                    <Text style={{ fontSize: wp('4%'), color: '#1f1f2e' }}>From:</Text>
                                    <Text style={{ fontSize: wp('4%'), paddingLeft: wp('2%'), color: '#1f1f2e', }}>{infodata.length > 0 ? (infodata[0].StartDate == null || infodata[0].StartDate == '' ? 'N/A' : moment(infodata[0].StartDate).format("MMMM D, YYYY")) : "N/A"}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: wp('0.5%') }}>
                                    <Text style={{ fontSize: wp('4%'), color: '#1f1f2e', }}>T0:</Text>
                                    <Text style={{ fontSize: wp('4%'), paddingLeft: wp('2%'), color: '#1f1f2e', }}>{infodata.length > 0 ? (infodata[0].EndDate == null || infodata[0].EndDate == '' ? 'N/A' : moment(infodata[0].EndDate).format("MMMM D, YYYY")) : "N/A"}</Text>
                                </View> */}


                                </View>


                                <View style={{ marginHorizontal: wp('2%'), marginBottom: wp('2%') }}>
                                    <View style={styles.salaryempinfoview}>

                                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                            <Text style={styles.salaryemptxt}>Employee ID :</Text>
                                        </View>

                                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>



                                            {/* <Text style={styles.salaryempsubtxt}>1122</Text> */}

                                            <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].EmployeeID == null || infodata[0].EmployeeID == '' ? 'N/A' : infodata[0].EmployeeID) : 'N/A'}</Text>
                                        </View>

                                    </View>

                                    <View style={styles.salaryempinfoview}>
                                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                            <Text style={styles.salaryemptxt}>Employee Name :</Text>
                                        </View>


                                        {/* <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                        <Text style={styles.salaryempsubtxt}>Mr. John Doe</Text>
                                    </View> */}


                                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                            <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].EmployeeName == null || infodata[0].EmployeeName == '' ? 'N/A' : infodata[0].EmployeeName) : 'N/A'}</Text>
                                        </View>

                                    </View>


                                    <View style={styles.salaryempinfoview}>
                                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                            <Text style={styles.salaryemptxt}>Department :</Text>
                                        </View>

                                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                            <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text>

                                        </View>

                                    </View>


                                    <View style={styles.salaryempinfoview}>
                                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                            <Text style={styles.salaryemptxt}>Designation :</Text>
                                        </View>

                                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                            <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].Designation == null || infodata[0].Designation == '' ? 'N/A' : infodata[0].Designation) : 'N/A'}</Text>
                                        </View>

                                    </View>


                                    <View style={styles.salaryempinfoview}>
                                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                            <Text style={styles.salaryemptxt}>Bank Account #</Text>
                                        </View>




                                        {/* <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                        <Text style={styles.salaryempsubtxt}>1111111111111</Text>
                                    </View> */}
                                        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: wp('2%') }}>
                                            <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].BankAccountNo == null || infodata[0].BankAccountNo == '' ? 'N/A' : infodata[0].BankAccountNo) : 'N/A'}</Text>
                                        </View>
                                    </View>

                                </View>

                            </View>


                            {/*  gross/NetSalary Section */}
                            <View style={[styles.ViewSection, { flexDirection: 'row' }]}>

                                <View style={{ flex: 1, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: wp('1%'), flexDirection: 'column', padding: wp('1%') }}>
                                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Gross Salary</Text>


                                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                                        {infodata.length > 0 ? (infodata[0].GrossSalary == null || infodata[0].GrossSalary == '' ? 'N/A' : infodata[0].GrossSalary) : 'N/A'}
                                    </Text>
                                </View>


                                <View style={{ flex: 1, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: wp('1%'), flexDirection: 'column', padding: wp('1%') }}>
                                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Net Salary</Text>


                                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                                        {infodata.length > 0 ? (infodata[0].NetSalary == null || infodata[0].NetSalary == '' ? 'N/A' : infodata[0].NetSalary) : 'N/A'}
                                    </Text>
                                </View>



                            </View>


                            {/* Allowances Table */}
                            <View style={styles.ViewSection}>

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 2,
                                    borderColor: '#D8D8D8',
                                    marginHorizontal: wp('2%'),
                                    paddingTop: wp('2%')
                                }}>

                                    <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('1%') }}>
                                            Allowance
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', right: wp('1.8%'), position: 'absolute', }}>
                                            Amount
                                        </Text>
                                    </View>

                                </View>




                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 2,
                                    borderColor: '#D8D8D8',
                                    marginHorizontal: wp('2%'),
                                    paddingTop: wp('2%')
                                }}>


                                    <View style={{ flex: 2, }}>

                                        {GetAllownsData()}
                                        {/* {allownsdata.map((item, index) => {
                                        return (
                                            <Text
                                                style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}
                                                key={index}>
                                                {item.Allowance}
                                            </Text>
                                        )

                                    })} */}
                                    </View>


                                    <View style={{ flex: 1, }}>

                                        {allownsdata.map((item, index) => {
                                            return (
                                                <Text
                                                    style={styles.InfoInnersubTxt}
                                                    key={index}>
                                                    {item.Amount}
                                                </Text>
                                            )

                                        })}
                                    </View>

                                </View>



                                <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: '#fff', marginTop: wp('2%') }}>
                                    <View style={{ flex: 2.3, justifyContent: 'center' }}>

                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('2%') }}>
                                            Total Allowance
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'green', right: wp('1.8%'), position: 'absolute', }}>
                                            {getAllowanceSum()}
                                        </Text>
                                    </View>

                                </View>




                                {/* <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: '#fff', marginTop: wp('2%') }}>
                                <View style={{ flex: 2.3, justifyContent: 'center', marginBottom: wp('2%') }}>

                                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('2%') }}>
                                        Gross Salary
                                    </Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center', }}>
                                    <Text style={{ fontSize: wp('4.5%'), fontWeight: '500', color: '#595959', right: wp('1.8%'), position: 'absolute', }}>
                                        {infodata.length > 0 ? (infodata[0].GrossSalary == null || infodata[0].GrossSalary == '' ? 'N/A' : infodata[0].GrossSalary) : 'N/A'}

                                    </Text>
                                </View>
                            </View> */}


                            </View>


                            {/* Deduction Table */}
                            <View style={[styles.ViewSection, { marginBottom: wp('2%') }]}>

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 2,
                                    borderColor: '#D8D8D8',
                                    marginHorizontal: wp('2%'),
                                    paddingTop: wp('2%')
                                }}>

                                    <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('1%') }}>
                                            Deduction
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', right: wp('1.8%'), position: 'absolute', }}>
                                            Amount
                                        </Text>
                                    </View>

                                </View>




                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 2,
                                    borderColor: '#D8D8D8',
                                    marginHorizontal: wp('2%'),
                                    paddingTop: wp('2%')
                                }}>


                                    <View style={{ flex: 2 }}>
                                        {GetDetectionData()}
                                        {/* {deductiondata.map((item, index) => {
                                        return (
                                            <Text
                                                style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}
                                                key={index}>
                                                {item.Deduction}
                                            </Text>
                                        )

                                    })} */}
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        {deductiondata.map((item, index) => {
                                            return (
                                                <Text
                                                    style={styles.InfoInnersubTxt}
                                                    key={index}>
                                                    {item.Amount}
                                                </Text>
                                            )

                                        })}
                                    </View>

                                </View>



                                <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: '#fff', marginTop: wp('2%') }}>
                                    <View style={{ flex: 2.3, justifyContent: 'center' }}>

                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('2%') }}>
                                            Total Deduction
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'red', right: wp('1.8%'), position: 'absolute', }}>
                                            {getDeductionSum()}
                                        </Text>
                                    </View>

                                </View>




                                {/* <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: '#fff', marginTop: wp('2%') }}>
                                <View style={{ flex: 2.3, justifyContent: 'center', marginBottom: wp('2%') }}>

                                    <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('2%') }}>
                                        Net Salary
                                    </Text>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center', }}>
                                    <Text style={{ fontSize: wp('4.5%'), fontWeight: '500', color: '#595959', right: wp('1.8%'), position: 'absolute', }}>
                                        {infodata.length > 0 ? (infodata[0].NetSalary == null || infodata[0].NetSalary == '' ? 'N/A' : infodata[0].NetSalary) : 'N/A'}

                                    </Text>
                                </View>
                            </View> */}


                            </View>


                            {/* Loan Table */}
                            {noloandata ?
                                <></> :

                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    // marginTop: wp('1.5%'),
                                    marginHorizontal: wp('1%'),
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: '#CBCBCB',
                                    paddingBottom: wp('2%'),
                                    marginBottom: wp('2%')
                                }}>


                                    <View style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 2,
                                        borderColor: '#D8D8D8',
                                        marginHorizontal: wp('2%'),
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ justifyContent: 'flex-end' }}>
                                            <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: 'black', paddingHorizontal: wp('1%') }}>
                                                Loan Information
                                            </Text>
                                        </View>


                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        // borderBottomWidth: 2,
                                        // borderColor: '#D8D8D8',
                                        marginHorizontal: wp('2%'),
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.InfoInnerTxt}>
                                                Description
                                            </Text>
                                        </View>


                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.InfoInnersubTxt}>
                                                {loandata.length > 0 ? (loandata[0].Description == null || loandata[0].Description == '' ? 'N/A' : loandata[0].Description) : 'N/A'}
                                            </Text>
                                        </View>

                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        // borderBottomWidth: 2,
                                        // borderColor: '#D8D8D8',
                                        marginHorizontal: wp('2%'),
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.InfoInnerTxt}>
                                                Loan Amount
                                            </Text>
                                        </View>


                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.InfoInnersubTxt}>
                                                {loandata.length > 0 ? (loandata[0].LoanAmount == null || loandata[0].LoanAmount == '' ? 'N/A' : loandata[0].LoanAmount) : 'N/A'}
                                            </Text>
                                        </View>

                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        // borderBottomWidth: 2,
                                        // borderColor: '#D8D8D8',
                                        marginHorizontal: wp('2%'),
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.InfoInnerTxt}>
                                                Instalments
                                            </Text>
                                        </View>


                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.InfoInnersubTxt}>
                                                {loandata.length > 0 ? (loandata[0].Instalments == null || loandata[0].Instalments == '' ? 'N/A' : loandata[0].Instalments) : 'N/A'}
                                            </Text>
                                        </View>

                                    </View>



                                    <View style={{
                                        flexDirection: 'row',
                                        marginHorizontal: wp('2%'),
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.InfoInnerTxt}>
                                                Balance
                                            </Text>
                                        </View>


                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.InfoInnersubTxt}>
                                                {loandata.length > 0 ? (loandata[0].Balance == null || loandata[0].Balance == '' ? 'N/A' : loandata[0].Balance) : 'N/A'}
                                            </Text>
                                        </View>

                                    </View>





                                    <View style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 2,
                                        borderColor: '#D8D8D8',
                                        marginHorizontal: wp('2%'),
                                        resizeMode: 'contain',
                                        paddingTop: wp('2%')
                                    }}>

                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.InfoInnerTxt}>
                                                Paid Amount
                                            </Text>
                                        </View>


                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.InfoInnersubTxt}>
                                                {loandata.length > 0 ? (loandata[0].Paidamount == null || loandata[0].Paidamount == '' ? 'N/A' : loandata[0].Paidamount) : 'N/A'}
                                            </Text>
                                        </View>

                                    </View>




                                </View>
                            }

                        </View>
                    }
                </>}
        </ScrollView >

    );
}

const styles = StyleSheet.create({
    salarytmaincontainer: {
        flex: 1,
        backgroundColor: '#D8D8D8'
    },
    ViewSection: {
        flex: 1,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        marginTop: wp('1.5%'),
        marginHorizontal: wp('1%'),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBCBCB',
        paddingBottom: wp('2%'),

    },

    salaryempinfoview: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#D8D8D8',
        marginHorizontal: wp('2%'),
        paddingTop: wp('1%')
    },

    salaryemptxt: {
        paddingTop: wp('2%'),
        // color: '#59ABE3',
        color: 'black',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    salaryempsubtxt: {
        paddingTop: wp('2%'),
        fontSize: wp('3.6%'),
        fontWeight: 'bold',
        color: '#808080'


    },

    InfoInnerTxt: {
        fontSize: wp('4%'),
        color: 'black',
        padding: wp('1%'),
        fontWeight: 'bold'
    },
    InfoInnersubTxt: {
        fontSize: wp('4%'),
        padding: wp('1%'),
        alignSelf: 'flex-end',
        color: '#808080',

    },

})