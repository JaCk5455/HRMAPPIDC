import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, StatusBar, FlatList, Alert , Platform , Modal, StyleSheet} from 'react-native';
import moment from 'moment';
import {Ionicons } from '@expo/vector-icons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

export default function LeavesApprovalStatusScreen({ navigation }) {
    const [loading, IsLoading] = React.useState(false);
const [showalart , setShowAlart] =  React.useState(true);
const [showotpmodel, setShowOtpModel] = React.useState(false);

    const LeaveApprovalsRecord = [
        {
            name: "Umer Farooq",
            Empid: "IDC-1985",
            LeaveType: "Compensatory leave",
            Date: "12-05-2021",
            Time: "10:00 am",
            TotalDays: "1"
        },
        {
            name: "JacK",
            Empid: "IDC-1173",
            LeaveType: "Short Leave",
            Date: "12-05-2021",
            Time: "10:00 am",
            TotalDays: "2"
        },

        {
            name: "John",
            Empid: "IDC-1171",
            LeaveType: "Causal Leaves",
            Date: "12-05-2021",
            Time: "10:00 am",
            TotalDays: "3"
        },

        {
            name: "jade",
            Empid: "IDC-1169",
            LeaveType: "Annual leaves",
            LeaveStartDate: "2021-02-17T00:00:00",
            LeaveEndDate: "2021-02-17T00:00:00",
            Time: "10:00 am",
            TotalDays: "0.5"
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
                                paddingTop: wp('2%')
                            }}>
                                {moment(item.LeaveStartDate).format('D MMM YYYY, h:mm:ss a')}
                            </Text>
                            :
                            <Text style={{
                                fontSize: wp('3.8%'),
                                fontWeight: 'bold',
                                color: 'black',
                                paddingTop: wp('2%')
                            }}>
                                {moment(item.LeaveStartDate).format('D MMM YYYY') + ' - ' + moment(item.LeaveEndDate).format('D MMM YYYY')}
                            </Text>
                        }

                    </View>

                    <View style={{ marginTop: wp("3%"), flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems:'center' }}>
                            <TouchableOpacity 
                           
                            onPress={()=>{
                         
                                        Alert.alert(
                                            "Confirmation",
                                            "Are you sure, you want to Approve.",
                                            [

                                                { text: "Yes", onPress: () => { setShowOtpModel(true); } },
                                                {
                                                    text: "No",
                                                    onPress: () => {},
                                                    style: "cancel"
                                                },
                                              
                                            ],
                                            { cancelable: true }
                                        )
                                    
                               
                            }}
                            style={{height:wp("10%"),width:wp("30%"), backgroundColor:'green', justifyContent:'center', borderRadius:wp("2%")}}
                         >
                                <Text style={{textAlign:'center', color:'#fff' , fontWeight:'bold', fontSize:wp("3.5%")}}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 1, alignItems:'center' }}>
                            <TouchableOpacity style={{height:wp("10%"),width:wp("30%"), backgroundColor:'red', justifyContent:'center', borderRadius:wp("2%")}}>
                                <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:wp("3.5%") }}>
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
                />
            }


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
        margin: 20,
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
})