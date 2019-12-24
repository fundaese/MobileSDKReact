package com.sdkproject.CallApp;

import android.media.AudioManager;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.genband.mobile.NotificationStates;
import com.genband.mobile.OnCompletionListener;
import com.genband.mobile.RegistrationApplicationListener;
import com.genband.mobile.RegistrationService;
import com.genband.mobile.RegistrationStates;
import com.genband.mobile.ServiceProvider;
import com.genband.mobile.api.services.call.CallApplicationListener;
import com.genband.mobile.api.services.call.CallInterface;
import com.genband.mobile.api.services.call.CallServiceInterface;
import com.genband.mobile.api.services.call.IncomingCallInterface;
import com.genband.mobile.api.services.call.OutgoingCallCreateInterface;
import com.genband.mobile.api.services.call.OutgoingCallInterface;
import com.genband.mobile.api.utilities.MobileError;
import com.genband.mobile.api.utilities.exception.MobileException;
import com.genband.mobile.core.webrtc.view.VideoView;
import com.genband.mobile.impl.services.call.CallState;
import com.genband.mobile.impl.services.call.MediaAttributes;

import java.util.Map;

import javax.annotation.Nullable;

public class CallModule extends ReactContextBaseJavaModule implements CallApplicationListener {

    public boolean test;
    CallServiceInterface callService;
    CallInterface call;
    private Promise promise;
    static ReactContext mReactContext;
    private ServiceProvider serviceProvider;
    public boolean incomingCall=false;
    private CallStateListener mcallListener;
    public boolean success;
    VideoView localVideoView;
    VideoView remoteVideoView;

    public CallModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;

        serviceProvider = ServiceProvider.getInstance(getReactApplicationContext());
        callService = serviceProvider.getCallService();
        try {
            callService.setCallApplication(this);
        } catch (MobileException e) {
            e.printStackTrace();
        }
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

    @ReactMethod
    public void callExample(String name) {
        String terminatorAddress = name ;
        Log.i("terminatoradress",terminatorAddress);

        callService.createOutgoingCall(terminatorAddress, this, new OutgoingCallCreateInterface() {
            @Override
            public void callCreated(OutgoingCallInterface callInterface) {
                    call = callInterface;
                    callInterface.establishAudioCall();
                    Log.i("callCreate","call");
            }
            @Override
            public void callCreationFailed(MobileError error) {
                Log.d("Funda","CallFAİL");
            }
        });
    }

    @ReactMethod
    public void videoCallExample(String name) {
        String terminatorAddress = name ;
        Log.i("terminatoradress",terminatorAddress);

        callService.createOutgoingCall(terminatorAddress, this, new OutgoingCallCreateInterface() {
            @Override
            public void callCreated(OutgoingCallInterface callInterface) {
                call = callInterface;
                callInterface.establishCall(true);
                Log.d("Funda","VideoCall");
            }
            @Override
            public void callCreationFailed(MobileError error) {
                Log.d("Funda","CallFAİL");
            }
        });
    }

    @ReactMethod
    @Override
    public void incomingCall(IncomingCallInterface ıncomingCallInterface) {
        this.call = ıncomingCallInterface;
        incomingCall = true;

        WritableMap params = Arguments.createMap();
        params.putString("callerName", call.getCallerName());

        if(ıncomingCallInterface.canReceiveVideo()){
            params.putString("callId",call.getCallId());
            sendVideoEvent(mReactContext, params);
            Log.i("fnd", "videoincomingcall");

        }else{
            sendEvent(mReactContext, params);
            Log.i("fnd", "audioincomingcall");
        }
    }

    @ReactMethod
    public void callStart(){
        IncomingCallInterface ıncomingCallInterface = (IncomingCallInterface) ServiceProvider.getInstance(getReactApplicationContext()).getCallService().getActiveCalls().firstObject();
        this.call = ıncomingCallInterface;

        if(ıncomingCallInterface.canSendVideo()){
            ıncomingCallInterface.acceptCall(true);
            Log.i("funda","video");
        }
        else {
            ıncomingCallInterface.acceptCall(false);
            Log.i("funda","audio");
        }
    }

