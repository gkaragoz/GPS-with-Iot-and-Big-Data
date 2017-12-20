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

public class FirebaseModel {
    public double lat;
    public double lng;
    public double timestamp;
    public String email;
    public FirebaseModel(){
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }
    public FirebaseModel(LatLng currentLocation, String email){

        if(currentLocation == null) {
            this.lat = currentLocation.latitude;
            this.lng = currentLocation.longitude;
        }
            timestamp = System.currentTimeMillis()/1000;
        this.email = email; //It wont come as null, it will return as "Anonymous" if nothing is found.
    }

}
