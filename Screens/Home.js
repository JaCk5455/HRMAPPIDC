import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');


export default function HomeScreen() {
    const navigation = useNavigation();
    const gridItems = [
        { name: 'Leaves', icon: require('../assets/EmpLeaves.png'), navigateTo: 'MainLeaveScreen', style: { borderColor: 'blue' } },
        { name: 'Salary Slip', icon: require('../assets/empsalary.png'), navigateTo: 'MainSalarySlip' },
        { name: 'Attendance', icon: require('../assets/Attendancee.png'), navigateTo: 'MainAttendanceScreen' },
        // { name: 'Encashment', icon: require('../assets/Encashment.jpg'), navigateTo: 'EncashmentScreen' },
        { name: 'Loan Application', icon: require('../assets/loanapplication.jpg'), navigateTo: 'LoanApplicationScreen' },
        // { name: 'F.A.Q.', icon: require('../assets/qa.png'), navigateTo: 'FAQScreen' },

    ];



    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />


            <View style={styles.headerContainer}>




                {/* <Text style={styles.headerText}>West Bloomfire Arcade.</Text> */}
                <Text style={styles.headerText}>Islamabad Diagnostic Center Pvt. Ltd.</Text>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: wp('1%') }}> Welcome!</Text>
            </View>


            <View style={styles.behind}>
                <FlatList
                    data={gridItems}
                    contentContainerStyle={{ paddingBottom: 200 }}
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

    }
});