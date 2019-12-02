import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  NativeModules,
  TouchableOpacity,
  NativeEventEmitter,
  TextInput
} from 'react-native';

const inputModule = NativeModules.CallApp.processData;

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userName: "Please enter your username",
      password: "",
      testAndroid: ""
    }
  }

  register(){
    NativeModules.CallApp.registerToServer(this.state.userName,this.state.password);
  }

  async getBoolean() {
    try {
      let result = await NativeModules.CallApp.login();
      alert("RESULT:",result);
    } catch (error) {
      alert("Register Fail!",error);
    }
  }

  render(){
  return (
    <View style = {styles.container}>
      <TextInput style={styles.textInput} placeholder="UserName" keyboardType= "email-address" 
        onChangeText={(text) => this.setState({userName: text})}
      />
      <TextInput style={styles.textInput} placeholder="Enter your password" 
          keyboardType="default" secureTextEntry= {true}
          onChangeText={(text) => this.setState({password: text})}
      />

      <Button color="#841584"
                       title="LOGIN"
                       onPress={this.register.bind(this)}
                       buttonStyle={styles.button}>

      </Button>
     {/* <Text>{this.state.userName}</Text>  */}
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});