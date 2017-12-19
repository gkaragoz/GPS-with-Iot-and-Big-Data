package com.iotbigdata.illegaldisease.androidclient;

/**
 * Created by illegaldisease on 12/19/17.
 */

public class FirebaseModel {
    public double lat;
    public double lng;
    public double timestamp;
    public FirebaseModel(){
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }
    public FirebaseModel(double latidute, double longitude){
        if(!Double.isNaN(latidute) &&  !Double.isInfinite(longitude)){
            this.lat = latidute;
            this.lng = longitude;
            timestamp = System.currentTimeMillis()/1000;
        }
    }
}
