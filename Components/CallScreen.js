import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  NativeModules,
  TouchableOpacity,
  NativeEventEmitter,
  Image,
  Button,FlatList,TouchableHighlight,TouchableWithoutFeedback, Modal
} from 'react-native';

import flatListData from './data/flatListData';

class FlatListItem extends Component{

  videoCall(userEmail){
    const {navigate} = this.props.navigation;
    console.log("Videocall");
    NativeModules.CallModule.videoCallExample(userEmail);
    navigate("VideoOutgoingCall")
  }

  
  startCall(userEmail,name){
    const {navigate} = this.props.navigation;
    console.log(userEmail);
    NativeModules.CallModule.callExample(userEmail);
    navigate("OutGoingCall",{name})
  }

    render(){
      const { name, mail } = this.props.item;
        return(
          <View style={{flexDirection:"row",backgroundColor: this.props.index % 2 == 0 ? 'rgb(32,53,70)': '#7f8c8d'}}>
            <View style={{
                flex:1,flexDirection:"column",
                backgroundColor: this.props.index % 2 == 0 ? 'rgb(32,53,70)': '#7f8c8d'
            }}>
                <Text style={styles.flatListItem}>{name}</Text>
                <Text style={styles.flatListItem}>{mail}</Text>
            </View>

           <View style={{marginRight:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}> 
              
              <TouchableOpacity style={{marginRight:10}}  onPress={() => this.startCall(mail,name)}>
                   <Image
                   source={require('./images/telefon.png')}
                   resizeMode="contain"
                   style={{ width: 40, height: 40, tintColor: 'green' }}
                  />
              </TouchableOpacity>         
                    
              <TouchableOpacity  onPress={this.videoCall.bind(this, mail)}>
                   <Image
                   source={require('./images/videocall2.png')}
                   resizeMode="contain"
                   style={{ width: 30, height: 30, tintColor: '#3498db' }}
              />
              </TouchableOpacity>
            </View>  
            </View>
        )
    }
  }

export default class CallScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.state.params.userName,
    };
  }
 componentDidMount(){
  const {navigate} = this.props.navigation;
  const eventEmitter = new NativeEventEmitter(NativeModules.SdkProject); //event listener

  eventEmitter.addListener('incomingCall', (event) => {
    let callername = event.callerName
    navigate("InComingCall",{callername});
  })

  eventEmitter.addListener('videoIncomingCall', (event) => {
    let callername = event.callerName
    navigate("VideoIncomingCall",{callername});
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

  render(){
        return(
            <View style={{flex:1,marginTop:22}}>
                <Text style={styles.text}>User: {this.state.email}</Text>
                <Text style={styles.textStyle}>Call List</Text>
                <FlatList
                    data={flatListData}
                     renderItem={({item,index}) => {
                         return (
                            <FlatListItem item={item} index={index} navigation={this.props.navigation}>
                            </FlatListItem>
                         )
                    }}>
                </FlatList>
               
                <TouchableOpacity style={styles.buttonContainer} onPress={this.unreg.bind(this)}>
                    <Text style = {styles.buttonText}>LOGOUT</Text>
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
    videoButton: {
      flexDirection: 'row'
    },
    textStyle:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 30,
        textAlign: 'left',
        fontFamily: 'Arial',
        textShadowRadius: 4,
        textShadowOffset: {width: 2, height: 2},
        textAlignVertical : 'top',
        marginBottom: 10,
      },
      text:{
        color: 'black',
        fontSize: 20,
        lineHeight: 20,
        textAlign: 'left',
        fontFamily: 'Arial',
        textShadowRadius: 4,
        textShadowOffset: {width: 2, height: 2},
        textAlignVertical : 'top',
        marginBottom: 10,
      },
      buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        alignItems: 'center'
      },
      buttonContainer: {
        backgroundColor: '#e74c3c',
        height: 50,
        width: 150,
        marginTop: 20,
        justifyContent: 'space-between',
        borderRadius: 30,
        alignItems:'center',
        textAlign: 'center',
        marginLeft: 100,
        marginBottom: 10
      },
      
});
