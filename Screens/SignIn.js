import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from "../Components/Context";
import * as Contants from '../constants/constants';
import { ActivityIndicator } from 'react-native-paper';
import { Item } from 'native-base';


export default function SignIn({ navigation }) {
    const { signIn } = React.useContext(AuthContext); // Sign In Function exists in App.js


    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    // const [loading, Isloading] = React.useState(true)


    const [data, setData] = React.useState({
        secureTextEntry: true,
    });


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
    }

    const validateFields = () => {
        // console.log('api called')
        resetValidation();
        if (email.trim() == '' || email == null
            || password.trim() == '' || password == null
        ) {

            if (email.trim() == '' || email == null) {
                // console.log("abc")

                setEmailError(true);
                setEmailErrorMessage("UserName is required.");
            }
            if (password.trim() == '' || password == null) {
                setPasswordError(true);
                setPasswordErrorMessage("Password is required.");
            }

        }
        else {
            const abortController = new AbortController();
            const signal = abortController.signal;
            signInCall(signal);


            return function cleanup() {
                abortController.abort();
            }
        }

    }

    const signInCall = async (signal) => {
        // console.log('api called')
        try {
            // const response = await fetch(Contants.API_URL + 'Login/EmployeeLogin'
            const response = await fetch('https://idcnow.co/orbitempservice/api/V1/Login/EmployeeLogin?username=' + email + '&password=' + password, {
                signal: signal,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({


                    username: email, // username string
                    password: password, // string

                })
            });
            // console.log(JSON.stringify({


            //     username: email, // username string
            //     password: password, // string

            // }))


            const data = await response.json();
            //  console.log(data);

            if (data.statusCode == 200) {
                let payload = JSON.parse(data.payload);
                //  console.log('login data', payload)
                // if (payload.length > 0) {
                //     signIn(payload);
                //     // Isloading(false);
                // }


                if (payload.length > 0) {
                    let pic;
                    let newPayload = payload.map((item, index) => {
                        return { ...item, EmployeePic: null }
                    })
                    console.log('newpayload', newPayload);
                    signIn(newPayload);
                    // Isloading(false);
                }
                else {
                    Alert.alert('Error', 'Username or Password is incorrect')
                }
            }
        }
        catch (e) {
            console.log('Error', e);
        }
    }


    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#008080' barStyle="light-content" />
            {/* {loading ? <ActivityIndicator size='small' color="#008080" /> :
                <> */}
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
                            autoCorrect={false}
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



                        {/* <TouchableOpacity onPress={() => navigation.navigate('Signup')}
                        style={[styles.signIn, { marginTop: 10 }]}>
                        <Text style={styles.textSign}> Sign Up</Text>
                    </TouchableOpacity> */}
                    </View>

                </ScrollView>
            </Animatable.View>


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
});
