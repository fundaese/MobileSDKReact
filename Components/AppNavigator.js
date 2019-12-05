import { createStackNavigator } from 'react-navigation-stack';

import Register from './Register';
import CallScreen from './CallScreen';

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
},
{
    initialRouteName: "Register"
}

);

export default AppNavigator;