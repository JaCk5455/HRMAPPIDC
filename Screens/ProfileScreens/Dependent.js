import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Button, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';


export default function DependentScreen({navigation,route }) {
    // Users = [
    //     {
    //         id: 1,
    //         name: 'Waleed Ali Akhtar',
    //         relationship: 'Brother',
    //         gender: 'Male',
    //         cnic: '61101-11111111-1',
    //         contact: '03125188851'
    //     },
    //     {
    //         id: 2,
    //         name: 'Jack',
    //         relationship: 'Father',
    //         gender: 'Male',
    //         cnic: '61101-2222111-1',
    //         contact: '03125188851'
    //     },
    //     {
    //         id: 3,
    //         name: 'jill',
    //         relationship: 'Mother',
    //         gender: 'Female',
    //         cnic: '61101-2222111-2',
    //         contact: '03125188851'
    //     },

    //     {
    //         id: 3,
    //         name: 'Muhammad shiza ',
    //         relationship: 'sister',
    //         gender: 'Female',
    //         cnic: '61101-2222111-2',
    //         contact: '03125188851'
    //     },


    //     {
    //         id: 3,
    //         name: 'Rabeah khalid ',
    //         relationship: 'sister',
    //         gender: 'Female',
    //         cnic: '61101-2222111-2',
    //         contact: '03125188851'
    //     },
    //     {
    //         id: 3,
    //         name: 'Ms Jilljilll abcdef ',
    //         relationship: 'sister',
    //         gender: 'Female',
    //         cnic: '61101-2222111-2',
    //         contact: '03125188851'
    //     },
    //     {
    //         id: 3,
    //         name: 'Ms Jilljilll abcdef ',
    //         relationship: 'sister',
    //         gender: 'Female',
    //         cnic: '61101-2222111-2',
    //         contact: '03125188851'
    //     },
    // ];



    const [loading, IsLoading] = useState(false);
    const [dependentdata, SetDependentData] = useState([]);



    useEffect(() => {
        if (route.params.DependData.length > 0) {
            let X = route.params.DependData;
            SetDependentData(X)
        }
        else {
            Alert.alert('Info', 'No Record Found', 
            [{text: "ok", onPress:()=>{navigation.navigate('MainProfileScreen')}}]);
        }
    }, [])






    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }




    function ItemView({ item }) {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff', padding: wp('1%') }}>
                {/*//.......... Box..........// */}
                <View style={{
                    borderWidth: 1,
                    borderColor: '#CBCBCB',
                    padding: wp('2.5%'),
                    marginHorizontal: wp("2%"),
                    marginVertical: wp("1.7%"),
                    borderRadius: 1,

                }}>

                    <View style={{ flexDirection: 'row' }}>
                        {/* LeftSide Name or Relation */}
                        <View style={{ flex: 1.5, borderRightWidth: 3, borderRightColor: "#008080" }}>
                            {/* Changes for ios */}
                            {/* {item.MiddleName == '' || item.MiddleName == null ?
                                <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: 'black', marginTop: '3%' }}>
                                    {item.Notation + item.DependentName.trim() + " " + item.LastName.trim()}
                                </Text>

                                :
                                <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: 'black', marginTop: '3%' }}>
                                    {item.Notation + item.DependentName.trim() + ' ' + item.MiddleName.trim() + ' ' + item.LastName.trim()}
                                </Text>
                            } */}
                            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: 'black', marginTop: '3%' }}>
                                John Doe
                                </Text>


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: wp('3.5%'), fontWeight: 'bold', color: '#008080', marginTop: '1.5%', }}>Relation: </Text>

                                <Text style={{ fontSize: wp('3.5%'), fontWeight: 'bold', color: '#008080', marginTop: '1.5%', }}>{item.Relationship}</Text>

                            </View>
                            {/* <Text style={{ fontSize: wp('3.5%'), fontWeight: 'bold', color: '#008080', marginTop: '1.5%', }}>{item.Relationship}</Text> */}
                            {/* <Text style={{ fontSize: wp('3.5%'), fontWeight: 'bold', color: '#008080', marginTop: '1.5%', }}>{moment(item.DateOfBirth).format('MMMM D, YYYY ')}</Text> */}

                        </View>

                        {/* RightSide CNIC , Gender , Contact */}
                        <View style={{ flex: 2, flexDirection: 'column', paddingLeft: wp('2%') }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: wp('3.5%'), color: 'black', flex: 0.7 }}>CNIC:</Text>
                                {/* cahanges for ios */}
                                <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>{item.CNIC}</Text>

                                <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>11111-1111171-1</Text>

                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: wp('3.5%'), color: 'black', flex: 0.7 }}>Gender:</Text>

                                <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>{item.Gender}</Text>

                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: wp('3.5%'), color: 'black', flex: 0.7 }}>D.O.B:</Text>

                                <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>{moment(item.DateOfBirth).format('MMMM D, YYYY ')}</Text>

                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: wp('3.5%'), color: 'black', flex: 0.7 }}>MRNo:</Text>
                                {/* changes for ios */}
                                {/* <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>{item.MRNo}</Text> */}
                                <Text style={{ paddingLeft: wp('0.5%'), fontSize: wp('3.5%'), color: 'grey', flex: 2 }}>111-111-1</Text>

                            </View>





                            {/* <Text style={{ fontSize: wp('3.5%'), color: 'grey' }}>{item.Gender}</Text> */}
                            {/* <Text style={{ fontSize: wp('3.5%'), color: 'grey' }}>{item.MRNo}</Text> */}

                        </View>




                    </View>

                </View>
            </View >
        )
    }


    const getItemLayout = (data, index) => (
        {
            length: 30, offset: 30 * index, index
        }
    );

    const _Refresh = () => {
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <ActivityIndicator size="small" color="#008080" />
        </View>
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading ?
                <ActivityIndicator
                    style={{ height: 60 }}
                    color="#008080"
                    size="small"
                /> :

                <FlatList
                    data={dependentdata}
                    renderItem={_RenderItem}
                    // keyExtractor={keyExtractorVisit}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={_Refresh}
                />
            }
        </View>

    );

}