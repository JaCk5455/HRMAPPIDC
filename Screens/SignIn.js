import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, StatusBar, ScrollView, Alert, ActivityIndicator, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from "../Components/Context";
import ProgressBar from '../Components/ProgressBar';
import { Helper } from '../Components/Helpers';
import * as Contants from '../constants/constants';


import { BackHandler } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';



export default function SignIn({ navigation }) {
    const { signIn } = React.useContext(AuthContext); // Sign In Function exists in App.js


    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const [showProgressBar, setShowProgressBar] = React.useState(false);

    const [otpcode, setOtpCode] = React.useState('');
    const [showotpmodel, setShowOtpModel] = React.useState(false);

    const [resendotp , setResendOtp] = React.useState(false);

    const [userdata, setUserData] = React.useState([]);
    // const [loading, Isloading] = React.useState(false);

    const [token, setToken] = React.useState('');
    const [tokenError, setTokenError] = React.useState(false);
    const [tokenErrorMessage, setTokenErrorMessage] = React.useState('');

    const [data, setData] = React.useState({
        secureTextEntry: true,
    });


// .........Begin: Token get from helper class .........//
    React.useEffect(() => {

        Helper.storeTokenInLocalStorage().then((Token) => {
            setToken(Token)
            console.log('Get_token_SignIn_from_Helper_Class', Token)
           
        }).catch((e) => {
            console.log('no token get from helperclass for signin Api param', e);
        });


    }, [])
// .........End ............................//


    //..........Begin: Resend OTP Button Timer ....../
    React.useEffect(()=>{
    setTimeout(function(){
 
      setResendOtp(true);
 
    }, 30000);
    }, [])
//..........End: Resend OTP Button Timer ....../


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }


    const resetValidation = () => {
        setEmailError(false);
        setEmailErrorMessage("");

        setPasswordError(false);
        setPasswordErrorMessage("");

        setTokenError(false);
        setTokenErrorMessage("");
    }

    const validateFields = () => {
        // console.log('api called')
        resetValidation();

        if (email.trim() == '' || email == null || password.trim() == '' || password == null || token == '' || token == null) {

            if (email.trim() == '' || email == null) {
                // console.log("abc")

                setEmailError(true);
                setEmailErrorMessage("UserName is required.");
            }
            if (password.trim() == '' || password == null) {
                setPasswordError(true);
                setPasswordErrorMessage("Password is required.");
            }
            if(token =='' || token == null){
                setTokenError(true);
                setTokenErrorMessage("please close your App and try again.")
            }

        }
        else {
            const abortController = new AbortController();
            const signal = abortController.signal;
            setShowProgressBar(true);
            signInCall(signal);

            return function cleanup() {
                abortController.abort();
            }
        }

    }


//..............Begin: SignIN ApI ....................//
    const signInCall = async (signal) => {
        // console.log('api called')
        try {

            // const response = await fetch('http://reports.idc.net.pk/orbitempservicestg/api/V1/Login/EmployeeLogin?username=' + email + '&password=' + password + '&SourceLogin=' + 2 + '&MobileDeviceToken=' + 52005452, {
                const response = await fetch(Contants.API_URL + 'Login/V1/EmployeeLogin', {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    username: email, // username string
                    password: password, // string
                    SourceLogin: Platform.OS == 'ios' ? 1 : 2,
                    MobileDeviceToken: token

                    // MobileDeviceToken: 52005452,


                })
            });

            const data = await response.json();
            console.log('signinapi', data);

            if (data.statusCode == 200) {
                let payload = JSON.parse(data.payload);
                setUserData(payload);
                if (payload[0].isregister == 1) {
                    signIn(payload);
                }
                else if (payload[0].isregister == 0) {
                    setShowOtpModel(true);
                }
                else if (payload[0].isregister == 2) {
                    Alert.alert('Error', 'This Employee is already Registered against other Device. If you want to SignIn on this device, kindly Contact HR.')
                }
                else if (payload[0].isregister == 3) {
                    Alert.alert('Error', 'This device is already Registered against other employee. If you want to register on this device, kindly Contact HR.')
                }
            }

            else {
                Alert.alert('Error', 'Username or Password is incorrect')
            }
            setShowProgressBar(false);

        }
        catch (e) {
            console.log('Error', e);
            Alert.alert('Error', 'Connection Error, please try again!')
            setShowProgressBar(false);

        }
    }
//..............END: SignIN ApI ....................//




    const otpConfirm = () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setShowProgressBar(true);
        signInCallWithOtp(signal);

        return function cleanup() {
            abortController.abort();
        }
    }

//..............Begin: OTP ApI ....................//
    const signInCallWithOtp = async (signal) => {
        console.log('otpapi called')

        try {
            // const response = await fetch('http://reports.idc.net.pk/orbitempservicestg/api/V1/Login/VerifyOTP?OTP=' + otpcode + '&EmpId=' + userdata[0].EmpId + '&MobileDeviceToken=' + 52005452 + '&IsloggedIn=' + 1 + '&AppType=' + 2, {
            const response = await fetch(Contants.API_URL +'Login/V1/VerifyOTP', {

                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    // EmpId: 277,
                    // EmpId:1194,
                    //  OTP=850998,
                    // MobileDeviceToken: 52005452,


                    OTP: otpcode,
                    MobileDeviceToken: token,
                    IsloggedIn: 1,
                    AppType: Platform.OS == 'ios' ? 1 : 2,
                    EmpId: userdata[0].EmpId,


                })

            });
            const data = await response.json();
            console.log('otpApiData', data);
            if (data.statusCode == 200) {
                // const payLoad = JSON.parse(data.payload);
                if (data.payload == "Device Registered Successfully" && data.message == "OK - Successful" ){
                    signIn(userdata);                   
                    setShowProgressBar(true);
                }             
            }
            else {
                Alert.alert('Error', 'Incorrect OTP')
            }
            setShowProgressBar(false);
        }
        catch (e) {
            console.log('Error otp catch', e);
            Alert.alert('Error', 'Connection error,please try again!')
            setShowProgressBar(false);

        }
    }
    //..............END: OTP ApI ....................//

    

