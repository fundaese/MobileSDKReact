import { createStackNavigator } from 'react-navigation-stack';

import Register from './Register';
import CallScreen from './CallScreen';
import OutGoingCall from './OutGoingCall';
import InComingCall from './InComingCall';

const AppNavigator = createStackNavigator({
  Register: { 
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  CallScreen: {
    screen: CallScreen,
    navigationOptions: {
      header: null,
    },
  },
  OutGoingCall: {
    screen: OutGoingCall,
    navigationOptions: {
      header: null,
    },
  },
  InComingCall: {
    screen: InComingCall,
    navigationOptions: {
      header: null,
    },
  },
},
{
    initialRouteName: "Register"
}

);

export default AppNavigator;