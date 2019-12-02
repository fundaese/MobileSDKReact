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

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userName: "Please enter your username",
      password: "",
    }

    this.navigator = this.props.navigator;
  }

  render(){
  return (
    <View style = {styles.container}>
      <Text>FUNDA</Text>
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