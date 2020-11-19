/* eslint-disable no-restricted-globals */
import React from 'react';
import { HashRouter, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import GuideSearch from './pages/GuideSearch';
import GuidePage from './pages/GuidePage';
import HistoryPage from './pages/History';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = { data: null };
    };

    componentWillMount(){
        fetch('/api.json')
        .then(res => res.json())
        .then(data => this.setState({ data }));
    };

    render(){
        if(!this.state.data) return <h1 className="load-text">Loading data...</h1>;

        return <>
            <HashRouter basename="/">
                <Route path="*" component={() => {
                    let route = useParams()[0];
                    if(route === '/guides') return <GuideSearch data={this.state.data}/>;
                    else if(route.startsWith('/guide/')) return <GuidePage data={this.state.data} guide={route.split('/')[2]}/>;
                    else if(route === '/history') return <HistoryPage data={this.state.data}/>;
                    else return <Home data={this.state.data}/>;
                }}/>
            </HashRouter>
        </>
    };

};

export default App;