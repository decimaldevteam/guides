# Reactjs

Reactjs is a cool frontend web framework used for web development, even this site is made with reactjs! And in this guide you will just get some how to from react!, You can view react documentation and its official guides [here](https://reactjs.org/)...

> Move up to the next page to start!

## Installation

You can use react directly in html by adding script tags to head

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

Or making the react website in jsx and then making production build! For that you must have installed nodejs!

```bash
$ npx create-react-app .
```

> If you are thinking what is `npx create-react-app .`, that will just setup the directory for react jsx development! And we will be using `create-react-app` template for this whole guide, you can still setup your own project environment. And if you are using raw react, then its a bad idea!

After running the create-react-app command, you are ready to do things! Now run npm start

```bash
$ npm start
```

This will serve the react site at `localhost:3000`! And if you have completed building the site, then you can use `npm run build` which will make a production build folder in `build/` folder which will have static html, css and js, which you can use to host the site! For more examples, kindly view up the [Reactjs docs](https://reactjs.org/docs/getting-started.html)...

Incomming pages, we will be just discussing some tips and tricks!

---

# Loading page

In this page, we will be making a very basic loading page, which you can even see when you load this site.

## Why loading page?

Loading page is necessary for sites which uses backend api to load content! Because it might take some time to fetch infomation from api, till then the users might get bored with empty loading page so you can do something like a loading page!

## Making the page

Now just make your loading page as you wish in a class or function whatever you want. For the sake of this guide, i will be making it in a class

```js
import React from 'react';

class LoadingPage extends React.Component{

    render(){
        return <>
           <font>Loading</font>
        </>
    };

};

export default LoadingPage;
```

And the above class will be my loading page!

## Your app page

Now in your main page, import the loading page 

```js
import React from 'react';
import LoadingPage from './path/to/LoadingPage.jsx';
```

Now lets make the app component!

```js
class App extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: <LoadingPage/> }
    };

    componentWillMount(){
        fetch('/path/to/api/site')
        .then(res => res.json()) // Make it text or json, its based on the response of api
        .then(content => this.setState({ content }));
    };

    render(){
        return <>{this.state.content}</>
    };

};

export default App;
```

## Rendering

After you finish it, time to render it

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './path/to/App.jsx';

ReactDOM.render(<App/>, document.getElementById('app'));
```

And when doing npm start you can see a loading page, you can do things with the content you getting from api!

---

# GitHub Login

GitHub login is used to know that which github user is accessing the website. This will help to collect data based on that. Even this website uses github login for things like discussion page, submissions, etc! There are currently many social logins avaliable like google, discord, facebook but for this guide we will be useing github as an example!

Make sure you make an oauth app by going to Settings > Developer Settings > Oauth Apps > New App. Then get your client secret and id.

> Put your homepage and callback url correctly in the box

## App

Now just simply make the main app class

```js
import React from 'react';

const CLIENT_ID = ''; // Your client id

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: <font>We are making a login!</font> };
    }

    componentDidMount(){
        let popup = window.open(
            'https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID + '&redirect_uri=' + encodeURIComponent(`${window.location.origin}/login.html`), // Just create a login.html file in public folder to get the code from the github api
            'GitHub Authorization', 
            'height=100&width=600' // For a minimized window
        );

        let interval = window.setInterval(() => {
            let queries = new URLSearchParams(popup.location.search);
            let code = queries.get('code');

            if(code){
                window.clearInterval(interval);
                popup.close();
                return this.proceed(code);
            }

            if(queries.get('error')){
                window.clearInterval(interval);
                popup.close();
                return alert('Login Failed');
            }
        }, 1000)
    }

    proceed(code){
        fetch('localhost:5000/login', { headers: { code } }) // localhost:5000 is ur api site!
        .then(res => res.json())
        .then(user => {
            this.setState({ content: <h1>Hi {user.login}!</h1> })
        })
    }
    
    render(){
        return <>
            {this.state.content}
        </>
    }

}
```

For this tutorial we will be using an api to secure our client secret! So we will be using expressjs in a seperate site!

## Api

Now because we will be using client so this will be a private api and will be using `dotenv` and expressjs's `req.headers.origin` to only allow the main site to access api!

```js
const express = require('express');
const axios = require('axios');
const app = express();
const origin = 'http://localhost:3000';

app.get('/login', async (req, res) => {
    if(!req.headers.origin != origin) return res.status(401).json({ message : 'Unauthorized' }); // To prevent others to access

    let code = req.headers.code;

    try{
        const { data } = await axios({
            method: 'POST',
            url: `https://github.com/login/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}&redirect_uri=${encodeURIComponent(`${origin}/login.html`)}`
        });

        let token = data.split('=')[1].split('&')[0];

        const user = await axios({
            method: 'GET',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: `token ${token}`
            }
        });

        return res.status(200).json(user.data);
    }catch(e){
        return res.status(400).json({ message: 'Failed' });
    }
});

app.listen(5000);
```

## Rendering

Now render with react-dom

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('app'));
```

And now go to `localhost:3000` and see the magic! You can join our discord support server [here](https://discord.gg/FrduEZd) for help!
