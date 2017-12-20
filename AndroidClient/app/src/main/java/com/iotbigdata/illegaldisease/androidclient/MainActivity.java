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

import java.nio.file.attribute.GroupPrincipal;
import java.util.ArrayList;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {
    private String currentEmail; //Will be written as Anonymous0, Anonymous1 etc for conflicts. See getUserIndex() for more.
    private GpsModel currentGpsModel; //Sets a new user, or overwrites existing user.
    private DatabaseReference mDatabase;
    private int userIndex; //Array index of our user. Some problems at anonymous users.

    Button goMapsButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        InitializeValues();

    }
    private void InitializeValues(){
        currentEmail = getEmail();
        mDatabase = FirebaseDatabase.getInstance().getReference();
        ReadFromDatabase();

        goMapsButton = findViewById(R.id.button_mainGoMaps);

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
        String currentEmail = getString(R.string.InitialEmail); //Anonymous
        Pattern gmailPattern = Patterns.EMAIL_ADDRESS;
        Account[] accounts = AccountManager.get(this).getAccounts();
        for (Account account : accounts) {
            if (gmailPattern.matcher(account.name).matches()) {
                currentEmail = account.name;
            }
        }
        return currentEmail;
    }
    private void ReadFromDatabase(){ //And assign it to currentGpsModel
        DatabaseReference childRef = mDatabase.child("gps");
        childRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                    currentGpsModel = dataSnapshot.getValue(GpsModel.class);
                    AddDummyLocation();
                    WriteToDatabase();
                    int currentLength = currentGpsModel.users.size();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }
    private void AddDummyLocation(){
        UserModel currentUserModel = new UserModel("23",this.currentEmail,"koala","24352334");
        ActivityModel currentActivityModel = new ActivityModel();
        LocationModel currentLocationModel = new LocationModel(new LatLng(-10.742632,0.12372));
        LocationModel currentLocationModel2 = new LocationModel(new LatLng(-30.742876,100.13372));
        currentActivityModel.AddLocationModel(currentLocationModel);
        currentActivityModel.AddLocationModel(currentLocationModel2);
        currentUserModel.AddActionModel(currentActivityModel);
        currentGpsModel.AddUser(currentUserModel);

    }
    public void WriteToDatabase(){
        try{
           mDatabase.child("gps").setValue(currentGpsModel); //TODO:Add some of this to strings.xml

        }
        catch(Exception e){
            Log.d("Weirdness","Some weird things happened, don't know it dudeee..");
        }
    }
}
