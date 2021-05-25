import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../../constants/constants';
import { Helper } from '../../../Components/Helpers';
import moment from 'moment';
import { Picker, Item } from "native-base";
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
// import { ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window');

export default function MainLeaveScreen({ navigation }) {
    const [data, SetData] = useState([]);
    const [leaveapidata, setLeaveApiData] = useState([])
    const [loading, IsLoading] = useState(true);
    const [yearapidata, setYearApiData] = useState([]);
    const [monthapidata, SetMonthApiData] = useState([]);
    const [maxfiscalid, setMaxFiscalId] = useState(null);
    const [maxperiodid, setMaxPeriodId] = useState(null);
    const [leaverecord , setLeaveRecord] = useState(false)


    // ......... Begin: AsynStorageData for EmpId ........ //
    useEffect(() => {
        Helper.getLoggedInData().then((response) => {
            SetData(response);

        }).catch((e) => {
            console.log('eee', e);
        });

    }, [])
    // ......... End: AsynStorageData for EmpId ........ //



    // .......... Begin: Fiscalyear useEffect ........... //
    useEffect(() => {
        FicicalYearApiCall();
    }, [])
    // ........... End: Fiscalyear useEffect ...........//


    //............. Begin: Get MaxFiscalyearValue ........//
    useEffect(() => {
        let Maxfiscalvalue = [];
        if (yearapidata.length > 0) {

            Maxfiscalvalue = Math.max.apply(Math, yearapidata.map((item) => {
                return item.fiscalyearid;
            }))

             // console.log('maxfiscalid', Maxfiscalvalue);

            setMaxFiscalId(Maxfiscalvalue);
        }
    }, [yearapidata])
    //............. End: Get MaxFiscalyearValue ........//




    // .......... Begin: MonthApi useEffect ........... //
    useEffect(() => {
        if (maxfiscalid !== null) {
            // console.log('aaa', yearapidata[0].fiscalyearid)
            MonthApiCall();
        }
    }, [maxfiscalid])
    // .......... End: MonthApi useEffect ........... //


    useEffect(() => {
        let abc = [];
        let minPeriod;
        if (monthapidata.length > 0) {

            minPeriod = Math.min.apply(Math, monthapidata.map((item) => {

                if (item.IsPayGenerated == 0) {
                    
                    return item.PeriodId;

                }
                else {
                    return Infinity;
                }
                // console.log('minperiod id', item.PeriodId)


            }))
            //  console.log('second call', minPeriod)
            setMaxPeriodId(minPeriod)
            // setMaxPeriodId(abc)

            //  console.log('maxperidvalue', MaxPeriodValue)

        }
    }, [monthapidata])

    useEffect(() => {
        if (data.length > 0 && maxperiodid !== null) {
            // console.log(route.params.SalPeriodId[0].PeriodId);
            LeaveApiCall();
            // IsLoading(false);
        }

    }, [data, maxperiodid])






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
                // console.log('FiscalYear', payloadData)
                if (payloadData.length > 0) {
                   // console.log('fescalyear', payloadData)
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

    //..... Begin : Leave Api Call ...... //
    const LeaveApiCall = async () => {
        try {
             // console.log('Leave URL', Contants.API_URL + 'EmployeeInfo/IndividualLeaveDetail?Empid=' + data[0].EmpId + '&FiscalYearId=' + maxfiscalid + '&fromPeriodId=' + maxperiodid + '&ToPeriodId=' + maxperiodid);
            // const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/IndividualLeaveDetail?Empid=' + data[0].EmpId + '&FiscalYearId=' + maxfiscalid + '&fromPeriodId=' + maxperiodid + '&ToPeriodId=' + maxperiodid, {
                const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/IndividualLeaveDetail' , {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    Empid: data[0].EmpId,
                    FiscalYearId: maxfiscalid,
                    // fromPeriodId: 105,
                    // ToPeriodId: 105
                    // Empid: 75,
                    // FiscalYearId: 9,
                    fromPeriodId: maxperiodid,
                    ToPeriodId: maxperiodid



                })
            });
            const responseObj = await response.json();
            if (responseObj.statusCode == 200) {
                let payload = JSON.parse(responseObj.payload);
               // console.log('Leaves Data', payload) 
                if (payload.length > 0) {
                    setLeaveApiData(payload);
                   
                    IsLoading(false);
                    setLeaveRecord(false)

                }
                else {
                    // Alert.alert(
                    //      "",
                    //     "No record found for current year.",
                    //     [
                    //         {
                    //             text: "Previous Record",
                    //             onPress: () => navigation.navigate("LeaveFisicalScreen"),
                    //             style: "cancel"
                    //         },
                    //         { text: "Home", onPress: () => navigation.navigate("HomeScreen") }
                    //     ],
                    //     { cancelable: false }
                    // )
                    setLeaveRecord(true);
                }
            }

        }
        catch (e) {
            console.log('LeaveApiError', e);
        }
    }
    //..... End : Leave Api Call ...... //





    // ....... Begin : FlatList_RenderItem_Function .... // 
    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }

    const LeaveColor = (item)=>{
        let color = '#008080'
 
       if(item == 'Annual leaves'){
         color='#777777'
       }
        else if(item == 'Causal Leaves'){
            color='#ff8000';
        }

        else if(item == 'Short Leave'){
            color='#004CFF';
        }

        else if(item == 'Sick Leave'){
            color='#A37546';
        }

        else if(item == 'Leave Without Pay'){
            color='#FF2E00';
        }

        else if(item == 'Compensatory leave'){
            color='#008080';
        }

        else{
            color = '#008080';
        }

        return color;
    }

    function ItemView({ item }) {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff', padding: wp('1%') }}>
                {/* <Text
                    style={{ fontSize: wp('4%'), color: 'black', fontWeight: 'bold', padding: wp('1%'), paddingLeft: wp('3%') }}>
                    {item.LeaveMonths}
                </Text> */}
                <View style={{
                    borderWidth: 1,
                    borderColor: '#CBCBCB',
                    padding: wp('2.5%'),
                    marginHorizontal: wp("2%"),
                    marginVertical: wp("1.7%"),
                    borderRadius: 10,

                }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 5 }}>


                        <Text style={{
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color :LeaveColor(item.Description),
    // borderBottomWidth: 1,
    // borderBottomColor: '#CBCBCB',
    paddingTop: wp('1%')
}}>
    {item.Description}