//...................Begin: BackButon Function In OtP model ..................//
    const _Back = () => {
        return (
            setShowOtpModel(false)
        )
    }
//................End: BackButon Function In OtP model ..................//



    // const signInCall = async (signal) => {
    //     // console.log('api called')
    //     try {
    //         // const response = await fetch(Contants.API_URL + 'Login/EmployeeLogin'
    //         // const response = await fetch('https://idcnow.co/orbitempservice/api/V1/Login/EmployeeLogin?username=' + email + '&password=' + password, {

    //         const response = await fetch(Contants.API_URL + 'Login/EmployeeLogin?username=' + email + '&password=' + password, {

    //             signal: signal,
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },

    //             body: JSON.stringify({


    //                 username: email, // username string
    //                 password: password, // string

    //             })
    //         });
    //         // console.log(JSON.stringify({


    //         //     username: email, // username string
    //         //     password: password, // string

    //         // }))
    //         //abc

    //         const data = await response.json();
    //         //  console.log(data);

    //         if (data.statusCode == 200) {
    //             let payload = JSON.parse(data.payload);
    //             //  console.log('login data', payload)
    //             // if (payload.length > 0) {
    //             //     signIn(payload);
    //             //     // Isloading(false);
    //             // }


    //             if (payload.length > 0) {
    //                 let pic;
    //                 let newPayload = payload.map((item, index) => {
    //                     return { ...item, EmployeePic: null }
    //                 })
    //                 //    console.log('newpayload', newPayload);
    //                 signIn(newPayload);

    //             }

    //             else {
    //                 Alert.alert('Error', 'Username or Password is incorrect')
    //             }

    //         }
    //         setShowProgressBar(false);

    //     }
    //     catch (e) {
    //         console.log('Error', e);
    //         Alert.alert('Error', 'Connection error,please try again!')
    //         setShowProgressBar(false);

    //     }
    // }


 




    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#008080' barStyle="light-content" />
            <ProgressBar visible={showProgressBar} text="Please wait" />

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


                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>OTP</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter OTP"
                                style={styles.textInput}
                                onChangeText={(value) => setOtpCode(value)}
                            />
                        </View>
                        {resendotp?
                        <View>
                            <TouchableOpacity
                            style={{alignItems:'flex-end', padding:wp('1%')}}
                            onPress={validateFields}>
                             <Text style={{color:'blue'}}>
                                 Resend OTP
                             </Text>
                            </TouchableOpacity>
                        </View>: null
                        }
                        <View style={{ marginVertical: 20, alignItems: 'center' }}>
                            <Button
                                title=" Submit "
                                onPress={otpConfirm}
                            />

                        </View>
                        <Text style={{ textAlign: 'center' }}>Otp has been sent to your phone Number and Email Registered by HR.</Text>

                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <Text style={styles.text_header}>Sign In</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={300}
                style={styles.footer}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: wp('5%')
                    }}>Welcome back </Text>

                    <Text style={{
                        color: '#afb6c2',
                        fontSize: wp('4%')
                    }}>Hello there, sign in to continue.</Text>
                    <Text style={[styles.text_footer, styles.signInFormMargin]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Username Provided by IDC"
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(val) => setEmail(val)} />

                    </View>
                    {emailError && (
                        <Text style={{ fontSize: 11, color: 'red', marginTop: 5 }}>{emailErrorMessage}</Text>
                    )}

                    <Text style={[styles.text_footer, { marginTop: 30 }]}>Password</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(val) => setPassword(val)}

                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20} /> :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20} />}

                        </TouchableOpacity>
                    </View>
                    {passwordError && (
                        <Text style={{ fontSize: 11, color: 'red', marginTop: 5 }}>{passwordErrorMessage}</Text>
                    )}

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={[styles.signIn, {
                                // borderColor: '#0041c4',
                                borderColor: '#008080',
                                borderWidth: 1,
                                marginTop: wp('1%')

                            }]}
                            onPress={() => {
                                validateFields()
                            }} >
                            < LinearGradient
                                colors={["#008080", "#008080"]}
                                // colors={["#0041c4", "#0041c4"]}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {tokenError && (
                        <Text style={{ fontSize: 11, color: 'red', marginTop: 5 }}>{tokenErrorMessage}</Text>
                    )}


                        {/* <TouchableOpacity onPress={() => navigation.navigate('Signup')}
                        style={[styles.signIn, { marginTop: 10 }]}>
                        <Text style={styles.textSign}> Sign Up</Text>
                    </TouchableOpacity> */}
                    </View>

                </ScrollView>
            </Animatable.View>
            {/* </>} */}

        </View >

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008080',
        // backgroundColor: '#0041c4',
        // backgroundColor: '#560CCE',

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: wp('4%'),
        paddingBottom: wp('6%')
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 40,
        paddingVertical: 30,

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: wp('7%')
        // fontSize: 30,
    },
    text_footer: {
        // color: '#008080',
        color: '#05375a',
        fontSize: 18,

    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 0.3,
        // borderBottomColor: '#f2f2f2',
        borderBottomColor: "#66b2b2",
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -6,
        paddingLeft: 10,
        color: '#05375a'

    },
    signInFormMargin: {
        marginTop: wp('8%')
    },
    button: {
        alignItems: 'center',
        marginTop: wp('10%')
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,


    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
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

});
