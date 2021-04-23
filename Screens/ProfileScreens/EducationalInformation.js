import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import { MaterialCommunityIcons, Fontisto, AntDesign, Feather, FontAwesome, Foundation, SimpleLineIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import * as Contants from '../../constants/constants';

import { Helper } from '../../Components/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function EducationalInformationScreen({ route  }) {

    //   const [data, SetData] = useState([]);
    const [educationldata, setEducationalDataData] = useState([]);
    const [loading, IsLoading] = useState(false);


    // const { Edudata } = route.params;




    // useEffect(() => {

    //     Helper.getLoggedInData().then((response) => {
    //         //console.log('aaa', response)
    //         // SetData(response);
    //         SetData(response)

    //         //console.log('abc', response)
    //     }).catch((e) => {
    //         console.log('eee', e);
    //     });

    // }, [])

    // useEffect(() => {
    //     // console.log('aaaaaa', route)
    //     if (route.params.data) {
    //         // console.log(data[0].EmpId);
    //         ProfileEduApiData();
    //         IsLoading(false);
    //     }

    // }, [])




    // const ProfileEduApiData = async () => {
    //     try {

    //         // const response = await fetch(Contants.API_URL + 'Login/EmployeeLogin'
    //         const response = await fetch(Contants.API_URL + 'EmployeeInfo/EmployeeEmpEduInfo?Empid=' + route.params.data, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },

    //             body: JSON.stringify({
    //                 Empid: route.params.data

    //             })
    //         });
    //         const responseObj = await response.json();
    //         //console.log('aaa', responseObj)
    //         if (responseObj.statusCode == 200) {
    //             let payload = JSON.parse(responseObj.payload);
    //             if (payload.length > 0) {
    //                 SetApiData(payload);
    //                 IsLoading(false);

    //             }
    //             else {
    //                 Alert.alert('Error')
    //             }
    //         }

    //     }
    //     catch (e) {
    //         console.log('Error', e);
    //     }
    // }

    useEffect(()=>{
       if( route.params.Edudata.length > 0 )
       { 
//           console.log('data from main screen' , route.params.Edudata);
setEducationalDataData(route.params.Edudata);

}
console.log('edudata' , route.params.Edudata)
    }, [])


    const _RenderItem = ({ item }) => {
        return <ItemView item={item} />
    }

    function ItemView({ item }) {
        return(  
        <View style={styles.profileDetailContainer}>

            <View style={styles.Title}>


                <Text style={{fontSize:wp('4%') , fontWeight:"bold" ,  color:'black'}} >Degree Title :</Text>
            {educationldata.length.Degree > 0 || 
            
            educationldata.Degree == null ?
                <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') ,  color:'#777777'}}>N/A</Text> 
                :
                <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') ,  color:'#777777'}}>{item.Degree}</Text>
                
               
            }
            </View>
           



           
           <View style={styles.Boxes}>

                <View style={styles.Box_Content}>
                    <View style={{flex:1.5 , flexDirection: 'row'}}>
                        <Ionicons name="newspaper-outline" size={wp('5%')} color="#006666" />
                        <Text style={styles.Txt}>Specialization :</Text>
                    </View>

                    <View style={{flex:2 , paddingLeft:wp('1%')}}>
                        <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') }}>
                         {educationldata.Specialization == "" || educationldata.Specialization == null ? item.Specialization : N/A}                 
                        </Text>
                    </View>
                </View>


                <View style={styles.Box_Content}>             
                    <View style={{flex:1.5 , flexDirection: 'row'}}>
                        <AntDesign name="calendar" size={wp('5%')} color="#006666" />
                        <Text style={styles.Txt}>Completion Date :</Text>
                    </View>

                    <View style={{flex:2, paddingLeft:wp('1%')}}>
                        <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') }}>
                         {educationldata.CompletionDate == "" || educationldata.CompletionDate == null ? moment(item.CompletionDate).format("D MMMM, YYYY") : 'N/A'}                 
                        </Text>
                    </View>

                </View>


                <View style={styles.Box_Content}>                 
                   <View style={{flex:1.5 , flexDirection: 'row' }}>
                        <FontAwesome5 name="building" size={wp('5%')} color="#006666" />    
                        <Text style={styles.Txt}>Institute :</Text>
                    </View>

                    <View style={{flex:2 , paddingLeft:wp('1%')}}>
                        <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') }}>
                         {educationldata.Institution !== "" || educationldata.Institution == null ? item.Institution : 'N/A'}                 
                        </Text>
                    </View>

                </View>


                <View style={styles.Box_Content}> 
                    <View style={{flex:1.5 , flexDirection: 'row' }}>
                        <SimpleLineIcons name="calculator" size={wp('5%')} color="#006666" />    
                        <Text style={styles.Txt}>Grade/GPA :</Text>
                    </View>

                    <View style={{flex:2 , paddingLeft:wp('1%')}}>
                        <Text style={{paddingHorizontal:wp('2%') , fontSize:wp('4%') }}>
                         {educationldata.ObtainedGPA !== "" || educationldata.ObtainedGPA == null ?  item.ObtainedGPA : 'N/A'}                 
                        </Text>
                    </View>

                </View>




            </View>
       
        </View>
    )}

  
  
    const _Refresh = () => {
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <ActivityIndicator size="small" color="#008080" />
        </View>
    }

    return (




               <View style={styles.profileDetailContainer}>
                   <StatusBar backgroundColor='#008080' barStyle="light-content" />
                    <FlatList
                        data={educationldata}
                        renderItem={_RenderItem}
                        // keyExtractor={keyExtractorVisit}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={_Refresh}
                    />

                </View>


    );
}
const styles = StyleSheet.create({
    profileDetailContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    Title: {
        //borderWidth: 1, borderColor: '#E8E8E8',
        flexDirection: 'row' ,
        marginHorizontal:wp('2%') ,
        marginTop:wp('3%')

    },
    Boxes: {
         borderWidth:0.5 ,
         borderColor:'#E8E8E8',
        borderRadius:5,
        backgroundColor:'#fff' , 
         marginHorizontal:wp('2%'), 
        marginVertical: wp('2%'),
        // backgroundColor:'#F8F8F8'
        
    },
    Box_Content:{
        flexDirection: 'row' ,
        marginHorizontal:wp('2%') ,
        marginTop:wp('2%') ,
        alignItems:'center',
        // borderBottomWidth:0.5 
    },
    Txt:{
    fontSize:wp('4%') ,
    fontWeight:"bold" ,
    color:'grey' ,
    paddingLeft:wp('2%'),
    paddingBottom:wp('1%')
}
});





