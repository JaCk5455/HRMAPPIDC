import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '../constants/constants';


export const Helper = {


    getLoggedInData: async function () {
        const payload = await AsyncStorage.getItem('@loggedInPayload')
        // console.log('dd', payload);
        let payloadData = JSON.parse(payload)
        // alert(payloadData.Designation)
        // console.log(payloadData)
        return payloadData;
    },

    // getProfileData: async function () {
    //     const payload = await AsyncStorage.getItem('@Profilepayload')
    //     let ProfilepayloadData = JSON.parse(payload)
    //     // console.log('aaa', ProfilepayloadData)

    //     return ProfilepayloadData;

    // }/


    storeTokenInLocalStorage: async function () {
        const Token = await AsyncStorage.getItem('@Token')
        return Token;
    }



}
