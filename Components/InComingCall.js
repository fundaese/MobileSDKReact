import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  TextInput,
  Text,
  Image,
  TouchableOpacity, NativeEventEmitter,ToastAndroid
} from 'react-native';
import { thisExpression } from '@babel/types';

const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
         callername: this.props.navigation.state.params.callername,
         eventType: "",
         visible: false,
         disabled: false,
         opacity: 0.1
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

     eventEmitter.addListener('event', (event) => {
      this.setState(
        {visible: true,disabled:false },
        () => {this.hideToast();},
      );
    })
  
     eventEmitter.addListener('failEvent', (event) => {
      
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

  muteCall(){
    NativeModules.CallModule.mute();  
    this.setState({disabled:true})
  }

  holdCall(){
    const {navigate} = this.props.navigation;
    NativeModules.CallModule.hold();  
    this.setState({disabled:true})
  }

  speakerOn(){
    NativeModules.CallModule.speaker();  
  }

  transferCall(){
    NativeModules.CallModule.transferCall();  
    this.setState({disabled:true})
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  render(){    
  return (
    <View style = {styles.container}>
       <Toast visible={this.state.visible} message="Success!" />
        <Text style={styles.textStyle}>{this.state.callername}</Text>
        <Text style={styles.textStyle}>{this.state.eventType}</Text>

        {this.state.eventType == "IN_CALL" || this.state.eventType == "ON_HOLD" || this.state.eventType == "REMOTELY_HELD"?
        <View style= {styles.button}>

            <TouchableOpacity disabled={this.state.disabled}  style={styles.threeButton} onPress={this.muteCall.bind(this)}>
                      <Text style={styles.buttonText}>Mute Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.threeButton} onPress={this.speakerOn.bind(this)}>
                      <Text style={styles.buttonText}>Speaker</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={this.state.disabled} style={styles.threeButton} onPress={this.holdCall.bind(this)}>
                      <Text style={styles.buttonText}>HoldCall</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={this.state.disabled} style={styles.threeButton} onPress={this.transferCall.bind(this)}>
                      <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
        </View> : null}

        <View style={styles.buttons}> 
            {this.state.eventType == "IN_CALL" || this.state.eventType == "ON_HOLD" || this.state.eventType == "REMOTELY_HELD"
            ? null
            : <TouchableOpacity style={styles.buttonAccept} onPress={this.startCall.bind(this)}>
            <Text style = {styles.buttonText}>ACCEPT</Text></TouchableOpacity> }
            
            <TouchableOpacity style={styles.buttonEnd} onPress={this.stopCall.bind(this)}>
                        {this.state.eventType == "IN_CALL" || this.state.eventType == "ON_HOLD" || this.state.eventType == "REMOTELY_HELD"
                        ? <Text style = {styles.buttonText}>END</Text>
                        :  <Text style = {styles.buttonText}>REJECT</Text> }
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
    backgroundColor: 'rgb(32,53,70)',
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
  threeButton:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 15,
    borderRadius: 100,
    width: 70,
    height:70,
    backgroundColor: '#c8d6e5',
    marginRight: 10,
    alignItems: 'center'
  },
  button: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 15,
    marginTop: 20
  },
});