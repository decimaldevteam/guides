/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../components/Header';
import GuideCard from '../components/GuideCard';

class GuideSearch extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: this.props.data.map(x => <GuideCard guide={x}/>) };
    };

    render(){

        const search = () => {
            let q = document.getElementById('search-box').value;
            let content = this.props.data.filter(x => {
                let y = x.name;
                return y.startsWith(q) ||
                q.startsWith(y) ||
                q.includes(y) ||
                y.includes(q)
            })
            .map(x => <GuideCard guide={x}/>)
            this.setState({ content });
        };

        return <>
            <Header/>

            <div className="coverpage">
                <div className="coverpage-content">
                    <h2>Decimal Guides</h2>
                    <p>Search guides which suits you...</p>
                    <input
                        type="text"
                        id="search-box"
                        placeholder="Your search here..."
                        onKeyPress={search}
                        autoFocus
                    />
                </div>
            </div>

            <div className="display-area">
                <h3>{this.state.content.length} results found...</h3>
                <div className="row">{this.state.content}</div>
            </div>
        </>

    };

};

export default GuideSearch;