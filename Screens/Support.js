import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SupportScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Coming Soon!

            </Text>
        </View>
    );
}