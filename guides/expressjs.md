# Introduction

This page is a written blog of our youtube video [here](https://www.youtube.com/watch?v=lvuBUh09wsI)! You can view the whole source code of the whole guide in the github [here](https://github.com/decimaldevteam/tutorials/tree/express.js-ep-1)! You will see how to setup express.js and some examples to make an api with it in this page!

## Setting up

First setup your npm and install express.js!

> Make sure you have installed npm and nodejs for that!

```sh
npm init -y && npm i express
```

And after that you need to create index.js file<br/>
Now your file structure should be like this...

```
|- index.js
|- package.json
|- package-lock.json
|- node_modules/
```

## Setting up your app

Now in your index.js, first import express.js and make the app!

```js
const express = require('express');
const app = express();
```

Then use the `app.listen` method to start the app!

```js
app.listen(3000, () => {
    console.log('Listening on port 3000!'); // Simple callback
})
```

The `3000` is your port which can be changed on your wish! And the second parameter is a callback which runs after the app is ready!

## Hello World

Now let's make a very simple hello world app! 

```js
// Simple test api
app.get('/', (req, res) => {
    res.send('Hello World!');
});
```

This code should be before `app.listen` method! This code will send you `Hello World` as a response when you visit the port 3000 in your localhost (`http://localhost:3000`)! The first parameter in `app.get` is the path where we need to run the callback supplied in the second parameter! The `res.send` method sends a string to the user...

## Json Response

For a basic rest api, you need to send json response so that the frontend can parse and use it! So this is the code which will send a json response!

```js
// Sending simple json response with setting status
app.get('/json', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
```

And again the first parameter in `app.get` is the path so if you visit `http://localhost:3000/json` you will see response as `{"message":"OK"}`! Now lemme explain, `res.status(200)` means it sends a response status code to the user, The `json({ message: 'OK' })` method stringifies the parameter supplied and sends as response. You can also do this like this...

```js
// Sending simple json response with setting status
app.get('/json', (req, res) => {
    res.status(200);
    res.json({ message: 'OK' });
});
```

You can also replace `res.json` with this too...

```js
// Sending simple json response with setting status
app.get('/json', (req, res) => {
    res.status(200);
    res.send(JSON.stringify({ message: 'OK' }));
});
```

Now you can get a clear idea what `res.json` does?

## Database

Now to learn about upcomming methods lets make a simple database of shop items in json form by creating `database.json` file!

```json
[
    {
        "name": "T-Shirt",
        "id": "tshirt",
        "cost": 500
    },
    {
        "name": "Tea Cup",
        "id": "teacup",
        "cost": 100
    },
    {
        "name": "Calendar",
        "id": "calendar",
        "cost": 100
    }
]
```

And now your file structure should look like this

```
|- index.js
|- database.json
|- package.json
|- package-lock.json
|- node_modules/
```

And now import the json file to your index.js

```js
const express = require('express');
const app = express();
const database = require('./database.json');
```

## Paramaters

Now its easy for us to send api responses to known paths but what if we want to callect route parameters? Now this is easy. We will be using the `database.json` to make the example. 

```js
// Simple api endpoint to get information of the product by endpoint
app.get('/product/:id', (req, res) => {
    let id = req.params.id;
    let product = database.find(x => x.id == id);

    if(product){
        res.status(200).json({ message: 'success', data: product });
    }else {
        res.status(404).json({ message: 'not found', data: null });
    }
});
```

If you don't understand what kind of path `/product/:id` is? the `:id` collects the parameter and supplies it in `req.params`. For example if you visit `/product/something` then `something` will be the id! Now you can test the response by visiting `http://localhost:3000/product/teacup` where `teacup` is the valid id present in the database and to test 404 response then visit `http://localhost:3000/product/somethingrandom` where you can see the 404 response! And that's done!

## Queries

So if you dont know what queries are then you can see the image below

![Queries](https://sitebulb.com/media/1828/url-example.png)

So if its frontend we can get those queries by

```js
new URLSearchParams(window.location.search);
```

But how to do this in express.js? Ok for the example we will be using the `database.json` again and we will be doing the same method used in the previous topic!

```js
// The same old way but using queries!
app.get('/products', (req, res) => {
    let id = req.query.id;
    let product = database.find(x => x.id == id);

    if(product){
        res.status(200).json({ message: 'success', data: product });
    }else {
        res.status(404).json({ message: 'not found', data: null });
    }
});
```

For example if you have query suppplied `https://some.com?foo=bar`, We can get the value of foo in search queries by doing `req.query.foo` which will return bar! To test this you can visit `http://localhost:3000/products?id=teacup` and to test 404 you can visit `http://localhost:3000/products?id=somethingrandom`!


## Post Requests

So if you don't know about post requests, then they are requests mostly used for api and cannot be accessed through normal browsers but you can access it! 

```js
// Simple post request
app.post('/json', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
```

So, till now we were using `app.get` method which are only for get requests which we use in normal browsers. But for post requests, you have to do nothing but change the method from `app.get` to `app.post`! I have explained the callback part in the first topic! To test post requests you can use postman, curl, etc. I will use curl for now!

```sh
curl -X POST http://localhost:3000/json
```

And it will send the response as `{"message":"OK"}`! And thus we made it again!

## Conclusion

These are just some few examples. I will extend this guide to more pages. To support visit our youtube channel!

---

# Github login

You might have login system in the 90% of internet which is very essential which helps the website to know who are you and provide services to you! And we will be doing the same login with express.js and we will be using github's oauth for this guide! You can view the source code of this project [here](https://github.com/decimaldevteam/tutorials/tree/express.js-ep-2)!

## Setting up

So first setup npm and install packages

```sh
npm init -y
npm i express axios dotenv
```

Your file structure should look like this!

```
|- node_modules/
|- index.js
|- .env
|- package-lock.json
|- package.json
```

## Dotenv

Now got your `.env` file!

```
PORT = 3000
```

We will be storing port in env file to test is that env works! Then go to your `index.js` and add this line of code which loads the env variables!

```js
require('dotenv').config(); // Loads all env variables
```

## Web app

If you have not viewed the previous page, then view it to know how to setup web app with express.js. Here is the basic web app code with a test json response!

```js
const express = require('express');
const app = express();

// Simple test response
app.get('/', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000!');
});
```

You can run the index.js file by `node index` and see if it's working perfectly at `http://localhost:3000`!

## Creating an oauth app

Now to perform github login with express.js we need to create our oauth app by going to `github.com`! Click your avatar which is at top right side. A dropdown menu will come and click settings there. In settings, scroll below and find for Developer Settings and click it! After going there click Oauth Apps and click create new app if you have not created! Fill the details over there correctly or errors will occur during login process! You can view out youtube video for more clear understanding what you are doing! The homepage url in the form will be the url where you will be redirected to login and the callback url will be the url which will be redirected after login process with code search query! The url should be exactly same too... After creating an oauth app, copy the client id and client secret to `.env` file!

```
PORT = 3000
CLIENT_ID = someid
CLIENT_SECRET = somesecret
```

## Redirecting to login page!

Now lets create a callback function for `/login` path which is provided in the form!

```js
// Login page
app.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(`http://localhost:${process.env.PORT}/callback`)}`);
});
```

Incase if you are confused what is going on here then lemme explain it. When the user visits the `/login` page it gets redirected to the url provided in the `res.redirect` method! The url which is getting to be redirected will contain some information in search queries such as `client_id` which will be the client if from the `.env` file, `redirect_uri` which will be the encoded url which will be redirected after login ends with a code search query!<br/><br/>Now you can go and visit `http://localhost:3000` where you will be redirected to github login and then sent to `/callback` with code search query which will not send response because we didnt written the callback for the `/callback` path!

