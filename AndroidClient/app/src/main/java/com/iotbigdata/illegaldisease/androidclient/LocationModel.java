package com.iotbigdata.illegaldisease.androidclient;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.Context;
import android.util.Patterns;

import com.google.android.gms.maps.model.LatLng;

import java.util.regex.Pattern;

/**
 * This is class structure for firebase. Will act as JSON.
 */

public class LocationModel {
    public double lat;
    public double lng;
    public double timestamp;
    public LocationModel(){
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }
    public LocationModel(LatLng currentLocation){

        if(currentLocation != null) {
            this.lat = currentLocation.latitude;
            this.lng = currentLocation.longitude;
        }
        this.timestamp = System.currentTimeMillis()/1000;
    }

}
