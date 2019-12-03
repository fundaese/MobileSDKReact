package com.sdkproject.CallApp;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.genband.mobile.NotificationStates;
import com.genband.mobile.OnCompletionListener;
import com.genband.mobile.RegistrationApplicationListener;
import com.genband.mobile.RegistrationService;
import com.genband.mobile.RegistrationStates;
import com.genband.mobile.ServiceProvider;
import com.genband.mobile.api.services.call.CallApplicationListener;
import com.genband.mobile.api.services.call.CallInterface;
import com.genband.mobile.api.services.call.IncomingCallInterface;
import com.genband.mobile.api.services.call.OutgoingCallInterface;
import com.genband.mobile.api.utilities.MobileError;
import com.genband.mobile.impl.services.call.CallState;
import com.genband.mobile.impl.services.call.MediaAttributes;

import java.util.Map;

public class CallModule extends ReactContextBaseJavaModule implements CallApplicationListener {

    public boolean test;

    public CallModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "CallModule";
    }

    @ReactMethod
    public void unregister(Promise promise){
        RegistrationApplicationListener registrationListener = new RegistrationApplicationListener() {

            @Override
            public void registrationStateChanged(RegistrationStates registrationStates) {

            }

            @Override
            public void notificationStateChanged(NotificationStates notificationStates) {

            }

            @Override
            public void onInternalError(MobileError mobileError) {

            }
        };
        final RegistrationService registrationService = ServiceProvider.getInstance(getReactApplicationContext()).getRegistrationService();
        registrationService.unregisterFromServer(new OnCompletionListener() {

            @Override
            public void onSuccess() {
                test = true;
                WritableMap map = Arguments.createMap();
                map.putBoolean("test",test);
                promise.resolve(map);
            }

            @Override
            public void onFail(MobileError mobileError) {
                test = false;
                promise.reject("Error", String.valueOf(mobileError));
            }
        });
    }

    @Override
    public void incomingCall(IncomingCallInterface ıncomingCallInterface) {

    }

    @Override
    public void callStatusChanged(CallInterface callInterface, CallState callState) {

    }

    @Override
    public void mediaAttributesChanged(CallInterface callInterface, MediaAttributes mediaAttributes) {

    }

    @Override
    public void callAdditionalInfoChanged(CallInterface callInterface, Map<String, String> map) {

    }

    @Override
    public void errorReceived(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void errorReceived(MobileError mobileError) {

    }

    @Override
    public void establishCallSucceeded(OutgoingCallInterface outgoingCallInterface) {

    }

    @Override
    public void establishCallFailed(OutgoingCallInterface outgoingCallInterface, MobileError mobileError) {

    }

    @Override
    public void acceptCallSucceed(IncomingCallInterface ıncomingCallInterface) {

    }

    @Override
    public void acceptCallFailed(IncomingCallInterface ıncomingCallInterface, MobileError mobileError) {

    }

    @Override
    public void rejectCallSuccedded(IncomingCallInterface ıncomingCallInterface) {

    }

    @Override
    public void rejectCallFailed(IncomingCallInterface ıncomingCallInterface, MobileError mobileError) {

    }

    @Override
    public void ignoreSucceed(IncomingCallInterface ıncomingCallInterface) {

    }

    @Override
    public void ignoreFailed(IncomingCallInterface ıncomingCallInterface, MobileError mobileError) {

    }

    @Override
    public void videoStopSucceed(CallInterface callInterface) {

    }

    @Override
    public void videoStopFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void videoStartSucceed(CallInterface callInterface) {

    }

    @Override
    public void videoStartFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void muteCallSucceed(CallInterface callInterface) {

    }

    @Override
    public void muteCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void unMuteCallSucceed(CallInterface callInterface) {

    }

    @Override
    public void unMuteCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void holdCallSucceed(CallInterface callInterface) {

    }

    @Override
    public void holdCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void transferCallSucceed(CallInterface callInterface) {

    }

    @Override
    public void transferCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void unHoldCallSucceed(CallInterface callInterface) {

    }

    @Override
    public void unHoldCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void sendCustomParametersSuccess(CallInterface callInterface) {

    }

    @Override
    public void sendCustomParametersFail(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void joinSucceeded(CallInterface callInterface) {

    }

    @Override
    public void joinFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void endCallSucceeded(CallInterface callInterface) {

    }

    @Override
    public void endCallFailed(CallInterface callInterface, MobileError mobileError) {

    }

    @Override
    public void ringingFeedbackSucceeded(IncomingCallInterface ıncomingCallInterface) {

    }

    @Override
    public void ringingFeedbackFailed(IncomingCallInterface ıncomingCallInterface, MobileError mobileError) {

    }

    @Override
    public void notifyCallProgressChange(CallInterface callInterface) {

    }
}
