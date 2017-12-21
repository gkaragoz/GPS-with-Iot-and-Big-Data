package com.iotbigdata.illegaldisease.androidclient;

import android.app.Application;

import java.util.ArrayList;
import java.util.List;

/**
 * Main model which contains users.
 */

public class GpsModel{
    public List<UserModel> users;
    public GpsModel(){
        users = new ArrayList<>();
    }
    public void AddUser(UserModel newUser){
        /**
         * You can use this to update users, too.
         * Because it checks email and updates index accordingly.
         */
        int newUserIndex = GetUserIndex(newUser.email);
        if(newUser.email.equals("Anonymous")){ //TODO : I couldnt get R.string.initialEmail :(
            if(newUserIndex == -1)
                newUser.email += users.size(); //Absolute first time.
            else
                newUser.email += newUserIndex; //Anonymous will be Anonymous1 for example.
        }

        if(newUserIndex != -1){ //Means it exists
            users.set(newUserIndex,newUser);
        }
        else{
            users.add(newUser);
            FirebaseHelper.currentIndex = newUserIndex;
        }
    }
    private int GetUserIndex(String paramEmail){
        /**
         * If exists, return index. If doesn't, return -1
         */
        for(int currentIndex = 0; currentIndex < users.size(); currentIndex++){
            if(paramEmail.equals(users.get(currentIndex).email)){
                return currentIndex;
            }
        }
        //Probably anonymous, return the index value at firebase.
        return FirebaseHelper.currentIndex; //If this is first, it will be -1, otherwise it will be the index.
    }
    //TODO : Maybe delete users ?
}