</Text>


                            {/* {item.Description == "Annual leaves" ?

                                <Text style={{
                                    fontSize: wp('4%'),
                                    fontWeight: 'bold',
                                    color: '#777777',
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: '#CBCBCB',
                                    paddingTop: wp('1%')
                                }}>
                                    {item.Description}
                                </Text> : <></>
                            }




                            {item.Description == "Causal Leaves" ?
                                <Text style={{
                                    fontSize: wp('4%'),
                                    fontWeight: 'bold',
                                    color: '#ff8000',
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: '#CBCBCB',
                                    paddingTop: wp('1%')
                                }}>
                                    {item.Description}
                                </Text> : <></>
                            }

                            {item.Description == "Short Leave" ?
                                <Text style={{
                                    fontSize: wp('4%'),
                                    fontWeight: 'bold',
                                    color: '#004CFF',
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: '#CBCBCB',
                                    paddingTop: wp('1%')
                                }}>
                                    {item.Description}
                                </Text>
                                :
                                <></>}
                            {item.Description == "Sick Leave" ?
                                <Text style={{
                                    fontSize: wp('4%'),
                                    fontWeight: 'bold',
                                    color: '#A37546',
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: '#CBCBCB',
                                    paddingTop: wp('1%')
                                }}>
                                    {item.Description}
                                </Text>
                                : <></>}

                            {item.Description == "Leave Without Pay" ?

                                <Text style={{
                                    fontSize: wp('4%'),
                                    fontWeight: 'bold',
                                    color: '#FF2E00',
                                    // borderBottomWidth: 1,
                                    // borderBottomColor: '#CBCBCB',
                                    paddingTop: wp('1%')
                                }}>
                                    {item.Description}
                                </Text>
                                : <></>} */}


                            {/* <View style={{ flex: 5 }}>
                             <Text style={{
                                fontSize: wp('4%'),
                                fontWeight: 'bold',
                                color: '#777777',
                                // borderBottomWidth: 1,
                                // borderBottomColor: '#CBCBCB',
                                paddingTop: wp('1%')
                            }}>
                                {item.Description}
                            </Text>
                        </View> */}

                        </View>


                        <View style={{ flex: 2.7 }}>
                            {
                                item.Status == 3 ?
                                    <View style={{ backgroundColor: "#008080", borderWidth: 1, borderColor: '#008080', alignItems: 'center', padding: 2, borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: wp("4.5%") }}>
                                            {item.Title}
                                        </Text>
                                    </View>

                                    : <></>
                            }

                            {
                                item.Status == 5 || item.Status == 4 ?

                                    <View style={{ backgroundColor: "#FF2E00", borderWidth: 1, borderColor: '#FF2E00', alignItems: 'center', padding: 2, borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: wp("4.5%") }}>
                                            {item.Title}
                                        </Text>
                                    </View> : <></>
                            }


                            {
                                item.Status == 1 || item.Status == 2 ?
                                    <View style={{ backgroundColor: "#546ba9", borderWidth: 1, borderColor: '#546ba9', alignItems: 'center', padding: 2, borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: wp("4.5%") }}>
                                            {item.Title}
                                        </Text>
                                    </View>

                                    : <></>
                            }



                        </View>

                    </View>



                    {item.TotalDays <= 1 ?

                        <Text style={{
                            fontSize: wp('4%'),
                            fontWeight: 'bold',
                            color: 'black',
                            paddingTop: wp('2%')
                        }}>
                            {moment(item.LeaveStartDate).format('D MMM YYYY, h:mm:ss a')}
                        </Text>
                        :
                        <Text style={{
                            fontSize: wp('4%'),
                            fontWeight: 'bold',
                            color: 'black',
                            paddingTop: wp('2%')
                        }}>
                            {moment(item.LeaveStartDate).format('D MMM YYYY') + ' - ' + moment(item.LeaveEndDate).format('D MMM YYYY')}
                        </Text>
                    }



                    {item.TotalDays > 1 ? <Text style={{
                        fontSize: wp('3.8%'),
                        fontWeight: 'bold',
                        color: "#546ba9",
                        // color: '#777',
                        paddingTop: wp('2%')
                    }}>

                        {item.TotalDays + ' Days'}
                    </Text> :

                        <Text style={{
                            fontSize: wp('3.8%'),
                            fontWeight: 'bold',
                            // color: "brown",
                            color: '#546ba9',
                            paddingTop: wp('2%')
                        }}>

                            {item.TotalDays + ' Day'}
                        </Text>
                    }


                    {/* 
                    {
                        item.Description == "Short Leave" && item.TotalDays > 1 ? <Text style={{
                            fontSize: wp('3.8%'),
                            fontWeight: 'bold',
                            color: "#546ba9",
                            // color: '#777',
                            paddingTop: wp('2%')
                        }}>

                            Half Day
                        </Text> : <></>
                    }




                    {
                        item.TotalDays == 1 ? <Text style={{
                            fontSize: wp('3.8%'),
                            fontWeight: 'bold',
                            color: "#546ba9",
                            // color: '#777',
                            paddingTop: wp('2%')
                        }}>

                            {item.TotalDays + ' Day'}
                        </Text> : <></>
                    }


                    {
                        item.TotalDays > 1 ? <Text style={{
                            fontSize: wp('3.8%'),
                            fontWeight: 'bold',
                            color: "#546ba9",
                            // color: '#777',
                            paddingTop: wp('2%')
                        }}>

                            {item.TotalDays + ' Days'}
                        </Text> : <></>
                    } */}



                </View>
            </View >
        )
    }

    // ....... End : FlatList_RenderItem_Function .... //

    //  const keyExtractorVisit = React.useCallback((item, index) => item.ID.toString(), []);
    const getItemLayout = (data, index) => (
        {
            length: 30, offset: 30 * index, index
        }
    );

    const _Refresh = () => {
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <ActivityIndicator size="small" color="#008080" />
        </View>
    }



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* <View style={{ paddingTop: wp('2%'), paddingBottom: wp('2%'), alignItems: 'center' }}>
            <Text style={{ color: "#000", fontWeight: '800', fontSize: wp("7%"), paddingTop: wp("3%") }}>
                {maxperiodid }
            </Text>
        </View> */}
{leaverecord? 
 <View style={{flex:1, justifyContent:'center' , alignItems:'center'}}>
    

  <Text style={{fontSize:wp('4%') , color:'red' , alignItems:'center'}}>
      No record found for the current month.
  </Text>
  
  <View style={{  alignItems: 'center', marginTop: wp('3%'), }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#008080', height: wp('10%'), width: wp('30%'), alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                                    onPress={() => {navigation.navigate('LeaveFisicalScreen', {
                                        // FiscalYears: yearapidata
                                    })
                                        
                                    }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold'  , fontSize:wp('3%') }}>Previous Record</Text>
                                </TouchableOpacity>
                            </View>



  </View> : <>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: wp('1%'), marginRight: wp('2%') }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('LeaveFisicalScreen', {
                        FiscalYears: yearapidata
                    })
                }}
                    style={{ flexDirection: 'row' }}
                >
                    <Text style={{ color: '#008080', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('4%') }}>
                        Previous Record
                                </Text>
                    <MaterialCommunityIcons name="skip-previous-circle-outline" size={wp('5.5%')} color="#008080" />



                </TouchableOpacity>
            </View>


            <View style={{ marginBottom: wp('8%') }}>
                {loading ?
                    <ActivityIndicator
                        style={{ height: 60 }}
                        color="#008080"
                        size="small"
                    /> :

                    <FlatList
                        data={leaveapidata}
                        renderItem={_RenderItem}
                        // keyExtractor={keyExtractorVisit}
                        getItemLayout={getItemLayout}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={_Refresh}
                    />
                }
            </View>
            </> }
        </View >
    );
}