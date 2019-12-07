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


export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      calleeName: this.props.navigation.state.params.name,
    };
  }

  stopCall(){
    const {navigate} = this.props.navigation;
    NativeModules.CallModule.stopCall();  
    navigate("CallScreen")
  }

  // componentDidMount(){
  //   const eventEmitter = new NativeEventEmitter(NativeModules.SdkProject); //event listener

  //   eventEmitter.addListener('callState', (event) => {

  //   })
  // }

  render(){    
  return (
    <View style = {styles.container}>
        <Text style={styles.textStyle}>{this.state.calleeName}</Text>
        <Text style={styles.textStyle}>{this.state.calleeName}</Text>
        <Text style={styles.textStyle}>{this.state.calleeName}</Text>

        <View style={styles.buttons}> 
            <TouchableOpacity style={styles.buttonEnd} onPress={this.stopCall.bind(this)}>
                        <Text style = {styles.buttonText}>END</Text>
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 70
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
  button: {
    width: 100,
    backgroundColor: "yellow",
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