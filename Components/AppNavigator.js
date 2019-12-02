import { createStackNavigator } from 'react-navigation-stack';

import Register from './Register';
import CallScreen from './CallScreen';

const AppNavigator = createStackNavigator({
  Register: { screen: Register },
  CallScreen: {screen: CallScreen},
},
{
    initialRouteName: "Register"
}

);

export default AppNavigator;