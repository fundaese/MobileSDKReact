import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  NativeModules,
  TextInput
} from 'react-native';

const inputModule = NativeModules.CallApp.processData;

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    }

    const { navigate } = this.props.navigation;
  }

  register(){
    NativeModules.CallApp.registerToServer(this.state.userName,this.state.password)
    .then(function(test) {
        alert("Success!");
      }).catch(error => 
        { alert("Register Fail!") 
      });    
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