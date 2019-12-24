import { PropTypes } from 'prop-types';
import { requireNativeComponent, ViewPropTypes  } from 'react-native';

var viewProps = {
    name: 'VideoView',
    PropTypes: {
        videoType: PropTypes.string,
        visible: PropTypes.boolean,
        ...ViewPropTypes // include the default view properties
    }
}
module.exports = requireNativeComponent('VideoView', viewProps, {
    nativeOnly: {
      fullscreen: true,
    },
});