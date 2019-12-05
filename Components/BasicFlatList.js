import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  NativeModules,
  TouchableOpacity,
  NativeEventEmitter,
  TextInput,
  Dimensions,
  Image,
  Button,FlatList
} from 'react-native';

import flatListData from './data/flatListData';

class FlatListItem extends Component{
    render(){
        return(
            <View style={{
                flex:1,
                backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
            }}>
                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                <Text style={styles.flatListItem}>{this.props.item.mail}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16
    }
});

export default class BasicFlatList extends Component{
    render(){
        return(
            <View style={{flex=1,marginTop=22}}>
                <FlatList
                    data={flatListData}
                    renderItem={({item,index}) => {
                        return (
                        <FlatListItem item={item} index={index}>
                    
                        </FlatListItem>);
                    }}>

                </FlatList>
            </View>
        )
    }
} 