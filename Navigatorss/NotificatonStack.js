import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import NotificationsScreen from "../Screens/Notifications";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';


const NotiStack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function NotificationStackScreen({ navigation }) {
    return (


        <NotiStack.Navigator>
            <NotiStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{
                title: "Notifications",
                headerShown: true,
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#009387"
                    backgroundColor: "#0041c4"
                },
                // headerTitleStyle: { flex: 1, textAlign: 'auto' },
                headerLeft: () => (
                    <FontAwesome.Button name="bars" backgroundColor="#0041c4" onPress={() => { navigation.openDrawer(); }}>
                    </FontAwesome.Button>
                ),


            }} />
        </NotiStack.Navigator>
    );
}
