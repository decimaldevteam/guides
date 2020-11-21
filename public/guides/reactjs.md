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
