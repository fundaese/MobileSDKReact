import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  TextInput,
  Text,
  Image,
  TouchableOpacity, NativeEventEmitter
} from 'react-native';
import VideoView from './VideoView';

export default class VideIncomingCall extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
         callername: this.props.navigation.state.params.callername,
         eventType: ""
    };
  }

componentDidMount(){
     const eventEmitter = new NativeEventEmitter(NativeModules.SdkProject); //event listener
     const {navigate} = this.props.navigation;

     eventEmitter.addListener('callstate', (event) => {
        console.log([Object.values(event)[0]]);
        const status = [Object.values(event)[0]];

        this.setState({eventType: status});

        if(status == "ENDED"){
          navigate("CallScreen");
        }
     })
   }

  startCall(){
    NativeModules.CallModule.callStart();    
  }

  stopCall(){
    const {navigate} = this.props.navigation;
    NativeModules.CallModule.stopCall();  
    this.setState({eventType: "ENDED"});
    navigate("CallScreen")
  }

  render(){    
    const showVideoView = this.state.eventType == "IN_CALL";
    return (
      <View style = {styles.container}>
      <Text>{`state: ${showVideoView}`}</Text>
      <Text style={styles.textStyle}>{this.state.eventType}</Text>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <VideoView style={{width:'100%',height:'100%',flex:1,backgroundColor:'black'}} videoType="localVideoView" visible={ true }></VideoView>
            <VideoView style={{width:'100%',height:'100%',flex:1,backgroundColor:'blue'}} videoType="remoteVideoView" visible={ true }></VideoView>
          </View>
        
          <View style={styles.buttons}> 
              {this.state.eventType != "IN_CALL" ?
              <TouchableOpacity style={styles.buttonAccept} onPress={this.startCall.bind(this)}>
              <Text style = {styles.buttonText}>ACCEPT</Text></TouchableOpacity>: null }
              
              <TouchableOpacity style={styles.buttonEnd} onPress={this.stopCall.bind(this)}>
                          {this.state.eventType != "IN_CALL" ? <Text style = {styles.buttonText}>REJECT</Text>
                          :  <Text style = {styles.buttonText}>END</Text> }
              </TouchableOpacity>
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    justifyContent: 'center',
    width: 128,
    height: 56,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    color: '#f7c744',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 70
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#FFF',
    marginBottom: 20
  },
  buttonAccept: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 100,
    width: 70
  },
  buttonEnd: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 100,
    width: 70
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    fontWeight: 'bold',
    fontSize: 18
  },
  textStyle:{
    color: '#f7c744',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    textShadowRadius: 4,
    textShadowOffset: {width: 2, height: 2},
    textAlignVertical : 'top',
  },
});