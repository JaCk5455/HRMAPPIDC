import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../constants/constants';
import { Helper } from '../../Components/Helpers';
const { height, width } = Dimensions.get('window');
import moment from 'moment';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import RNHTMLtoPDF from 'react-native-html-to-pdf';


export default function SalarySlipScreen({ navigation, route }) {

    const [data, SetData] = useState([]);
    const [infodata, SetInfoData] = useState([]);
    const [allownsdata, SetAllownsData] = useState([]);
    const [deductiondata, SetDeductionData] = useState([]);
    const [loandata, setLoanData] = useState([]);
    const [noloandata, SetNoLoanData] = useState(true);
    const [loading, IsLoading] = useState(true);
    // const [total, setTotal] = useState(0);




    useEffect(() => {

        Helper.getLoggedInData().then((response) => {
            SetData(response);

        }).catch((e) => {
            console.log('eee', e);
        });

    }, [])
    useEffect(() => {
        if (data.length > 0) {
            // console.log(route.params.SalPeriodId[0].PeriodId);
            SalaryApiData();
            // IsLoading(false);
        }

    }, [data])



    const GetAllownsData = () => {
        if (allownsdata.length > 0) {
            return (
                allownsdata.map((item, index) => {

                    return (
                        <Text
                            style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}
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
                            style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}
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

    //..................Begin: SalaryApiData ...................//
    const SalaryApiData = async () => {
        try {
            //  console.log('abc', Contants.API_URL + 'EmployeeInfo/EmployeeSalarySlip?Empid=' + data[0].EmpId + '&periodId=' + route.params.SalPeriodId)
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/EmployeeSalarySlip?Empid=' + data[0].EmpId + '&periodId=' + route.params.SalPeriodId, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId,
                    periodId: route.params.SalPeriodId

                })
            });
            const responseObj = await response.json();
            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);

                if (payload.Table.length > 0) {
                    SetInfoData(payload.Table);
                    IsLoading(false);
                }
                else {
                    Alert.alert(
                        "Alert",
                        "No Record Found",
                        [
                            {
                                text: "Cancel",
                                onPress: () => navigation.navigate("SalaryFisicalYearScreen"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => navigation.navigate("SalaryFisicalYearScreen") }
                        ],
                        { cancelable: false }
                    )
                }

                if (payload.Table1.length > 0) {
                    SetAllownsData(payload.Table1);
                    //  console.log('xyz', payload.Table1);
                    IsLoading(false);
                    //,,,
                }
                else {
                    console.log('Error')
                }

                if (payload.Table2.length > 0) {
                    SetDeductionData(payload.Table2);
                    // console.log('xyz', payload.Table2);
                    IsLoading(false);
                }
                else {
                    console.log('Error')
                }

                if (payload.Table3.length > 0) {
                    setLoanData(payload.Table3);
                    // console.log('xyz', payload.Table3);
                    IsLoading(false);
                    SetNoLoanData(false);
                }
                else {
                    SetNoLoanData(true);
                }
            }

        }
        catch (e) {
            console.log('Error', e);
        }
    }
    //..................End: SalaryApiData ...................//


    // const createPDF = async () => {
    //     let options = {
    //         html: '<h1>PDF TEST</h1>',
    //         fileName: 'test',
    //         directory: 'Documents',
    //     };

    //     let file = await RNHTMLtoPDF.convert(options)
    //     // console.log(file.filePath);
    //     alert(file.filePath);
    //     return file;
    // }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <ActivityIndicator size="small" color="#008080" />
                </View>
                :
                <>
                    <View style={styles.salarytmaincontainer}>

                        {/* infiView */}

                        <View style={styles.ViewSection}>

                            <View style={{ marginHorizontal: wp('2%'), alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('2%'), }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: wp('10%'), height: wp('10%'), marginBottom: wp('2%') }}
                                            source={require('../../assets/logo.png')}
                                        />
                                    </View>


                                    <View style={{ flex: 10, }}>
                                        <Text style={{
                                            paddingLeft: wp('2%'),
                                            paddingTop: wp('2%'),
                                            color: '#0041c4',
                                            fontSize: wp('5%'),
                                            fontWeight: 'bold',
                                            // paddingLeft: wp('1%'),
                                            textAlign: 'center'
                                        }}>
                                            Islamabad Diognostic Centre(Pvt) Ltd.
                                        </Text>
                                    </View>

                                </View>


                                <Text style={{ paddingTop: wp('1%'), fontSize: wp('5%'), fontWeight: '600', color: '#1f1f2e' }}>
                                    Salary slip
                                </Text>

                                <Text
                                    style={{
                                        paddingTop: wp('1%'),
                                        fontSize: wp('5%'),
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

                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].EmployeeID == null || infodata[0].EmployeeID == '' ? 'N/A' : infodata[0].EmployeeID) : 'N/A'}</Text>
                                    </View>

                                </View>

                                <View style={styles.salaryempinfoview}>
                                    <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                        <Text style={styles.salaryemptxt}>Employee Name :</Text>
                                    </View>

                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].EmployeeName == null || infodata[0].EmployeeName == '' ? 'N/A' : infodata[0].EmployeeName) : 'N/A'}</Text>
                                    </View>

                                </View>


                                <View style={styles.salaryempinfoview}>
                                    <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                        <Text style={styles.salaryemptxt}>Department :</Text>
                                    </View>

                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].DepartmentName == null || infodata[0].DepartmentName == '' ? 'N/A' : infodata[0].DepartmentName) : 'N/A'}</Text>

                                    </View>

                                </View>


                                <View style={styles.salaryempinfoview}>
                                    <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                        <Text style={styles.salaryemptxt}>Designation :</Text>
                                    </View>

                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].Designation == null || infodata[0].Designation == '' ? 'N/A' : infodata[0].Designation) : 'N/A'}</Text>
                                    </View>

                                </View>


                                <View style={styles.salaryempinfoview}>
                                    <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                        <Text style={styles.salaryemptxt}>Bank Account #</Text>
                                    </View>

                                    <View style={{ flex: 2, justifyContent: 'center' }}>

                                        <Text style={styles.salaryempsubtxt}>{infodata.length > 0 ? (infodata[0].BankAccountNo == null || infodata[0].BankAccountNo == '' ? 'N/A' : infodata[0].BankAccountNo) : 'N/A'}</Text>

                                    </View>
                                </View>

                            </View>

                        </View>





                        <View style={[styles.ViewSection, { flexDirection: 'row' }]}>

                            <View style={{ flex: 1, backgroundColor: '#008080', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: 8, flexDirection: 'column', padding: wp('1%') }}>
                                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Gross Salary</Text>


                                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                                    {infodata.length > 0 ? (infodata[0].GrossSalary == null || infodata[0].GrossSalary == '' ? 'N/A' : infodata[0].GrossSalary) : 'N/A'}
                                </Text>
                            </View>


                            <View style={{ flex: 1, backgroundColor: '#0041c4', marginHorizontal: wp('2%'), marginTop: wp('2%'), borderRadius: 8, flexDirection: 'column', padding: wp('1%') }}>
                                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Net Salary</Text>


                                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                                    {infodata.length > 0 ? (infodata[0].NetSalary == null || infodata[0].NetSalary == '' ? 'N/A' : infodata[0].NetSalary) : 'N/A'}
                                </Text>
                            </View>



                        </View>



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
                                                style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}
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
                                                style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}
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
                                        <Text style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}>
                                            Description
                                    </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end', }}>
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
                                        <Text style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}>
                                            Loan Amount
                                    </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}>
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
                                        <Text style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}>
                                            Instalments
                                    </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}>
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
                                        <Text style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}>
                                            Balance
                                    </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}>
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
                                        <Text style={{ fontSize: wp('4%'), color: '#808080', padding: wp('1%'), fontWeight: 'bold', }}>
                                            Paid Amount
                                    </Text>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: wp('4%'), padding: wp('1%'), alignSelf: 'flex-end' }}>
                                            {loandata.length > 0 ? (loandata[0].Paidamount == null || loandata[0].Paidamount == '' ? 'N/A' : loandata[0].Paidamount) : 'N/A'}
                                        </Text>
                                    </View>

                                </View>




                            </View>
                        }


                        {/* <View style={styles.container}>
                            <TouchableOpacity onPress={() => { createPDF() }}>
                                <Text>Create PDF</Text>
                            </TouchableOpacity>
                        </View> */}












                    </View >
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
        color: '#59ABE3',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    salaryempsubtxt: {
        paddingTop: wp('2%'),
        fontSize: wp('3.6%'),
        fontWeight: '500'

    },

    PDfcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },


})

