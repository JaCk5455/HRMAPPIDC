import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from "../Components/Context";
import Users from '../Model/user';

export default function Login({ navigation }) {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValiduser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            })


        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            })
        }
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    // const loginHandle = (username, password) => {
    //     signIn(username, password);

    // }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />
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
                    }}>Welcome Back</Text>

                    <Text style={{
                        color: '#afb6c2',
                        fontSize: wp('4%')
                    }}>Hello there, sign in to continue.</Text>
                    <Text style={[styles.text_footer, styles.signInFormMargin]}>Username / PIN</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Username / PIN"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)} />
                        {/* {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20} />
                            </Animatable.View>
                            : null} */}
                    </View>
                    {/* {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username must be 4 characters long .</Text>
                        </Animatable.View>
                    } */}
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
                            onChangeText={(val) => handlePasswordChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                        {/* {data.isValidPassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                            </Animatable.View>
                        } */}


                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={[styles.signIn, {
                                // borderColor: '#009387',
                                borderColor: '#0041c4',
                                borderWidth: 1,
                                marginTop: wp('1%')

                            }]}
                            onPress={() => { loginHandle(data.username, data.password) }} >
                            <LinearGradient
                                colors={["#0041c4", "#0041c4"]}
                                // colors={["#009387", "#009387"]}
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
        // backgroundColor: '#009387',
        backgroundColor: '#0041c4',
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
        color: '#05375a',
        fontSize: 18,

    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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
