package com.iotbigdata.illegaldisease.androidclient;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.Intent;
import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;

import com.google.android.gms.maps.model.LatLng;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {
    private String currentEmail;
    private UserModel currentUserModel; //Sets a new user, or overwrites existing user.
    private DatabaseReference mDatabase;
    JSONArray jArray; //Value from child, we know it is array.

    Button goMapsButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        InitializeValues();
        final int indexOfUser = getIndexOfUser();
        //WriteToDatabase();
    }
    private void InitializeValues(){
        currentEmail = getEmail();
        mDatabase = FirebaseDatabase.getInstance().getReference();
        InitializeUserModel();
        goMapsButton = (Button) findViewById(R.id.button_mainGoMaps);

        goMapsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,MapsActivity.class);
                //intent.putExtra("TheUserModel",currentUserModel);
                MainActivity.this.startActivity(intent);
            }
        });
    }
    private String getEmail(){
        String currentEmail = getString(R.string.InitialEmail);
        Pattern gmailPattern = Patterns.EMAIL_ADDRESS;
        Account[] accounts = AccountManager.get(this).getAccounts();
        for (Account account : accounts) {
            if (gmailPattern.matcher(account.name).matches()) {
                currentEmail = account.name;
            }
        }
        return currentEmail;
    }
    private int getIndexOfUser(){
        //If it doesn't find an index, returns last+1 index so it can create one.
        int theIndex = -1; //Initial value, -1 means absolute no-go, check it when you use the function.
        DatabaseReference childRef = mDatabase.child("gps/users");
        childRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                try {
                    jArray = new JSONArray(dataSnapshot.getValue().toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
        return theIndex;
    }
    private void InitializeUserModel(){
        currentUserModel = new UserModel("23",this.currentEmail,"male","blablabla");
        ActivityModel currentActivityModel = new ActivityModel();
        LocationModel currentLoocationModel = new LocationModel(new LatLng(-40.742632,30.12372));
        LocationModel currentLoocationModel2 = new LocationModel(new LatLng(-40.742876,30.13372));
        currentActivityModel.AddLocationModel(currentLoocationModel);
        currentActivityModel.AddLocationModel(currentLoocationModel2);
        currentUserModel.AddActionModel(currentActivityModel);

    }
    public void WriteToDatabase(){
        try{
           mDatabase.child("gps/users").setValue(currentUserModel); //TODO:Add some of this to strings.xml

        }
        catch(Exception e){
            Log.d("Weirdness","Some weird things happened, don't know it dudeee..");
        }
    }
}
