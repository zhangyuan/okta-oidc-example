# Quickstart

## Register Okta Developer Account

Visit https://developer.okta.com/ to create account.

## Create Apps in Okta

### Create Consumer App in Okta

Choose `OpenID Connect` as Sign On Method

### Create Gateway in Okta

Choose `OpenID Connect` as Sign On Method

## Create Authorization Server

### Add Authorization Server

### Create Access Policy

### Add Rule

## Start Consumer App

```
OKTA_AUTH_SERVER_ISSUER_URL=[OKTA_AUTH_SERVER_ISSUER_URL] CLIENT_ID=[CLIENT_ID] CLIENT_SECRET=[CLIENT_SECRET] node consumer-app.js
```

Visit `http://localhost:4000/authorize` , copy the access_token.