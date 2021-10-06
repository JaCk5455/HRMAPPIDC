import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, StatusBar,FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

export default function LeavesApprovalStatusScreen({ navigation }) {
    const [loading, IsLoading] = React.useState(false);



    const LeaveApprovalsRecord = [
        {
            name: "umer",
            Empid: "1122",
            LeaveType: "Compensatory leave",
            Date:"12-05-2021",
            Time: "10:00 am"
        },
        {
            name: "umer",
            Empid: "1122",
            LeaveType: "Short Leave",
            Date:"12-05-2021",
            Time: "10:00 am"
        },

        {
            name: "umer",
            Empid: "1122",
            LeaveType: "Causal Leaves",
            Date:"12-05-2021",
            Time: "10:00 am"
        },

        {
            name: "umer",
            Empid: "1122",
            LeaveType: "Annual leaves",
            Date:"12-05-2021",
            Time: "10:00 am"
        },

    ]


        // ....... Begin : FlatList_RenderItem_Function .... // 
        const _RenderItem = ({ item }) => {
            return <ItemView item={item} />
        }
    
        const LeaveColor = (item) => {
            let color = '#008080'
    
            if (item == 'Annual leaves') {
                color = '#777777'
            }
            else if (item == 'Causal Leaves') {
                color = '#ff8000';
            }
    
            else if (item == 'Short Leave') {
                color = '#004CFF';
            }
    
            else if (item == 'Sick Leave') {
                color = '#A37546';
            }
    
            else if (item == 'Leave Without Pay') {
                color = '#FF2E00';
            }
    
            else if (item == 'Compensatory leave') {
                color = '#008080';
            }
    
            else {
                color = '#008080';
            }
    
            return color;
        }
    
        function ItemView({ item }) {
            return (
    
                <View style={{ flex: 1, backgroundColor: '#fff', padding: wp('1%') }}>
                   
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#CBCBCB',
                        padding: wp('2.5%'),
                        marginHorizontal: wp("2%"),
                        marginVertical: wp("1.7%"),
                        borderRadius: 10,
    
                    }}>
                       
    
    <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}>
<Text>
    {item.Empid}
</Text>
        </View>
        <View style={{flex:1}}>

</View>
    </View>
    
                   
    
    
    
                       
    
    
    
       
    
    
    
                    </View>
                </View >
            )
        }
    
        // ....... End : FlatList_RenderItem_Function .... //




    const getItemLayout = (data, index) => (
        {
            length: 30, offset: 30 * index, index
        }
    );
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor='#008080' barStyle="light-content" />

            {loading ?
                <ActivityIndicator
                    style={{ height: 60 }}
                    color="#008080"
                    size="small"
                /> :

                <FlatList
                    data={LeaveApprovalsRecord}
                    renderItem={_RenderItem}
                    // keyExtractor={keyExtractorVisit}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
        </View>
    );
}