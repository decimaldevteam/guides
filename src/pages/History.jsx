/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../components/Header';
import GuideCard from '../components/GuideCard';

class GuideSearch extends React.Component{

    constructor(props){
        super(props);

        let history = localStorage.getItem('history');
        if(!history) {
            localStorage.setItem('history', []);
            history = [];
        };

        this.history = this.props.data.filter(x => history.includes(x.file));
        this.state = { content: this.history.map(x => <GuideCard guide={x}/>) };
    };

    componentDidMount(){
        window.darkMode = true;
        window.dark();
    };

    render(){
        const search = () => {
            let q = document.getElementById('search-box').value;
            let content = this.history.filter(x => {
                let y = x.name;
                return y.startsWith(q) ||
                q.startsWith(y) ||
                q.includes(y) ||
                y.includes(q)
            })
            .map(x => <GuideCard guide={x}/>)
            this.setState({ content });
        };

        const clearHistory = () => {
            localStorage.setItem('history', []);
            this.setState({ content: <h3>History has been cleared!</h3> });
        };

        return <>
            <Header/>

            <div className="coverpage">
                <div className="coverpage-content">
                    <h2>History</h2>
                    <p>Search history</p>
                    <input
                        type="text"
                        id="search-box"
                        placeholder="Search your history from here"
                        onKeyPress={search}
                        autoFocus
                    /><br/>
                    <a onClick={clearHistory} className="clear-history-btn">Clear History?</a>
                </div>
            </div>

            <div className="display-area">
                <h3>{this.state.content.length || 0} results found...</h3>
                <div className="row">{this.state.content}</div>
            </div>
        </>
    };

};

export default GuideSearch;