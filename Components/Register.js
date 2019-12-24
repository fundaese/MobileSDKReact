import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  TextInput,
  Text,
  Image,
  TouchableOpacity,ScrollView, ToastAndroid
} from 'react-native';

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
      userName: "",
      password: "",
      disabled: false,
      visible: false,
    }
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };


  register(){
    const {navigate} = this.props.navigation;
    const { userName, password } = this.state;
    this.setState({disabled:true});

    NativeModules.RegisterModule.registerToServer(userName, password)
      .then(function(test) {
        navigate("CallScreen",{userName}),
        this.setState({disabled:false});
      })
      .catch(() => 
      { 
        this.setState(
          {visible: true,disabled:false },
          () => {this.hideToast();},
        )
      });    
  }


  render(){    
  return (
    <ScrollView style = {styles.container}>
       <Toast visible={this.state.visible} message="Success!" />

      <View style = {styles.logoContainer}>
        <Image style = {styles.logo}
            source={require('../Components/images/hatch.png')}>
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

      <TouchableOpacity disabled={this.state.disabled} style={styles.buttonContainer} onPress={this.register.bind(this)}>
            <Text style = {styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(32,53,70)',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  logo: {
    //alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
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
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#FFF',
    marginBottom: 20,
    borderRadius: 50
  },
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 15,
    borderRadius: 50,
    width: 250,
    marginLeft: 50,
    marginTop: 40
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    fontWeight: 'bold',
    fontSize: 18
  }
});