## Callback path

```js
// Callback page
app.get('/callback', async (req, res) => {
    let code = req.query.code;
    if(!code) return res.status(400).json({ message: 'no code provided!' });

    try{
        const token = await axios({
            method: 'POST',
            url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}`,
            headers: {
                'Accept': 'application/json'
            }
        });

        const user = await axios({
            method: 'GET',
            url: `https://api.github.com/user`,
            headers: {
                Authorization: `token ${token.data.access_token}`
            }
        });

        res.status(200).json({ message: 'success', data: user.data });
        console.log(`${user.data.login} has logged in at ${Date.now()}`);
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'internal server error!' });
    }
})
```

Ok, couldn't understand anything? Lemme breakdown codes!

```js
let code = req.query.code;
if(!code) return res.status(400).json({ message: 'no code provided!' });
```

This code searches if there is any code search query provided. If none will send 400 bad request response!

```js
}catch(e){
    console.log(e);
    res.status(500).json({ message: 'internal server error!' });
}
```

Then there is a try catch block. Incase if there is any kind of error in the rest of the code it will send 500 Internal server error as response and console the error for debugging!

```js
const token = await axios({
    method: 'POST',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}`,
    headers: {
        'Accept': 'application/json'
    }
});
```

Ok here as you can see using the code we are getting the access token by making post request using axios! `client_id`, `client_secret`, `code` and `redirect_uri` are sent as query parameters! The redirect uri needs to be same which you have proivided in the login url! Then we use the `Accept` header to receive json response because the api by default sends a search query format response which is not required for us so we need a json response!

```js
const user = await axios({
    method: 'GET',
    url: `https://api.github.com/user`,
    headers: {
        Authorization: `token ${token.data.access_token}`
    }
});
```

In this code, we are getting the user's public info using the access token sent by the github api first! In the headers we provide `Authorization` header where it contains the token.

> If you are confused why `token.data.access_token`. Axios sends it's response in a object where the response data will be in data and the access_token is the json response sent by github api!

```js
res.status(200).json({ message: 'success', data: user.data });
console.log(`${user.data.login} has logged in at ${Date.now()}`);
```

Easily understandable that we are sending the response and console logging that someone has performed login through our site! Now you can test this, and see a successful console log message. View the youtube video for live examples!

## Conclusion

Now you can store the user information in cookies if it's backend or local storage with jwt if it's frontend! That's all for today's guide. In upcomming pages, we will discuss more about express.js!
