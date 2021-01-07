# Introduction

Express.js is a server side web framework for node.js which is very easy to use and learn!

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