    private void sendEvent(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("incomingCall", params);
    }

    private void sendVideoEvent(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("videoIncomingCall", params);
    }

    @ReactMethod
    public void mute(){
        if(call.isMute()){
            call.unMute();
            success=true;
        }else{
            call.mute();
            success=true;
        }
    }

    @ReactMethod
    public void hold(){
        if(call.getCallState().getType().equals(CallState.Type.ON_DOUBLE_HOLD)||
                call.getCallState().getType().equals(CallState.Type.ON_HOLD))
        {
            call.unHoldCall();
            success=true;
        }
        else{
            call.holdCall();
            success=true;
        }
    }

    @ReactMethod
    public void speaker(){
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(getReactApplicationContext().AUDIO_SERVICE);
        if(audioManager.isSpeakerphoneOn()){
            audioManager.setSpeakerphoneOn(false);
        }
        else {
            audioManager.setSpeakerphoneOn(true);
        }
    }

    @ReactMethod
    public void transferCall(){
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(getReactApplicationContext().AUDIO_SERVICE);
        audioManager.setSpeakerphoneOn(false);

        call.transferCall("adem3@spidr.com");
    }

    @ReactMethod
    public void stopCall() throws MobileException {
        if(call != null) {
            call.endCall();
        }
    }


    @Override
    public void callStatusChanged(CallInterface callInterface, CallState callState) {

        this.call = callInterface;

        Log.i("callState", callState.getType().toString());

        if (mcallListener != null) {
            mcallListener.callStateChange(callInterface, callState,localVideoView);
            mcallListener.callStateChange(callInterface, callState,remoteVideoView);
        }

        WritableMap params = Arguments.createMap();
        params.putString("callstate",callState.getType().toString());

        sendState(mReactContext, params);

        switch (callState.getType()) {
            case INITIAL:
                Log.i("callState", callState.getType().toString());
                break;
            case SESSION_PROGRESS:
                Log.i("callState", callState.getType().toString());
                break;
            case ENDED:
                Log.i("callState", callState.getType().toString());
                break;
            case RINGING:
                Log.i("callState", callState.getType().toString());
                break;
            case IN_CALL:
                Log.i("callState", callState.getType().toString());
                break;
            case DIALING:
                Log.i("callState", callState.getType().toString());
                break;
            case ANSWERING:
                Log.i("callState", callState.getType().toString());
                break;
            case UNKNOWN:
                Log.i("callState", callState.getType().toString());
                break;
            case ON_HOLD:
                Log.i("callState", callState.getType().toString());
                break;
            case ON_DOUBLE_HOLD:
                Log.i("callState", callState.getType().toString());
                break;
            case REMOTELY_HELD:
                Log.i("callState", callState.getType().toString());
                break;
            default:
                break;
        }
    }

    private void sendState(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("callstate", params);
    }

    private void sendEventState(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("event", params);
    }

    private void sendEventFailState(ReactContext reactContext, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("failEvent", params);
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
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventState(mReactContext, params);
    }

    @Override
    public void muteCallFailed(CallInterface callInterface, MobileError mobileError) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventFailState(mReactContext, params);
    }

    @Override
    public void unMuteCallSucceed(CallInterface callInterface) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventState(mReactContext, params);
    }

    @Override
    public void unMuteCallFailed(CallInterface callInterface, MobileError mobileError) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventFailState(mReactContext, params);
    }

    @Override
    public void holdCallSucceed(CallInterface callInterface) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventState(mReactContext, params);
    }

    @Override
    public void holdCallFailed(CallInterface callInterface, MobileError mobileError) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventFailState(mReactContext, params);
    }

    @Override
    public void transferCallSucceed(CallInterface callInterface) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventState(mReactContext, params);
    }

    @Override
    public void transferCallFailed(CallInterface callInterface, MobileError mobileError) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventFailState(mReactContext, params);
    }

    @Override
    public void unHoldCallSucceed(CallInterface callInterface) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventState(mReactContext, params);
    }

    @Override
    public void unHoldCallFailed(CallInterface callInterface, MobileError mobileError) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("callstate",success);

        sendEventFailState(mReactContext, params);
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
