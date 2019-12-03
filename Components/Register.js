import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  TextInput,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    }
  }

  register(){
    const {navigate} = this.props.navigation;
    NativeModules.RegisterModule.registerToServer(this.state.userName,this.state.password)
      .then(function(test) {
        alert("Register Success!"),
        navigate("CallScreen")
      }).catch(() => 
      { 
        alert("Register Fail!") 
      });    
  }

  render(){    
  return (
    <View style = {styles.container}>
      <View style = {styles.logoContainer}>
        <Image style = {styles.logo}
            source={require('../Components/images/callapplogo.png')}>
        </Image>
      </View>
      <TextInput style={styles.input} placeholder="Username" keyboardType= "email-address" 
        placeholderTextColor='rgba(255,255,255,0.8)' returnKeyType='next'
        onSubmitEditing={() => this.refs.txtPassword.focus()}
        onChangeText={(text) => this.setState({userName: text})}
      />
      <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor='rgba(255,255,255,0.8)'
          keyboardType="default" secureTextEntry= {true} ref={"txtPassword"}
          onChangeText={(text) => this.setState({password: text})}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={this.register.bind(this)}>
            <Text style = {styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
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
    //alignItems: 'center',
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
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    fontWeight: 'bold',
    fontSize: 18
  }
});