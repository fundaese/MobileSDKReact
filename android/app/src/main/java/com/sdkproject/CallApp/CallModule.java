package com.sdkproject.CallApp;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.genband.mobile.NotificationStates;
import com.genband.mobile.OnCompletionListener;
import com.genband.mobile.RegistrationApplicationListener;
import com.genband.mobile.RegistrationService;
import com.genband.mobile.RegistrationStates;
import com.genband.mobile.ServiceProvider;
import com.genband.mobile.api.utilities.Configuration;
import com.genband.mobile.api.utilities.Constants;
import com.genband.mobile.api.utilities.ICEServers;
import com.genband.mobile.api.utilities.MobileError;

public class CallModule extends ReactContextBaseJavaModule {

    String userName;
    String userPassword;
    boolean test;

    public CallModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "CallApp";
    }

    @ReactMethod
    private void registerToServer(String username,String password) {
        userName = username;
        userPassword = password;
        config();
        RegistrationApplicationListener registrationListener = new RegistrationApplicationListener() {
            @Override
            public void registrationStateChanged(RegistrationStates state) {
                // Handle registration state changes
            }


            @Override
            public void notificationStateChanged(NotificationStates state) {
                // Handle notification state changes
            }

            @Override
            public void onInternalError(MobileError mobileError) {

            }
        };

        ServiceProvider serviceProvider = ServiceProvider.getInstance(getReactApplicationContext());
        final RegistrationService registrationService = serviceProvider.getRegistrationService();
        registrationService.setRegistrationApplicationListener(registrationListener);

        Constants.SubscribeServices[] subscribeServices = {Constants.SubscribeServices.Call, Constants.SubscribeServices.Presence,Constants.SubscribeServices.IM};
        registrationService.registerToServer(subscribeServices, 3600, new OnCompletionListener() {
            @Override
            public void onSuccess() {
                Log.d("fundaaa", "registerOkey");
                test = true;
            }
            @Override
            public void onFail(MobileError mobileError) {
                test = false;
                System.out.println(test);
            }
        });
    }

    @ReactMethod
    public void login(Callback callback){
        callback.invoke(test);
    }


    public void config() {
        Configuration configuration = Configuration.getInstance();
        configuration.setUsername(userName.trim());
        configuration.setPassword(userPassword.trim());
        configuration.setRestServerIp("sr1.genband.com"); //47.168.161.85
        configuration.setRestServerPort(443); //8580
        configuration.setRequestHttpProtocol(false); //true
        configuration.setICECollectionTimeout(1);
        ICEServers iceServers = new ICEServers();
        iceServers.addICEServer("turns:turn-nds-1.genband.com:443?transport=tcp");
        configuration.setICEServers(iceServers);
        //configuration.setLogger(new LogUtilityExample());
        configuration.setLogLevel(Constants.LogLevel.TRACE);
        configuration.setWebSocketServerIp("sr1.genband.com"); //47.168.161.85
        configuration.setWebSocketServerPort(443); //8581
        configuration.setSecuredWSProtocol(true); //false
        configuration.setAuditEnabled(true);
        configuration.setAuditFrequence(30);
    }
}