import Loader from '../components/Loader';
import Header from '../components/Header';
import GuideCard from '../components/GuideCard';
import React from 'react';
import axios from 'axios';

export default function Home({ guides }){

    let [data, setData] = React.useState(guides);
    const tags = {};
    guides.forEach(x => x.tags.forEach(x => tags[x] = tags[x] ? tags[x] + 1 : 1));

    return <>
        <Loader title="Decimal Guides" description="All the guides written for developers by the decimal development community!"/>
        <Header/>

        <div className="coverpage">
            <h1>Search some of our guides.</h1>
            <font className="c-des">Get some of our latest feed on React, Next.js, Node.js, Python and more!</font>
            <input id="search" onKeyPress={() => {
                let search = document.getElementById('search').value;
                setData(guides.filter(x => x.name.includes(search) || search.includes(x.name) || x.name.startsWith(search) || search.startsWith(x.name)))
            }}/>
            {Object.keys(tags).map(x => <span className="tag-badge" onClick={() => setData(guides.filter(y => y.tags.includes(x)))}>
                <font>{x}</font>
                <span>{tags[x]}</span>
            </span>)}
        </div>

        <div className="home-guide-content">
            <font style={{ marginBottom: '10px', display: 'inline-block' }}>{data.length} result{data.length < 1 ? 's' : ''} found...</font>
            <div className="row">
                {data.map(x => <GuideCard guide={x}/>)}
            </div>
        </div>
    </>

}

Home.getInitialProps = async () => {
    try{
        const { data } = await axios.get('https://raw.githubusercontent.com/decimaldevteam/guides/main/api.json');
        return { guides: data };
    }catch(e){
        return { guides: [] };
    }
}