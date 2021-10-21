import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, StatusBar, FlatList, Alert, Platform, Modal, StyleSheet, TextInput } from 'react-native';
import moment from 'moment';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

export default function LeavesApprovalStatusScreen({ navigation, route }) {
    const [loading, IsLoading] = React.useState(false);
    const [obj, setObj] = React.useState([]);
    const [showotpmodel, setShowOtpModel] = React.useState(false);
    const [approveremark, setApproveRemark] = React.useState('');
    const [showrejectionotpmodel, setShowRejectionOtpModel] = React.useState(false);
    const [rejectremark, setRejectRemark] = React.useState('');



    const LeaveApprovalsRecord = [
        {
            name: "Umer Farooq",
            Empid: "IDC-1985",
            LeaveType: "Compensatory leave",
            LeaveStartDate: "2021-02-17T00:00:00",
            LeaveEndDate: "2021-02-17T00:00:00",
            TotalDays: "1",
            LeaveReason: "Urgant Piece of Work"
        },
        {
            name: "JacK ",
            Empid: "IDC-1173",
            LeaveType: "Short Leave",
            LeaveStartDate: "2021-02-17T00:00:00",
            LeaveEndDate: "2021-02-17T00:00:00",
            TotalDays: "2",
            LeaveReason: "Marrige of my Czn",
        },

        {
            name: "John",
            Empid: "IDC-1171",
            LeaveType: "Causal Leaves",
            LeaveStartDate: "2021-02-17T00:00:00",
            LeaveEndDate: "2021-02-17T00:00:00",
            TotalDays: "3",
            LeaveReason: "Transport issue",
        },

        {
            name: "jade",
            Empid: "IDC-1169",
            LeaveType: "Annual leaves",
            LeaveStartDate: "2021-02-17T00:00:00",
            LeaveEndDate: "2021-02-17T00:00:00",
            
            TotalDays: "0.5",
            LeaveReason: "Treveling to my HomeTown",
        },

    ]


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

            <View style={{ flex: 1, backgroundColor: '#fff', padding: wp('1%') }}>

                <View style={{
                    borderWidth: 1,
                    borderColor: '#CBCBCB',
                    padding: wp('2.5%'),
                    marginHorizontal: wp("2%"),
                    marginVertical: wp("1.7%"),
                    borderRadius: 10,

                }}>


                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ fontSize: wp("4.5%"), fontWeight: 'bold', color: '#000000', textAlign: 'center' }}>
                            {item.Empid + " - " + item.name}
                        </Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: wp("3%"), alignContent: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: '#008080' }}>
                            <Text style={{
                                fontSize: wp('3.8%'),
                                fontWeight: 'bold',
                                color: LeaveColor(item.LeaveType),

                                alignContent: 'center'
                            }}>
                                {item.LeaveType}
                            </Text>
                        </View>

                        <View style={{ flex: 1, paddingLeft: wp("2%") }}>
                            {item.TotalDays > 1 ? <Text style={{
                                fontSize: wp('3.8%'),
                                fontWeight: 'bold',
                                color: "#546ba9",
                                // color: '#777',

                                alignContent: 'center'
                            }}>

                                {item.TotalDays + ' Days'}
                            </Text> :

                                <Text style={{
                                    fontSize: wp('3.8%'),
                                    fontWeight: 'bold',
                                    // color: "brown",
                                    color: '#546ba9',

                                    alignContent: 'center'
                                }}>

                                    {item.TotalDays + ' Day'}
                                </Text>
                            }
                        </View>
                    </View>

                    <View style={{ marginTop: wp("2%") }}>

                        {item.TotalDays <= 1 ?

                            <Text style={{
                                fontSize: wp('3.8%'),
                                fontWeight: 'bold',
                                color: 'black',

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

                    <View style={{ marginTop: wp("2%") }}>
                        <Text style={{ fontSize: wp("3.8%"), color: '#004CFF', fontWeight: 'bold' }}>
                            {item.LeaveReason}
                        </Text>
                    </View>


                    <View style={{ marginTop: wp("3%"), flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity

                                onPress={() => {
                                    let abj = {
                                        LeaveeReason: item.LeaveReason,
                                        EmpName: item.name,
                                        LeaveTypee: item.LeaveType

                                    }
                                    setObj(abj);
                                    setShowOtpModel(true)



                                }}
                                style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'green', justifyContent: 'center', borderRadius: wp("2%") }}
                            >
                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3.5%") }}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity

                                onPress={() => {
                                    let abj = {
                                        LeaveeReason: item.LeaveReason,
                                        EmpName: item.name,
                                        LeaveTypee: item.LeaveType

                                    }
                                    setObj(abj);
                                    setShowRejectionOtpModel(true)



                                }}
                                style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'red', justifyContent: 'center', borderRadius: wp("2%") }}>
                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp("3.5%") }}>
                                    Reject
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View >
        )
    }

    // ....... End : FlatList_RenderItem_Function .... //

    const _ListHeader = () => {
        return (
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
                   1 Late
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
                    2 Absants
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
                        3 emp
                    </Text>

                </View>
            </View>

            
        </View>
        )}


    const getItemLayout = (data, index) => (
        {
            length: 30, offset: 30 * index, index
        }
    );

    const _Back = () => {
        return (
            setShowOtpModel(false)
        )
    }

    const _BackReject = () =>{
        return(
            setShowRejectionOtpModel(false)
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <ActivityIndicator
                    style={{ height: 60 }}
                    color="#008080"
                    size="small"
                /> :

                <FlatList
                    data={LeaveApprovalsRecord}
                    renderItem={_RenderItem}
                    // keyExtractor={keyExtractorVisit}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={_ListHeader}
                />
            }


            <Modal
                animationType="slide"
                transparent={true}
                visible={showotpmodel}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#66b2b2", }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp("4%") }}>Are you sure, you want to Approve.</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1.3, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginRight: wp("2%") }}>

                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{obj.EmpName}</Text>

                            </View>

                            <View style={{ flex: 1, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginLeft: wp("2%") }}>
                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{obj.LeaveTypee}</Text>
                            </View>
                        </View>


                        <View>
                            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#777777' }}>
                                {obj.LeaveeReason}
                            </Text>
                        </View>


                        <View style={{ borderWidth: 0.3, borderColor: 'grey', marginTop: wp("2%") }}>
                            <TextInput
                                placeholder="Remarks"
                                style={{ color: '#05375a', textAlign: 'center', height: 40 }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(val) => setApproveRemark(val)}
                                multiline={true} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: wp("4%") }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'green', justifyContent: 'center', borderRadius: wp("2%") }}
                                    onPress={_Back}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Approve</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'blue', justifyContent: 'center', borderRadius: wp("2%"), }}
                                    onPress={_Back}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>





                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showrejectionotpmodel}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#66b2b2", }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp("4%") }}>Are you sure, you want to Reject.</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1.3, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginRight: wp("2%") }}>

                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{obj.EmpName}</Text>

                            </View>

                            <View style={{ flex: 1, marginTop: wp("2%"), flexDirection: 'row', alignItems: 'center', marginLeft: wp("2%") }}>
                                <FontAwesome name="circle" size={wp('3%')} color="#008080" style={{ justifyContent: 'center' }} />
                                <Text style={{ color: '#777777', fontSize: wp("3.5%"), fontWeight: 'bold', paddingLeft: wp('1%') }}>{obj.LeaveTypee}</Text>
                            </View>
                        </View>


                        <View>
                            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: '#777777' }}>
                                {obj.LeaveeReason}
                            </Text>
                        </View>


                        <View style={{ borderWidth: 0.3, borderColor: 'grey', marginTop: wp("2%") }}>
                            <TextInput
                                placeholder="Remarks"
                                style={{ color: '#05375a', textAlign: 'center', height: 40 }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(val) => setRejectRemark(val)}
                                multiline={true} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: wp("4%") }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'red', justifyContent: 'center', borderRadius: wp("2%") }}
                                    onPress={_BackReject}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Reject</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ height: wp("10%"), width: wp("30%"), backgroundColor: 'blue', justifyContent: 'center', borderRadius: wp("2%"), }}
                                    onPress={_BackReject}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: wp('3.5%') }}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>





                    </View>
                </View>
            </Modal>

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