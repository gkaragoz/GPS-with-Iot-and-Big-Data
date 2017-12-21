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
    private String email;
    Button goMapsButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        InitializeValues();

    }
    private void InitializeValues(){
        email = getEmail();
        FirebaseHelper helper = new FirebaseHelper("rabbit","123456789","yasemin",email);
        goMapsButton = findViewById(R.id.button_mainGoMaps);

        goMapsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,MapsActivity.class);
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
}
