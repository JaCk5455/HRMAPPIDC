import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
// import ProfileScreen from "../Screens/Profile";
import MainProfileScreen from '../Screens/ProfileScreens/MainProfile';
import PersonalInformationScreen from '../Screens/ProfileScreens/PersonalInformation'
import EducationalInformationScreen from '../Screens/ProfileScreens/EducationalInformation'
import ContactInformationScreen from '../Screens/ProfileScreens/ContactInformation';
import DependentScreen from '../Screens/ProfileScreens/Dependent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const NotiStack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function ProfileStackScreen({ navigation }) {
    return (


        <NotiStack.Navigator
            initialRouteName={MainProfileScreen}>
            <NotiStack.Screen name="MainProfileScreen" component={MainProfileScreen} options={{
                title: "Profile",
                headerShown: true,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#008080",

                },
                // headerTitleStyle: { flex: 1, textAlign: 'auto' },
                headerLeft: () => (
                    <FontAwesome.Button name="bars" backgroundColor="#008080" onPress={() => { navigation.openDrawer(); }}>
                    </FontAwesome.Button>
                ),
            }} />
            <NotiStack.Screen name="PersonalInformationScreen" component={PersonalInformationScreen} options={{
                title: "Personal Information",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />
            <NotiStack.Screen name="EducationalInformationScreen" component={EducationalInformationScreen} options={{
                title: "Educational Information",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />
            <NotiStack.Screen name="ContactInformationScreen" component={ContactInformationScreen} options={{
                title: "Contact Information",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />

<NotiStack.Screen name="DependentScreen" component={DependentScreen} options={{
                title: "Dependents Information",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />
        </NotiStack.Navigator>
    );
}
