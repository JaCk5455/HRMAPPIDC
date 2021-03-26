import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Image
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../Components/Context';
import { Helper } from '../Components/Helpers';
import * as Contants from '../constants/constants';

// import { useNavigation } from '@react-navigation/native';






export default function DrawerContent(props, { navigation }) {
    // const navigation = useNavigation();

    const [data, SetData] = useState([]);

    useEffect(() => {

        Helper.getLoggedInData().then((response) => {
            // SetData(response);
            SetData(response[0])
            // console.log('abc', response)
        });

    }, [])

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: ((data.EmployeePic) ? `data:image/png;base64,${data.EmployeePic}` : (data.EmployeeGender == "M" ? Contants.USER_IMAGE.MALE : Contants.USER_IMAGE.FEMALE)) }}


                                // source={{ uri: ((data.EmployeePic) ? `data:image/png;base64,${data.EmployeePic}` : (data.Gender || data.GENDER == "F" ? Contants.USER_IMAGE.FEMALE : Contants.USER_IMAGE.MALE)) }}

                                // source={{ uri: 'data:image/png;base64,{data.EmployeePic}', }}

                                // source={{ uri: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" }}
                                size={50}

                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{data.UserFullName}</Title>
                                <Caption style={styles.caption}>{data.Designation}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="setting" size={size} color={color} />
                            )}
                            label="Settings"

                            onPress={() => { props.navigation.navigate('SetttingStackScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="support" size={size} color={color} />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportStackScreen') }}
                        // onPress={() => { props.navigation.navigate('NotificationStackScreen') }}
                        />
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="user" size={size} color={color}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('ProfileStackScreen') }}
                        /> */}


                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { props.navigation.closeDrawer(); signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});