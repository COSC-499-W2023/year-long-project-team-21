# Table of contents

- [Tests](#tests)
- [Encrypted Storage](#encrypted-session-storage)
- [Network Requests](#network-requests)

## Tests

### Overview:

Currently only UNIT tests are implemented.

### Unit Tests

Unit tests mock api endpoints and other functions to ensure page, component and business logic is working as expected.

#### Usage

Call `npm run test:unit`. This command will call `jest.unit.config.js` which inherits from `jest.config.js`. All this method is doing is telling Jest to look for the `unit.setup.js` file under `jest`
that will setup our mocks. It will also tell the jest runtime to look for tests that are under `__test__/unit` that have `test.tsx` underneath them

#### Mocks

Refactoring necessary.

#### Writing more tests

Simply add tests to the **test** folder. Be wary of the mocks you are inherting from.

## Encrypted Session Storage

### Overview

We are using Encrypted Storage to store session-based variables on the phone securely. The phone stores the following data upon succesful login:

- token
- refresh token
- token creation
- user_id

You can find more about it here

https://www.npmjs.com/package/react-native-encrypted-storage

@TODO combine this with Kei's Location Services Class.

### Usage

It is extremely important that you do not remove session storage. The only thing that you should be doing is retrieving the user_id. If you mess with the session storage in other ways, you will prevent authenticated requests from working.

#### Retrieving Data

@TODO a class here that only retrieves certain variables might be a good idea...

```Javascript
try{
    const userSesh: string = await retrieveUserSession();
    const what_you_need: string = userSesh["what_you_need"];
}
catch{
    // do something with the error
}
```

## Network Requests

See `NetworkRequests.tsx`

### Overview

This file is a bit more complex. There are general config methods that live in this file for sending requests to our django backend without authentication as well as an error handling suite. The request library we are using is axios and we are building on top of it.

There is a class in this file called `SecureAPIReq`. The purpose of this class is to send HTTP requests such as GET, POST, PUT, and DELETE with authenticated headers already done for you for the django backend. It works by checking the `encrypted session storage` and retrieving the `token creation` field and comparing that to when it was accessed. If it is greater than pre-defined thresholds, it will generate a new token by calling the backend. This saves a couple HTTP requests as the traditional way to handle this is sending a request to the backend and if a 401 is returned, retrieve a new token, and then proceed with your current request.

Note, there currently is not any fuctionality for handling a 401. The incoming thresholds are quite a bit less than when they expire on the server side. I figured this is a small edge case but we can implement it later.

**Notice** This class will _throw an error_ to calls that do not generate a 2\*\* response.

### Usage

First, import the correct class that you need. For example, `SecureApiReq`

**Important!** Since we are dealing with promises, everything we do needs to be wrapped with a try and catch block. That includes class creation.

When first create the object, we call a factory method to create the constructor for us:

```JavaScript
try{
    const newReq:SecureAPIReq = await SecureAPIReq.createInstance()
}
catch(e){
    // do something with this error
}
```

The purpose of this factory function is to intialize the `SecureAPIReq` with a user_session object from encrypted storage. This allows quick access to the authentication/refresh tokens.

The constructor also has an optional parameter for the baseURL that you can pass. By default, it will use the baseURL in the environment variable, but I found I needed this for writing tests.

#### GET and DELETE Requests

After initialization, subsequent requests are easy. Here is a sample on how the GET requests works. DELETE requests should work the same way as they follow the same structure. **Remember to wrap with a try and catch block**

```JavaScript
try{
    const res = await newReq.get("users/test");
}catch(e){
    // do something
}
```

Get requests can also recieve parameters as well.

```JavaScript
try{
    const endpoint = "users/test/"
    const params = {category : category}
    const res = await newReq.get(endpoint, params);
}
catch(e){
    // do anything dude
}
```

Notice how we only specify the endpoint. This is because the baseURL is already taken care for us.

#### POST and PUT Requests

Post and PUT requests have an optional parameter for a body. The functionality here is pretty obvious.

```JavaScript
try{
    const endpoint = "ad/"
    const adsInfo = {
        title: banana
        expirey: 123456
        img: banana.jpg
    }
    const res = await newReq.post(endpoint, adsInfo);
}

```

The PUT and POST requests can also accept parameters as well.

POST requests, however, have another optional field

`asFormEncoded?: boolean`

This provides URL-encoding to the body of the post request.

#### Sample Request

In this sample we will retrieve the `user_id` and send an authenticated `GET` request to `/users/user_id` to retrieve account details.

```JavaScript
try{
    // retrieve user_id
    const userSesh: string = await retrieveUserSession();
    const userId: string = userSesh['user_id'];

    // perform request
    const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
    const res: any = await newReq.get(`users/${user_id}`);

    // retrieve data
    const data: any = res.data;

    // do something with the data
}
catch{
    // do something with the error
}

```
