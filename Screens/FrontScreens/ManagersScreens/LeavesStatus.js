import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, StatusBar, FlatList, Alert, Platform, Modal, StyleSheet, TextInput, Button } from 'react-native';
import moment from 'moment';
import { SearchBar } from 'react-native-elements';

import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Helper } from '../../../Components/Helpers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Contants from '../../../constants/constants'
import ProgressBar from '../../../Components/ProgressBar';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
// import filter from 'lodash.filter';



const { height, width } = Dimensions.get('window');

export default function LeavesApprovalStatusScreen({ navigation, route }) {
    const [showProgressBar, setShowProgressBar] = React.useState(false);

    const [loading, IsLoading] = React.useState(true);
    const [data, SetData] = React.useState([]);
    const [modeldata, setModelData] = React.useState([]);
    const [showotpmodel, setShowOtpModel] = React.useState(false);

    const [showrejectionotpmodel, setShowRejectionOtpModel] = React.useState(false);
    const [leaveaprovalapidata, setLeaveAprovalApiData] = React.useState([]);
    const [filterleaveaprovalapidata, setFilterLeaveAprovalApiData] = React.useState([]);
    const [txtSearch, SetTxtSearch] = React.useState("");

    const [query, setQuery] = React.useState('');
    const [fullData, setFullData] = React.useState([]);



    const [remark, setRemark] = React.useState('');
    const [remarkError, setRemarklError] = React.useState(false);
    const [remarkErrorMessage, setRemarkErrorMessage] = React.useState('');

    const [yearapidata, setYearApiData] = React.useState([]);
    const [monthapidata, setMonthApiData] = React.useState([]);

    const [maxfiscalid, setMaxFiscalId] = React.useState(null);
    const [maxperiodid, setMaxPeriodId] = React.useState(null);
    const [emptylist, setEmptyList] = React.useState(false);
    const [showtick, setshowTick] = React.useState(false);




    // ......... Begin: AsynStorageData for EmpId ........ //
    React.useEffect(() => {
        Helper.getLoggedInData().then((response) => {
            SetData(response);
            //  console.log("aaa", response)

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
            // console.log("maxFId", Maxfiscalvalue)
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
                //console.log("fiscal", payloadData)
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
            //console.log('maxperidvalue', minPeriod)

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
                //console.log('month', payloaddata)
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
        if (data.length > 0 && maxfiscalid !== null && maxperiodid !== null) {
            // console.log("aaa" , maxperiodid , maxfiscalid ,data[0].EmpId ) 
            getEmpLeaveAprovalRecord(signal)

        }
    }, [data, maxfiscalid, maxperiodid])

    const getEmpLeaveAprovalRecord = async (signal) => {
        try {
            // console.log("aaa", maxfiscalid, maxperiodid)
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/LeaveApprovalList', {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    Empid: data[0].EmpId,

                    // Empid: 277,
                    FiscalYearId: 9,
                    fromPeriodId: 101,
                    ToPeriodId: 101,

                    //Empid: route.params.EmpId,
                    // FiscalYearId: maxfiscalid,
                    // fromPeriodId: maxperiodid,
                    // ToPeriodId: maxperiodid



                })
            });
            const responseObj = await response.json();
            if (responseObj.statusCode == 200) {
                let payloadData = JSON.parse(responseObj.payload);

                // console.log("Leave Data", payloadData)
                if (payloadData.length > 0) {
                    setLeaveAprovalApiData(payloadData);

                    setFullData(payloadData);
                    IsLoading(false);
                    setEmptyList(true);
                }
                else {
                    // Alert.alert(
                    //     "Info",
                    //     "No Record Found",
                    //     [
                    //         {
                    //             text: "Ok",
                    //             onPress: () => { navigation.navigate('HomeScreen') },
                    //             style: "cancel"
                    //         }
                    //     ]
                    // );
                    setEmptyList(true);
                    IsLoading(false);
                }
            }

        }
        catch (error) {
            console.log('Error', error);
        }

    }


    const resetValidation = () => {
        setRemarklError(false);
        setRemarkErrorMessage("");
    }

    const validateFields = (status, leaveid) => {
        console.log('api called', status, leaveid)
        resetValidation();


        if (remark.trim() == '' || remark == null) {

            setRemarklError(true);
            setRemarkErrorMessage("Remarks is required.");

        }

        else {
            const abortController = new AbortController();
            const signal = abortController.signal;
            console.log("empid", data[0].EmpId)
            if (data.length > 0) {
                ApproveLeave(signal, status, leaveid);
                setShowProgressBar(false);
            }

            return function cleanup() {
                abortController.abort();
            }
        }

    }


    //..............Begin: ApproveRejectSubmit ApI ....................//
    const ApproveLeave = async (signal, status, leaveid) => {
        // console.log('LId', leaveid, status)
        // console.log("empid" , data[0].EmpId)
        let empid = data[0].EmpId
        try {
            console.log('remarks', remark)
            const response = await fetch(Contants.API_URL + 'EmployeeInfo/V1/ApproveLeave', {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    status: status,
                    //Empid: data[0].EmpId,
                    ApplyLeaveId: leaveid,
                    remarks: remark,
                    Empid: empid,


                    // status :1,
                    // Empid : 277,
                    // ApplyLeaveId : 100,
                    // remarks : "dsfgvdfg"




                })
            });


            const data = await response.json();
            // console.log("submit", data)
            if (data.statusCode == 200) {
                let payload = JSON.parse(data.payload);

                //  setAproveRejectStatus(payload);
                Alert.alert(
                    "Info",
                    payload[0].RetrunMessage,
                    [
                        {
                            text: "Ok",
                            onPress: () => { _Back() },
                            style: "cancel"
                        }
                    ]
                );

            }
            //setApproveRemarklError(false);
        }

        catch (e) {
            console.log('Error', e);
            Alert.alert(
                "Info",
                "Something going Wrong, Please Contact Hr.",
                [
                    {
                        text: "Ok",
                        onPress: () => { _Back() },
                        style: "cancel"
                    }
                ]
            );

        }
    }
    //..............END: ApproveRejectSubmit ApI ....................//



    // ....... Begin : FlatList_RenderItem_Function .... // 
    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }

    const LeaveColor = (item) => {
        let color = '#008080'

        if (item == 'Annual leaves') {
            color = '#777777'
        }
        else if (item == 'Causal Leaves') {
            color = '#ff8000';
        }

        else if (item == 'Short Leave') {
            color = '#004CFF';
        }

        else if (item == 'Sick Leave') {
            color = '#A37546';
        }

        else if (item == 'Leave Without Pay') {
            color = '#FF2E00';
        }

        else if (item == 'Compensatory leave') {
            color = '#008080';
        }

        else {
            color = '#008080';
        }

        return color;
    }

    function ItemView({ item }) {
        return (

            <View style={{ flex: 1, backgroundColor: '#FBFCFF', padding: wp('1%') }}>


                <View style={{
                    // borderWidth: 1,
                    // borderColor: '#CBCBCB',
                    padding: wp('2%'),
                    marginHorizontal: wp("1%"),
                    marginVertical: wp("1%"),
                    // borderRadius: 10,
                    flexDirection: "row",
                    // backgroundColor:"#fff"
                    borderRadius: 5,
                    borderColor: '#D3D3D3',
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 0.1,
                    elevation: 4,
                    shadowRadius: 3,
                    backgroundColor: '#fff'
                }}>


                    <View style={{ flex: 2.3 }}>
                        <Collapse>

                            <CollapseHeader>
                                <View style={{ flexDirection: 'row' }}>

                                    {/* <Text style={{ fontSize: wp("4.5%"), fontWeight: 'bold', color: '#000000', textAlign: 'center' }}> */}
                                    <Text style={{ color: '#4A4B4D', fontSize: wp('3.5%'), fontWeight: 'bold', textAlign: 'center' }}>

                                        {item.EmployeeId + " - " + item.EmpFullName}
                                    </Text>
                                </View>


                                <View style={{ flexDirection: 'row', marginTop: wp("1%"), alignContent: 'center' }}>
                                    <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: '#008080' }}>
                                        <Text style={{
                                            fontSize: wp('3.5%'),
                                            fontWeight: 'bold',
                                            color: LeaveColor(item.Description),

                                            alignContent: 'center'
                                        }}>
                                            {item.Description}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 0.3, paddingLeft: wp("2%") }}>
                                        {item.Totaldays > 1 ? <Text style={{
                                            fontSize: wp('3%'),
                                            // fontWeight: 'bold',
                                            color: "#546ba9",
                                            // color: '#777',

                                            alignContent: 'center'
                                        }}>

                                            {item.Totaldays + ' Days'}
                                        </Text> :

                                            <Text style={{
                                                fontSize: wp('3%'),
                                                fontWeight: 'bold',
                                                // color: "brown",
                                                color: '#546ba9',

                                                alignContent: 'center'
                                            }}>

                                                {item.Totaldays + ' Day'}
                                            </Text>
                                        }
                                    </View>


                                </View>

                                <View style={{ marginTop: wp("1%") }}>

                                    {item.Totaldays <= 1 ?

                                        <Text style={{
                                            // fontSize: wp('3.8%'),
                                            fontWeight: 'bold',
                                            // color: 'black',
                                            color: '#4A4B4D', fontSize: wp('3.5%'),

                                        }}>
                                            {moment(item.LeaveStartDate).format('D MMM YYYY, h:mm:ss a')}
                                        </Text>
                                        :
                                        <Text style={{
                                            fontSize: wp('3.8%'),
                                            fontWeight: 'bold',
                                            color: 'black',

                                        }}>
                                            {moment(item.LeaveStartDate).format('D MMM YYYY') + ' - ' + moment(item.LeaveEndDate).format('D MMM YYYY')}
                                        </Text>
                                    }

                                </View>

                            </CollapseHeader>

                            <CollapseBody>

                                <View style={{ marginTop: wp("1%") }}>
                                    <Text style={{ fontSize: wp("3.5%"), color: '#4A4B4D', fontWeight: 'bold' }}>
                                        {item.Title}
                                    </Text>
                                </View>

                                <View style={{ marginTop: wp("1%") }}>
                                    <Text style={{ fontSize: wp("3.5%"), color: '#004CFF', fontWeight: 'bold' }}>
                                        {item.leaveReason}
                                    </Text>
                                </View>

                            </CollapseBody>

                        </Collapse>
                    </View>

                    <View style={{ flex: 1 }}>

                        {item.Status == 1 ?
                            <View>

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            let AcceptModelData = {
                                                LeaveeReason: item.leaveReason,
                                                EmpName: item.EmpFullName,
                                                LeaveTypee: item.Description,
                                                ApplyLeaveId: item.ApplyLeaveId,
                                                LeaveStartDate: item.LeaveStartDate,
                                                LeaveEndDate: item.LeaveEndDate,
                                                Totaldays: item.Totaldays,
                                                Status: item.Status

                                            }
                                            setModelData(AcceptModelData);
                                            setShowOtpModel(true)



                                        }}
                                        style={{ height: wp("8%"), width: wp("25%"), backgroundColor: '#008080', justifyContent: 'center', borderRadius: wp("2%") }}
                                    >
                                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3%") }}>
                                            Recommend
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: wp("1.5%"), alignItems: 'center' }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            let RejectModelData = {
                                                LeaveeReason: item.leaveReason,
                                                EmpName: item.EmpFullName,
                                                LeaveTypee: item.Description,
                                                ApplyLeaveId: item.ApplyLeaveId,
                                                LeaveStartDate: item.LeaveStartDate,
                                                LeaveEndDate: item.LeaveEndDate,
                                                Totaldays: item.Totaldays,
                                                Status: item.Status

                                            }
                                            setModelData(RejectModelData);
                                            setShowRejectionOtpModel(true)
                                            //  setShowProgressBar(true);

                                        }}
                                        style={{ height: wp("8%"), width: wp("25%"), backgroundColor: '#ff4d4d', justifyContent: 'center', borderRadius: wp("2%") }}>
                                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3%") }}>
                                            Reject
                                        </Text>
                                    </TouchableOpacity>
                                </View>





                            </View>
                            :
                            <></>

                        }

                        {item.Status == 2 ?

                            <View>

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            let AcceptModelData = {

                                                LeaveeReason: item.leaveReason,
                                                EmpName: item.EmpFullName,
                                                LeaveTypee: item.Description,
                                                ApplyLeaveId: item.ApplyLeaveId,
                                                LeaveStartDate: item.LeaveStartDate,
                                                LeaveEndDate: item.LeaveEndDate,
                                                Totaldays: item.Totaldays,
                                                Status: item.Status

                                            }
                                            setModelData(AcceptModelData);
                                            setShowOtpModel(true)



                                        }}
                                        style={{ height: wp("8%"), width: wp("25%"), backgroundColor: '#008080', justifyContent: 'center', borderRadius: wp("2%") }}
                                    >
                                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3%") }}>
                                            Approve
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: wp("1%"), alignItems: 'center' }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            let RejectModelData = {

                                                LeaveeReason: item.leaveReason,
                                                EmpName: item.EmpFullName,
                                                LeaveTypee: item.Description,
                                                ApplyLeaveId: item.ApplyLeaveId,
                                                LeaveStartDate: item.LeaveStartDate,
                                                LeaveEndDate: item.LeaveEndDate,
                                                Totaldays: item.Totaldays,
                                                Status: item.Status

                                            }
                                            setModelData(RejectModelData);
                                            setShowRejectionOtpModel(true)



                                        }}
                                        style={{ height: wp("8%"), width: wp("25%"), backgroundColor: '#ff4d4d', justifyContent: 'center', borderRadius: wp("2%") }}>
                                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3%") }}>
                                            Reject
                                        </Text>
                                    </TouchableOpacity>
                                </View>





                            </View>
                            :
                            <></>

                        }
                    </View>

                </View>
            </View >
        )
    }



    function _Back() {


        // setShowOtpModel(false),
        setShowOtpModel(false)
        setRemarklError(false)
        setShowRejectionOtpModel(false)
        setRemark('')
        setQuery('');
        setshowTick(false);
        // handleSearch(query)

        const abortController = new AbortController();
        const signal = abortController.signal;
        if (data.length > 0 && maxfiscalid !== null && maxperiodid !== null) {
            getEmpLeaveAprovalRecord(signal)

        }

    }


    const onRefresh = () => {

        const abortController = new AbortController();
        const signal = abortController.signal;
        if (data.length > 0 && maxfiscalid !== null && maxperiodid !== null) {
            // console.log("aaa" , maxperiodid , maxfiscalid ,data[0].EmpId ) 
            getEmpLeaveAprovalRecord(signal)

        }
    }

    const getItemLayout = (data, index) => (
        { length: 80, offset: 80 * index, index }
    );

    const keyExtractor = React.useCallback((item) => item.ApplyLeaveId.toString(), []);


    // const EmptyListMessage = ({ item }) => {
    //     return (

    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


    //             <Text
    //                 style={styles.emptyListStyle}
    //             >
    //                 No Record Found.
    //             </Text>


    //             <Button
    //                 title="Home"
    //                 onPress={() => {
    //                     navigation.navigate('HomeScreen')
    //                 }}
    //             />
    //         </View>




    //     );
    // };

    const EmptyList = () => {
        return (
            emptylist ?
                <View style={{ backgroundColor: '#FBFCFF', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: wp("50%") }}>
                    <Text style={{
                        padding: 10,
                        fontSize: 18,
                        textAlign: 'center',
                    }}> No Record Found.</Text>
                    <Button
                        title="Home"
                        onPress={() => {
                            navigation.navigate('HomeScreen')
                        }}
                    />

                </View> : <></>
        )

    }

    const renderHeader = () => {
        return (
            // <SearchBar
            //     placeholder="Type Here..."
            //     lightTheme
            //     round
            //     value={txtSearch}
            //     onChangeText={(text) => searchFilterFunction(text)}
            //     autoCorrect={false}
            // />
            // console.log("Abc")

            <View
                style={{
                    // backgroundColor: '#fff',
                    // padding: 10,
                    // marginVertical: 10,
                    // borderRadius: 20,
                    // borderWidth:1

                    // padding: wp('2.5%'),
                    padding: 10,
                    marginHorizontal: wp("1%"),
                    marginVertical: wp("1%"),
                    borderRadius: 5,
                    borderColor: '#D3D3D3',
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 0.1,
                    elevation: 4,
                    shadowRadius: 3,
                    backgroundColor: '#fff',
                    flexDirection: "row"




                }}
            >
                {showtick ?
                    <TouchableOpacity
                        onPress={_Back}>

                        <Ionicons name="arrow-back" size={24} color="black" />
                        {/* <Text>Back</Text> */}
                    </TouchableOpacity>
                    : <></>}

                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    // clearButtonMode="always"
                    value={query}

                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search EmpID / Name"
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                    placeholderTextColor="#008080"

                />

            </View>




        );
    };



    // const searchFilterFunction = (text) => {
    //     SetTxtSearch(text);

    //     const newData = leaveaprovalapidata.filter(item => {
    //         item.EmpFullName.toUpperCase();
    //         setLeaveAprovalApiData(newData);
    //         //    const textData = text.toUpperCase();

    //         //    return itemData.indexOf(textData) > -1;    
    //     })


    // };


    const handleSearch = text => {
        setshowTick(true);
        console.log("fulldata", fullData);
        const formattedQuery = text.toLowerCase();
        const filteredData = fullData.filter(element => {
            return (element.EmpFullName + element.EmployeeId || '').toLowerCase().indexOf(formattedQuery) > -1;
        });
        setLeaveAprovalApiData(filteredData);
        setQuery(text);
    };

    // const contains = ({ EmpFullName, email }, query) => {
    //     // const { first, last } = name;

    //     // if (first.includes(query) || last.includes(query) || email.includes(query)) {
    //     if (EmpFullName.includes(query)) {
    //         return true;
    //     }

    //     return false;
    // };








    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />
            <ProgressBar visible={showProgressBar} text="Please wait" />

            {loading ?
                <ActivityIndicator
                    style={{ height: 60 }}
                    color="#008080"
                    size="small"
                /> :

                <FlatList
                    data={leaveaprovalapidata}
                    initialNumToRender={10}
                    maxToRenderPerBatch={7}
                    windowSize={2}
                    renderItem={_RenderItem}
                    getItemLayout={getItemLayout}
                    //keyExtractor={(item, index) => index.toString()}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={100}
                    ListEmptyComponent={EmptyList}
                    onRefresh={() => onRefresh()}
                    refreshing={loading}
                    ListHeaderComponent={renderHeader()}
                    contentContainerStyle={{ paddingBottom: 50, backgroundColor: '#FBFCFF' }}
                // ListHeaderComponent={_ListHeader}
                />
            }

            {/* .............................Begin: AcceptModel........... */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showotpmodel}

            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={_Back}>

                            <Ionicons name="arrow-back" size={24} color="black" />
                            <Text>Back</Text>
                        </TouchableOpacity>




                        {modeldata.Status == 1 ?
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#66b2b2", }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp("4%") }}>Are you sure, you want to Recommend.</Text>
                            </View> : <></>}

                        {modeldata.Status == 2 ?
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#66b2b2", }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp("4%") }}>Are you sure, you want to Approve.</Text>
                            </View> : <></>
                        }



                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1.3, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginRight: wp("2%") }}>

                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{modeldata.EmpName}</Text>

                            </View>

                            <View style={{ flex: 1, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginLeft: wp("2%") }}>
                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{modeldata.LeaveTypee}</Text>
                            </View>
                        </View>


                        <View style={{ marginTop: wp("2%") }}>
                            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#000000' }}>
                                {modeldata.LeaveeReason}
                            </Text>
                        </View>


                        <View style={{ marginTop: wp("2%") }}>

                            {modeldata.Totaldays <= 1 ?

                                <Text style={{
                                    fontSize: wp('3.8%'),
                                    fontWeight: 'bold',
                                    color: 'black',

                                }}>
                                    {moment(modeldata.LeaveStartDate).format('D MMM YYYY, h:mm:ss a')}
                                </Text>
                                :
                                <Text style={{
                                    fontSize: wp('3.8%'),
                                    fontWeight: 'bold',
                                    color: 'black',

                                }}>
                                    {moment(modeldata.LeaveStartDate).format('D MMM YYYY') + ' - ' + moment(modeldata.LeaveEndDate).format('D MMM YYYY')}
                                </Text>
                            }


                        </View>


                        <View style={{ borderWidth: 0.3, borderColor: 'grey', marginTop: wp("2%") }}>
                            <TextInput
                                placeholder="Remarks"
                                style={{ color: '#05375a', textAlign: 'center', height: 40, justifyContent: 'center', alignContent: 'center' }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(val) => setRemark(val)}
                                multiline={true} />
                        </View>
                        {remarkError && (
                            <Text style={{ fontSize: 11, color: 'red', marginTop: 5 }}>{remarkErrorMessage}</Text>
                        )}


                        <View style={{ alignItems: 'center', paddingTop: wp("3%") }}>


                            {modeldata.Status == 1 ?
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("35%"), backgroundColor: '#008080', justifyContent: 'center', borderRadius: wp("2%") }}

                                    onPress={() => {
                                        validateFields(2, modeldata.ApplyLeaveId)

                                    }} >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Submit</Text>
                                </TouchableOpacity> : <></>
                            }


                            {modeldata.Status == 2 ?
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("35%"), backgroundColor: '#008080', justifyContent: 'center', borderRadius: wp("2%") }}

                                    onPress={() => {
                                        validateFields(3, modeldata.ApplyLeaveId)
                                    }} >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Submit</Text>
                                </TouchableOpacity> : <></>
                            }

                        </View>


                        {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("37%"), backgroundColor: 'blue', justifyContent: 'center', borderRadius: wp("2%"), }}
                                    onPress={() => {
                                        validateFields(2, modeldata.ApplyLeaveId, modeldata.EmpId)
                                    }} >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Recommended</Text>
                                </TouchableOpacity>
                            </View> */}







                    </View>
                </View>
            </Modal>
            {/* .............................End: AcceptModel........... */}



            {/* ................Begin: RejectModel................ */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showrejectionotpmodel}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={_Back}>

                            <Ionicons name="arrow-back" size={24} color="black" />
                            <Text>Back</Text>
                        </TouchableOpacity>


                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#66b2b2", }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp("4%") }}>Are you sure, you want to Reject.</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1.3, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginRight: wp("2%") }}>

                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{modeldata.EmpName}</Text>

                            </View>

                            <View style={{ flex: 1, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginLeft: wp("2%") }}>
                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{modeldata.LeaveTypee}</Text>
                            </View>
                        </View>



                        <View style={{ marginTop: wp("2%") }}>
                            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#000000' }}>
                                {modeldata.LeaveeReason}
                            </Text>
                        </View>


                        <View style={{ marginTop: wp("2%") }}>

                            {modeldata.Totaldays <= 1 ?

                                <Text style={{
                                    fontSize: wp('3.8%'),
                                    fontWeight: 'bold',
                                    color: 'black',

                                }}>
                                    {moment(modeldata.LeaveStartDate).format('D MMM YYYY, h:mm:ss a')}
                                </Text>
                                :
                                <Text style={{
                                    fontSize: wp('3.8%'),
                                    fontWeight: 'bold',
                                    color: 'black',

                                }}>
                                    {moment(modeldata.LeaveStartDate).format('D MMM YYYY') + ' - ' + moment(modeldata.LeaveEndDate).format('D MMM YYYY')}
                                </Text>
                            }


                        </View>


                        <View style={{ borderWidth: 0.3, borderColor: 'grey', marginTop: wp("2%") }}>
                            <TextInput
                                placeholder="Remarks"
                                style={{ color: '#05375a', textAlign: 'center', height: 40 }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(val) => setRemark(val)}
                                multiline={true} />
                        </View>
                        {remarkError && (
                            <Text style={{ fontSize: 11, color: 'red', marginTop: 5 }}>{remarkErrorMessage}</Text>
                        )}

                        {/* <View style={{ flexDirection: 'row', marginTop: wp("4%") }}> */}
                        <View style={{ marginTop: wp("4%"), alignItems: 'center' }}>
                            {/* <View style={{ flex: 1 }}> */}

                            {modeldata.Status == 1 ?
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("35%"), backgroundColor: 'red', justifyContent: 'center', borderRadius: wp("2%") }}
                                    onPress={() => {
                                        validateFields(5, modeldata.ApplyLeaveId)
                                    }} >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Reject</Text>
                                </TouchableOpacity>
                                : <></>}

                            {modeldata.Status == 2 ?
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("35%"), backgroundColor: 'red', justifyContent: 'center', borderRadius: wp("2%") }}
                                    onPress={() => {
                                        validateFields(4, modeldata.ApplyLeaveId)
                                    }} >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Reject</Text>
                                </TouchableOpacity>
                                : <></>}

                            {/* </View> */}


                            {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("35%"), backgroundColor: 'blue', justifyContent: 'center', borderRadius: wp("2%"), }}
                                    onPress={_Back}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Back</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>





                    </View>
                </View>
            </Modal>
            {/* ................End: RejectModel................ */}

        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: wp('3%'),
        backgroundColor: 'rgba(52, 52, 52, 0.4)'

    },
    modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    modalText: {

        fontSize: 16
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
})