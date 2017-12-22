package com.iotbigdata.illegaldisease.androidclient;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Application;
import android.util.Log;
import android.util.Patterns;

import com.google.android.gms.maps.model.LatLng;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.List;
import java.util.regex.Pattern;

/**
 * Helper for firebase and myself. Almost completely static class.
 */

public class FirebaseHelper extends Application{
    public static boolean isActive; //Holds the value if client is running or starting.
    public static String emailAddress;
    public static String gender;
    public static String age;
    public static String name;
    public static GpsModel currentGpsModel; //Sets completely new data, or overwrites it. USE IT WITH CAUTION.
    public static int currentIndex;
    private static DatabaseReference mDatabaseChild;

    public FirebaseHelper(){

    }
    public FirebaseHelper(String gender,String age, String name,String email){
        //Call this if you want to produce a dummy data
        FirebaseHelper.gender = gender;
        FirebaseHelper.name = name;
        FirebaseHelper.age = age;
        FirebaseHelper.emailAddress = email;
        FirebaseHelper.currentIndex = -1;
        InitializeValues();
    }
    public void InitializeValues(){
        mDatabaseChild = FirebaseDatabase.getInstance().getReference().child("gps");
    }

    public void InitializeModels(List<LatLng> newLocations){
        boolean didCreateNewActivity = false;
        if(currentGpsModel == null){
            currentGpsModel = new GpsModel();
        }
        UserModel currentUserModel;
        if(currentGpsModel.users.size() == 0){
            currentUserModel = new UserModel(age,emailAddress,gender,name);
        }
        else{
            FirebaseHelper.currentIndex = currentGpsModel.GetUserIndex(emailAddress);
            if(FirebaseHelper.currentIndex > 0){
                currentUserModel = currentGpsModel.users.get(FirebaseHelper.currentIndex);
            }
            else{
                currentUserModel = new UserModel(age,emailAddress,gender,name);
            }

        }
        ActivityModel currentActivityModel;
        if(isActive){
            if(currentUserModel.activities == null){
                currentActivityModel = new ActivityModel(); //It will be first data.
                didCreateNewActivity = true;
            }
            else{
                if(currentUserModel.activities.size() != 0){
                    currentActivityModel = currentUserModel.activities.get(currentUserModel.activities.size()-1); //Get last index of activities.
                }
                else{
                    currentActivityModel = new ActivityModel(); //No activities.
                    didCreateNewActivity = true;
                }
            }
        }
        else{
            currentActivityModel = new ActivityModel();
            didCreateNewActivity = true;
        }
        LatLng lastLocation = null;
        for(LatLng location : newLocations){
            currentActivityModel.AddLocationModel(new LocationModel(location));
            lastLocation = location;
        }
        if(!isActive && lastLocation != null && currentActivityModel.locations.size() == 1){
            currentActivityModel.AddLocationModel(new LocationModel(lastLocation));
        }
        if(didCreateNewActivity){
            currentUserModel.AddActivityModel(currentActivityModel);
        }
        else{
            currentUserModel.activities.set(currentUserModel.activities.size() - 1,currentActivityModel); //If we went with the same activity, don't overwrite it.
        }
        currentGpsModel.AddUser(currentUserModel);//Care about null pointer.
    }
    public void WriteToDatabase(){
        try{
            mDatabaseChild.setValue(currentGpsModel);

        }
        catch(Exception e){
            Log.d("Weirdness","Some weird things happened, don't know it dudeee..");
        }
    }

    public void ReadFromDatabase(final List<LatLng> newLocations){ //And assign it to currentGpsModel
        mDatabaseChild.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                currentGpsModel = dataSnapshot.getValue(GpsModel.class);
                InitializeModels(newLocations);
                WriteToDatabase();
                int currentLength = currentGpsModel.users.size();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }
}
