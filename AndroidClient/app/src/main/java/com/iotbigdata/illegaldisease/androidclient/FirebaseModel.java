package com.iotbigdata.illegaldisease.androidclient;

/**
 * Created by illegaldisease on 12/19/17.
 */

public class FirebaseModel {
    private double lat;
    private double lng;
    private double timestamp;
    public FirebaseModel(){
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }
    public FirebaseModel(double latidute, double longitude){
        if(Double.isNaN(latidute) && Double.isInfinite(longitude)){
            lat = latidute;
            lng = longitude;
            timestamp = System.currentTimeMillis()/1000;
        }
    }
}