//................................ 1st Design for EducationDetail ..........................................// 




        // <ScrollView style={styles.profileDetailContainer}>
        //     <StatusBar backgroundColor='#008080' barStyle="light-content" />

        //     {loading ?
        //         <View style={{flex:1 , justifyContent:'center'}}> 
            
        //         <ActivityIndicator size="small" color="#008080" />
        //         </View>
        //          :
        //         <>


        //             <View>
        //                 <View style={styles.profileItem}>
                            
        //                     <Ionicons name="newspaper-outline" size={wp('7%')} color="#006666" />
        //                     <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
        //                         <Text style={styles.profileSubItem}>Degree Title</Text>




        //                         {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>BS(CS)</Text> */}


        //                          {route.params.Edudata[0].Degree == '' || route.params.Edudata[0].Degree == null || route.params.Edudata[0].Specialization == '' || route.params.Edudata[0].Specialization == null ?
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
        //                             :
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].Degree + '(' + route.params.Edudata[0].Specialization + ')'}</Text>
        //                         }

        //                     </View>
        //                 </View>


        //                 <View style={styles.profileItem}>
        //                     <AntDesign name="calendar" size={wp('7%')} color="#006666" />
        //                     <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
        //                         <Text style={styles.profileSubItem}>Completion Date</Text>


                                
        //                         {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>August 17,2015</Text> */}

        //                          {route.params.Edudata[0].CompletionDate == '' || route.params.Edudata[0].CompletionDate == null ?
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
        //                             :
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{moment(route.params.Edudata[0].CompletionDate).format("MMMM D, YYYY")}</Text>
        //                         }

        //                     </View>
        //                 </View>

        //                 <View style={styles.profileItem}>
        //                     <FontAwesome5 name="building" size={wp('7%')} color="#006666" />
        //                     <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
        //                         <Text style={styles.profileSubItem}>University/College/Institute</Text>
                                
                                
                                
        //                         {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>University of Michigan</Text> */}




        //                          {route.params.Edudata[0].Institution == '' || route.params.Edudata[0].Institution == null ?
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
        //                             :
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].Institution}</Text>
        //                         }

        //                     </View>
        //                 </View>

        //                 <View style={styles.profileItem}>
        //                     <SimpleLineIcons name="calculator" size={wp('7%')} color="#006666" />
        //                     <View style={{ flex: 1, marginBottom: wp('3%'), paddingLeft: wp('4%') }}>
        //                         <Text style={styles.profileSubItem}>Grade/GPA/Percentage</Text>
        //                         {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{apidata.length > 0 ? (apidata[0].ObtainedGPA == null || apidata[0].ObtainedGPA == '' ? 'N/A' : apidata[0].ObtainedGPA) : ''} </Text> */}


        //                         {/* <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>2.5</Text> */}

        //                          {route.params.Edudata[0].ObtainedGPA == '' || route.params.Edudata[0].ObtainedGPA == null ?
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>N/A</Text>
        //                             :
        //                             <Text style={{ fontSize: wp('4%'), paddingTop: wp('1%') }}>{route.params.Edudata[0].ObtainedGPA}</Text>
        //                         }
        //                     </View>
        //                 </View>



        //             </View>

        //         </>
        //     }

        // </ScrollView>

//     );

// }


// const styles = StyleSheet.create({
//     profileDetailContainer: {
//         flex: 1,
//         backgroundColor: '#fff'
//     },
//     profileItem: {
//         borderWidth: 1, borderColor: '#E8E8E8',
//         flexDirection: 'row',
//         paddingHorizontal: wp('3%'),
//         paddingTop: wp('3%'),
//         borderRadius: 8,
//         marginTop: wp('2%'),
//         marginBottom: wp('2%'),
//         marginLeft: wp('2%'),
//         marginRight: wp('2%'),
//         justifyContent: 'center'

//     },
//     profileSubItem: {
//         color: 'gray',
//         fontSize: wp('4%'),

//     }
// });


//................................ 1st Design for EducationDetail ..........................................//