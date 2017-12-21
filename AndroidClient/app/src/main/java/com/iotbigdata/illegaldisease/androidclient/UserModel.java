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

    }
    public UserModel(String age, String email, String gender, String name){
        this.activities = new ArrayList<>();
        this.age = age;
        this.email = email;
        this.gender = gender;
        this.name = name;
    }
    public void AddActivityModel(ActivityModel newActivity){
        if(activities == null)
            activities = new ArrayList<>();
        activities.add(newActivity);
    }
}
