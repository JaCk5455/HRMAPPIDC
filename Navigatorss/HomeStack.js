import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, Alert , Image , Button } from 'react-native';
import HomeScreen from '../Screens/Home';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from "../Components/Context";
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

import EncashmentScreen from '../Screens/FrontScreens/Encashment';
import ExtraTimeScreen from '../Screens/FrontScreens/ExtraTime';
import CompensatoryOffScreen from '../Screens/FrontScreens/CompOff';
import LoanApplicationScreen from '../Screens/FrontScreens/LoanApplication';
import FAQScreen from '../Screens/FrontScreens/FAQ';

import NewLeaveRequestScreen from '../Screens/FrontScreens/NewLeaveRequest';
import MainLeaveScreen from '../Screens/FrontScreens/LeaveMain';
import LeaveFisicalScreen from '../Screens/FrontScreens/LeaveFiscal';
import LeavesScreen from '../Screens/FrontScreens/Leaves';

import AttendanceFisicalScreen from '../Screens/FrontScreens/AttandanceFisical';
import MainAttendanceScreen from '../Screens/FrontScreens/AttandanceMainScreen';
import AttendanceScreen from '../Screens/FrontScreens/Attendance';

import MainSalarySlip from '../Screens/FrontScreens/mainSalarySlip';
import SalaryFisicalYearScreen from '../Screens/FrontScreens/SalaryFiscalYear';
import SalarySlipScreen from '../Screens/FrontScreens/Salary';

const HomeStack = createStackNavigator();
const { height, width } = Dimensions.get('window');
import { Foundation } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';


export default function HomeStackScreen({ navigation }) {
    // const url = 'https://www.facebook.com/';


    // const _handlePressButtonAsync = async () => {
    //     let result = await WebBrowser.openBrowserAsync('https://expo.io');
    //     setResult(result);
    //   };
    const { signOut } = React.useContext(AuthContext);
    return (



        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "Home",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                // headerTitleStyle: { flex: 1, textAlign: 'left' },

                // headerTitle: (props) => ( // App Logo
                //     //     // <Image
                //     //     //     style={{ width: 200, height: 50 }}
                //     //     //     source={require('../assets/logo.png')}
                //     //     //     resizeMode='contain'
                //     //     // />


                //     // <Avatar.Image source={require('../assets/logo.png')}
                //     //     style={{ position: 'relative', alignSelf: 'flex-end' }}
                //     //     size={wp('13%')}
                //     // />
                // ),
                headerShown: true,
                headerLeft: () => (
                    <FontAwesome.Button name="bars" backgroundColor="#008080" onPress={() => { navigation.openDrawer(); }}>
                    </FontAwesome.Button>
                ),
                headerRight: () => (
                    // <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>   
                    //     <TouchableOpacity onPress={() => { signOut() }}>

                    //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                    //             <Text style={{
                    //                 fontWeight: 'bold',
                    //                 // borderRadius: 1,
                    //                 color: '#fff',
                    //                 // borderRadius: 1,
                    //                 paddingRight: wp('1%'),
                    //                 // paddingLeft: wp('2%'),
                    //                 justifyContent: 'center',
                    //                 position: 'relative'
                    //             }}>Sign Out</Text>
                    //             <Text style={{
                    //                 alignItems: 'center',
                    //                 position: 'relative',
                    //                 paddingRight: wp('2%')

                    //             }}>
                    //                 <Feather name="log-out" size={24} color="#fff" />
                    //             </Text>

                    //         </View>
                    //     </TouchableOpacity>
                    // </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            <View>
                                <Text style={{ color: 'red' }}>
                                    {
                                        Alert.alert(
                                            "Confirmation",
                                            "Are you sure, you want to logout.",
                                            [
                                                {
                                                    text: "No",
                                                    onPress: () => { navigation.navigate('HomeScreen') },
                                                    style: "cancel"
                                                },
                                                { text: "Yes", onPress: () => { signOut() } }
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                </Text>
                            </View>
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                                <Text style={{
                                    fontWeight: 'bold',
                                    // borderRadius: 1,
                                    color: '#fff',
                                    // borderRadius: 1,
                                    paddingRight: wp('1%'),
                                    // paddingLeft: wp('2%'),
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>Sign Out</Text>
                                <Text style={{
                                    alignItems: 'center',
                                    position: 'relative',
                                    paddingRight: wp('2%')

                                }}>
                                    <Feather name="log-out" size={24} color="#fff" />
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>





                )
            }} />




            <HomeStack.Screen name="MainLeaveScreen" component={MainLeaveScreen} options={{
                title: "Leaves Status",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />

            <HomeStack.Screen name="LeaveFisicalScreen" component={LeaveFisicalScreen} options={{
                title: "Leaves Status",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />


            <HomeStack.Screen name="LeavesScreen" component={LeavesScreen} options={{
                title: "Leaves Status",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                headerRight: () => (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ backgroundColor: "#008080", padding: 2 }}>
                            <AntDesign name="pluscircle" color="#941313" size={28}
                                // style={{ backgroundColor: "#0041c4", }}
                                onPress={() => { navigation.navigate("NewLeaveRequestScreen"); }}> </AntDesign>
                        </TouchableOpacity>
                    </View>

                )
            }} />

            <HomeStack.Screen name="NewLeaveRequestScreen" component={NewLeaveRequestScreen} options={{
                title: "New Leave",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true
            }} />

            {/* <HomeStack.Screen name="ExtraTimeScreen" component={ExtraTimeScreen} options={{
                title: "Extra Time",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#0041c4"
                    // backgroundColor: "#009387"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} /> */}



            <HomeStack.Screen name="MainSalarySlip" component={MainSalarySlip} options={{
                title: "Salary Slip",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
//                 headerRight : () => (
//                     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//  <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />                 
//                 </View>
//                 )
            }} />

            <HomeStack.Screen name="SalaryFisicalYearScreen" component={SalaryFisicalYearScreen} options={{
                title: "Salary Slip",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />


            <HomeStack.Screen name="SalarySlipScreen" component={SalarySlipScreen} options={{
                title: "Salary Slip",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />

            {/* <HomeStack.Screen name="CompensatoryOffScreen" component={CompensatoryOffScreen} options={{
                title: "Compensatory Off",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#0041c4"
                    // backgroundColor: "#009387"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} /> */}




            <HomeStack.Screen name="MainAttendanceScreen" component={MainAttendanceScreen} options={{
                title: "Attendance",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />

            <HomeStack.Screen name="AttendanceFisicalScreen" component={AttendanceFisicalScreen} options={{
                title: "Attendance",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />


            <HomeStack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{
                title: "Attendance",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} />


            <HomeStack.Screen name="EncashmentScreen" component={EncashmentScreen} options={{
                title: "Encashment",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} />

            <HomeStack.Screen name="LoanApplicationScreen" component={LoanApplicationScreen} options={{
                title: "Loan Application",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} />

            <HomeStack.Screen name="FAQScreen" component={FAQScreen} options={{
                title: "FAQS",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                // headerLeft: () => (
                //     <Ionicons.Button name="arrow-back" size={24} color="#fff" ç></Ionicons.Button>
                // ),
            }} />
            

        </HomeStack.Navigator>
    );
}