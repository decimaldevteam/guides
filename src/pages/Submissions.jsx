/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Markdown from 'react-showdown';
import Header from '../components/Header';

export default class Submissions extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: <h2>Loading data...</h2> };
    };

    componentWillMount(){
        fetch('https://api.decimaldev.xyz/guides/submissions')
        .then(res => res.json())
        .then(body => {
            this.body = body.data;
            this.setState({ content: this.makeContent.bind(this)() })
        })
    }

    makeContent(){
        return this.body.map(x => <>
            <div className="submission-card">
                <h1>{x.name}</h1>
                <p>{x.description}</p>
                <strong>By {x.author}</strong><br/>
                <a onClick={() => {
                    this.setState({ content: <>
                        <div className="guide-page submission-demo">
                            <Markdown markdown={x.content}/>
                        </div>
                    </> })
                }}>View?</a>
            </div>
        </>)
    };

    render(){
        return <>
            <Header/>

            <div className="coverpage">
                <div className="coverpage-content">
                    <h2>Submissions</h2>
                    <p>Guide submissions pending...</p>
                </div>
            </div>

            <div style={{ padding: '30px' }}>{this.state.content}</div>
        </>
    };

};