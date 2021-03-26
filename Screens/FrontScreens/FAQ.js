import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

export default function FAQScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), fontWeight: 'bold' }}>
                Coming Soon!
            </Text>
        </View>
    );
}