package com.sdkproject.CallApp;

import android.view.View;
import android.widget.LinearLayout;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.genband.mobile.ServiceProvider;
import com.genband.mobile.api.services.call.CallInterface;
import com.genband.mobile.api.services.call.CallServiceInterface;
import com.genband.mobile.core.webrtc.view.VideoView;

public class VideoViewManager extends SimpleViewManager<VideoView> {

    public static final String REACT_CLASS = "VideoView";
    CallInterface call;
    CallServiceInterface callService;
    ThemedReactContext mreactContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected VideoView createViewInstance(ThemedReactContext reactContext) {
        VideoView videoView = new VideoView(reactContext, null);
        mreactContext = reactContext;
        return videoView;
    }

    @ReactProp(name = "visible")
    public void setVisible(VideoView videoView, Boolean visible) {
        if (visible)
            videoView.setVisibility(View.VISIBLE);
        else
            videoView.setVisibility(View.GONE);
    }

    @ReactProp(name = "videoType")
    public void setVideoType(VideoView videoView, String videoType) {

        call = (CallInterface) ServiceProvider.getInstance(mreactContext).getCallService().getActiveCalls().firstObject();

        call.getMediaAttributes().getRemoteVideo();
        call.getMediaAttributes().getLocalVideo();

        videoView.getRenderer();

        if (call != null) {
            if (videoType.equals("localVideoView")) {
                call.setVideoEnabled(true);
                call.setLocalVideoView(videoView);
            }else{
                call.setVideoEnabled(true);
                call.setRemoteVideoView(videoView);
            }
        }
    }

}
