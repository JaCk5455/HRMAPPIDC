import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');



export default function HomeScreen() {
    const navigation = useNavigation();
    const [abc, setAbc] = React.useState();

    const gridItems = [
        { name: 'Leaves', icon: require('../assets/EmpLeaves.png'), navigateTo: 'MainLeaveScreen' },
        { name: 'Salary Slip', icon: require('../assets/empsalary.png'), navigateTo: 'MainSalarySlip' },
        { name: 'Attendance', icon: require('../assets/Attendancee.png'), navigateTo: 'MainAttendanceScreen' },
        // { name: 'Encashment', icon: require('../assets/Encashment.jpg'), navigateTo: 'EncashmentScreen' },
        { name: 'Loan Application', icon: require('../assets/loanapplication.jpg'), navigateTo: 'LoanApplicationScreen' },

      //   { name: 'Leaves Approvals', icon: require('../assets/LeaveAprove.png'), navigateTo: 'LeavesApprovalStatusScreen'}

    ];
    if ( abc[0].managersst == 1) {
        gridItems.push({ name: 'Leaves Approvals', icon: require('../assets/LeaveAprove.png'), navigateTo: 'LeavesApprovalStatusScreen' }
        )
    }





    // const PersonalDetail = [
    //     {
    //         Absent: "3 Days",
    //         Late: "4 Days",
    //         Leave: "5",
    //         managersst: 1,
    //         TodayEmpAbsents: "5 Employees",
    //         TodayEmpLate: "4 Employees",
    //         TodayEmpOnLeave: "1 Employee",
    //         pendingApprovals: 5,
    //     },
    // ]


    React.useEffect(() => {


        const PersonalDetail = [
            {
                Absent: "3 Days",
                Late: "4 Days",
                Leave: "5",
                managersst: 1,
                TodayEmpAbsents: "5 Employees",
                TodayEmpLate: "4 Employees",
                TodayEmpOnLeave: "1 Employee",
                pendingApprovals: 5,
            },
        ]
        setAbc(PersonalDetail);
        console.log("PersonalDatailData", abc)
        // if (abc[0].managersst == 1) {
        //         gridItems.push({ name: 'Leaves Approvals', icon: require('../assets/LeaveAprove.png'), navigateTo: 'LeavesApprovalStatusScreen' }
        //         )
        //     }

    }, [])



    // const ManagersScreenView = () => {
    //     let isAllowed = false;
    //     if (PersonalDetail.length) {
    //         let isAllowManagerScreenView = PersonalDetail.find(a => a.managersst == 1) ? true : false;
    //         isAllowed = isAllowManagerScreenView;
    //     }
    //     return isAllowed;
    // }




    // const _ListHeader = () => {
    //     return (
    //         <View>
    //             <View style={styles.Lst_Header}>
    //                 <View style={{ borderWidth: 0.5, borderRadius: wp("1%"), marginBottom: wp("3%"), borderColor: '#008080', backgroundColor: '#008080' }}>
    //                     <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Attandance Details</Text>
    //                 </View>

    //                 <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                             Late:
    //                         </Text>
    //                     </View>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                             {abc.length > 0 ? (abc[0].Late == "" ||  abc[0].Late == null ? "N/A" : abc[0].Late ): 'N/A'}
    //                         </Text>
    //                     </View>
    //                 </View>


    //                 <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                             Absant:
    //                         </Text>
    //                     </View>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                             {abc.length > 0 ? (abc[0].Absent == "" ||  abc[0].Absent == null ? "N/A" : abc[0].Absent ) : 'N/A'}
    //                         </Text>

    //                     </View>
    //                 </View>

    //                 <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                             Leaves:
    //                         </Text>
    //                     </View>
    //                     <View style={{ flex: 1 }}>
    //                         <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                             {abc.length > 0 ? (abc[0].Leave == "" ||  abc[0].Leave == null ? "N/A" : abc[0].Leave ) : "N/A"}
    //                         </Text>

    //                     </View>
    //                 </View>
    //             </View>

    //             {/* {abc[0].managersst == 1 ?
    //                 <View style={styles.Lst_Header}>

    //                     <View style={{ borderWidth: 0.5, borderRadius: wp("1%"), marginBottom: wp("3%"), borderColor: '#008080', backgroundColor: '#008080' }}>
    //                         <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Employee Daily Report</Text>

    //                     </View>

    //                     <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                                 Late:
    //                             </Text>
    //                         </View>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                                 {abc.length > 0 ? abc[0].TodayEmpLate : "N/A"}
    //                             </Text>

    //                         </View>
    //                     </View>

    //                     <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                                 Absant:
    //                             </Text>
    //                         </View>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                                 {abc.length > 0 ? abc[0].TodayEmpAbsents: "N/A"}
    //                             </Text>

    //                         </View>
    //                     </View>

    //                     <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: 'grey', padding: wp("1%") }}>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: 'grey', fontSize: wp("4%"), fontWeight: 'bold' }}>
    //                                 Leaves:
    //                             </Text>
    //                         </View>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ color: "red", fontSize: wp("3%") }}>
    //                                 {abc.length > 0 ? abc[0].TodayEmpOnLeave:'N/A'}
    //                             </Text>

    //                         </View>
    //                     </View>

    //                     <View style={{ marginBottom: wp("1%"), marginTop: wp("2%") }}>

    //                         <TouchableOpacity onPress={() => navigation.navigate('LeavesApprovalStatusScreen')}
    //                             style={{ backgroundColor: 'orange', borderWidth: 0.5, borderRadius: wp("2%"), borderColor: 'orange', }}>
    //                             <AntDesign name="rightcircleo" size={wp('6%')} color="#777" style={{ position: "absolute", right: Platform.isPad ? 5 : 2, top: "15%" }} />
    //                             <Text style={{ fontSize: wp("4%"), padding: wp("2%"), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Pending Leaves Aprovals/Rejections</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View> : <></>} */}

    //         </View>

    //     )
    // }

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
                    //  ListHeaderComponent={_ListHeader}

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