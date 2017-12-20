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
        if(newUser.email.equals("Anonymous")){ //TODO : I couldnt get R.string.initialEmail :(
            newUser.email += users.size(); //Anonymous will be Anonymous1 for example.
        }
        int newUserIndex = GetUserIndex(newUser.email);
        if(newUserIndex != -1){ //Means it exists
            users.set(newUserIndex,newUser);
        }
        else{
            users.add(newUser);
        }
    }
    private int GetUserIndex(String paramEmail){
        int index = -1;
        /**
         * If exists, return index. If doesn't, return -1
         */
        for(int currentIndex = 0; currentIndex < users.size(); currentIndex++){
            if(paramEmail.equals(users.get(currentIndex).email)){
                index = currentIndex;
            }
        }
        return index;
    }
    //TODO : Maybe delete users ?
}
