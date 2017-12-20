package com.iotbigdata.illegaldisease.androidclient;

import java.util.ArrayList;
import java.util.List;

/**
 * Sub class for firebase
 */

public class ActionModel {
    public List<LocationModel> locations;
    public double totalDistance; //In kilometer
    public double totalTime; // In minutes
    public ActionModel(){
        locations = new ArrayList<>();
        CalculateDistance();
        CalculateTime();
    }
    public void AddLocationModel(LocationModel newModel){
        if(newModel != null){
            locations.add(newModel);
        }
        else{
            //That means it couldn't add to list, maybe do something.
        }

    }
    private double CalculateDistance(){
        double distance = 0; //Let google help me.
        if(this.locations.size() > 0){
            //TODO: fill here. Use PolyLine at maps activity.
        }
        return distance;
    }
    private double CalculateTime(){
        double time = 0; //I will substract last timestamp from first time stamp.
        if(this.locations.size() >= 2){
            //Simply subtract last value from first value.
            int lastValue = this.locations.size()-1;
            time = this.locations.get(lastValue).timestamp - this.locations.get(0).timestamp;
            return time / 60;
        }
        return time;
    }
}
