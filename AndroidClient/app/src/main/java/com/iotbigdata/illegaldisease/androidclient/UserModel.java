package com.iotbigdata.illegaldisease.androidclient;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by illegaldisease on 12/20/17.
 */

public class UserModel {
    public List<ActivityModel> activities;
    public String age;
    public String email;
    public String gender;
    public String name;
    public UserModel(){
        if(this.activities == null)
            this.activities = new ArrayList<>(); //This is just for precaution.
    }
    public UserModel(String age, String email, String gender, String name){
        if(this.activities == null)
            this.activities = new ArrayList<>();
        this.age = age;
        this.email = email;
        this.gender = gender;
        this.name = name;
    }
    public void AddActionModel(ActivityModel newAction){
        if(newAction != null){
            this.activities.add(newAction);
        }
        else{
            //Don't know what to do, continue.
        }
    }
}
