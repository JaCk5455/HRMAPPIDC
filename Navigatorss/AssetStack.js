import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import AssetScanScreen from "../Screens/AssetScan";
import AssetDetailsScreen from "../Screens/AssetDetails";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';


const ScanStack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function AssetScanStackScreen({ navigation }) {
    return (


        <ScanStack.Navigator>
            <ScanStack.Screen name="AssetScanScreen" component={AssetScanScreen} options={{
                title: "Asset Barcode Reader",
                headerShown: true,
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#009387"
                    backgroundColor: "#008080"
                },
                // headerTitleStyle: { flex: 1, textAlign: 'auto' },
                headerLeft: () => (
                    // <Ionicons.Button name="arrow-back" size={24} color="#fff" ></Ionicons.Button>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => { navigation.navigate('HomeStackScreen') }}>
                        <Ionicons name="arrow-back" size={26} color="#fff" />
                    </TouchableOpacity>
                ),

            }} />

            <ScanStack.Screen name="AssetDetailsScreen" component={AssetDetailsScreen} options={{
                title: "Asset Details",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
            }} />


        </ScanStack.Navigator>
    );
}
