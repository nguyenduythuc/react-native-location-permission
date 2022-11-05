package com.thucnguyenduy.LocationModule;

import static androidx.core.app.ActivityCompat.shouldShowRequestPermissionRationale;

import android.util.Log;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LocationModule extends ReactContextBaseJavaModule {
    LocationModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "LocationModule";
    }

    @ReactMethod
    public void shouldShowRequestPermissionRationale(Promise promise) {
         if (ActivityCompat.shouldShowRequestPermissionRationale(this.getCurrentActivity(), "ACCESS_BACKGROUND_LOCATION")) {
             promise.resolve(true);
         } else {
             promise.resolve(false);
        }
    }
}