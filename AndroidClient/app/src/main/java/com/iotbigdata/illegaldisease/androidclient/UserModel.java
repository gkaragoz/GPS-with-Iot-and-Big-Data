package com.iotbigdata.illegaldisease.androidclient;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by illegaldisease on 12/20/17.
 */

public class UserModel {
    public List<ActionModel> actions;
    public String age;
    public String email;
    public String gender;
    public String name;
    public UserModel(){
        if(this.actions == null)
            actions = new ArrayList<>(); //This is just for precaution.
    }
    public UserModel(String age, String email, String gender, String name){
        if(this.actions == null)
            actions = new ArrayList<>();
        this.age = age;
        this.email = email;
        this.gender = gender;
        this.name = name;
    }
    public void AddAction(ActionModel newAction){
        if(newAction != null){
            actions.add(newAction);
        }
        else{
            //Don't know what to do, continue.
        }
    }
}
