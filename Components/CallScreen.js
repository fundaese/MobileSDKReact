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
  Button,FlatList,TouchableHighlight,TouchableWithoutFeedback
} from 'react-native';

import flatListData from './data/flatListData';

class FlatListItem extends Component{
    render(){
        return(
            <View style={{
                flex:1,
                backgroundColor: this.props.index % 2 == 0 ? '#f1c40f': '#f39c12'
            }}>
                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                <Text style={styles.flatListItem}>{this.props.item.mail}</Text>
            </View>
        )
    }
}

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      callerName: ""
    }
  }
  
 componentDidMount(){
  const {navigate} = this.props.navigation;
  const { callerName } = this.state;
  const eventEmitter = new NativeEventEmitter(NativeModules.SdkProject); //event listener
  eventEmitter.addListener('incomingCall', (event) => {
    navigate("InComingCall",{callerName});
    console.log(event.callerName);
  })
}

  unreg(){
    const {navigate} = this.props.navigation;
    NativeModules.CallModule.unregister()
    .then(function(test) {
      navigate("Register")
    }).catch(() => 
    { 
      alert("Register Fail!") 
    });    
  }

  startCall(userEmail,name){
    const {navigate} = this.props.navigation;
    console.log(userEmail);
    NativeModules.CallModule.callExample(userEmail);
    navigate("OutGoingCall",{name})
  }

  render(){
        return(
            <View style={{flex:1,marginTop:22}}>
                <Text style={styles.textStyle}>CALL LIST</Text>
                <FlatList
                    data={flatListData}
                     renderItem={({item,index}) => {
                         return (
                          <TouchableOpacity onPress={() => this.startCall(item.mail,item.name) }>
                            <FlatListItem item={item} index={index} />
                          </TouchableOpacity>
                         )
                    }}>
                 </FlatList>
    
                <TouchableOpacity style={styles.buttonContainer} onPress={this.unreg.bind(this)}>
                    <Text style = {styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 


const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 5,
        fontSize: 16
    },
    textStyle:{
        color: '#FF6F00',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
        textDecorationLine: 'underline',
        textShadowColor: '#D50000',
        fontFamily: 'sans-serif',
        textShadowRadius: 4,
        textShadowOffset: {width: 2, height: 2},
        textTransform: 'uppercase',
        textAlignVertical : 'top',
        marginBottom: 10,
        marginTop: 10,
      },
      buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
      },
});
