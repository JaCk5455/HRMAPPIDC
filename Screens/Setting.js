import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import HomeStackScreen from '../Navigatorss/HomeStack'
import { StatusBar } from 'expo-status-bar';

const { height, width } = Dimensions.get('window');

export default function SettingtScreen({ navigation }) {
    return (

        <View style={{ flex: 14, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: wp('5%'), fontWeight: 'bold' }}>
                Coming Soon!
                </Text>
        </View>


    );
}