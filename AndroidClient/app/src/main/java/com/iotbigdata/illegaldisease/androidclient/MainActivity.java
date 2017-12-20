package com.iotbigdata.illegaldisease.androidclient;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Patterns;

import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {
    private String currentEmail;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        currentEmail = getEmail();
    }
    private String getEmail(){
        String currentEmail = "Anonymous"; //TODO: Add this to strings.xml
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
