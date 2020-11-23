/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from '../components/Header';
import GuideCard from '../components/GuideCard';

const match = (a, b) => {
    for(let i = 0; i < a.length; i++) if(b.includes(a[i])) return true;
};

class Home extends React.Component{

    componentDidMount(){
        window.darkMode = true;
        window.dark();
    };

    render(){
        let data = this.props.data;
        let history = localStorage.getItem('history');
        let saved = localStorage.getItem('saved');
        let topGuides = data.filter(x => x.top);

        const LatestGuides = () => data.slice(0, 4).map(x => <GuideCard guide={x}/>);
        const TopGuides = () => topGuides.map(x => <GuideCard guide={x}/>);
        const RandomGuides = () => data.sort(() => Math.random() - 0.5).slice(0, 4).map(x => <GuideCard guide={x}/>);
        const RecentlyViewedGuides = () => data.filter(x => history.includes(x.file)).slice(0, 4).map(x => <GuideCard guide={x}/>);
        const RecommendedGuides = () => topGuides.filter(x => match(x.tags, history)).slice(0, 4).map(x => <GuideCard guide={x}/>);
        const ViewList = data.filter(x => saved.includes(x.file)).map(x => <GuideCard guide={x}/>);

        return <>
            <Header/>

            <div className="coverpage">
                <div className="coverpage-content">
                    <h2>Decimal Guides</h2>
                    <p>Guides for developers by developers!</p>
                    <a href="/#/guides">Get Started</a>
                </div>
            </div>

            <div className="display-area">
                {
                    ViewList.length ?
                    <>
                        <h3 className="title">ViewList</h3>
                        <a onClick={() => {
                            localStorage.setItem('saved', ' ');
                            this.setState({});
                        }} style={{ cursor: 'pointer' }}>Clear viewlist?</a>
                        <div className="row" style={{ marginTop: '10px' }}>
                             {ViewList}
                        </div>
                    </> :
                    ''
                }

                <h3 className="title">Latest Guides</h3>
                <div className="row" style={{ marginTop: '10px' }}>
                    <LatestGuides/>
                </div>

                <h3 className="title">Recently Viewed Guides</h3>
                <div className="row" style={{ marginTop: '10px' }}>
                    <RecentlyViewedGuides/>
                </div>

                <h3 className="title">Recommended Guides</h3>
                <font>This is based on your history...</font>
                <div className="row" style={{ marginTop: '10px' }}>
                    <RecommendedGuides/>
                </div>

                <h3 className="title">Top Guides</h3>
                <div className="row" style={{ marginTop: '10px' }}>
                    <TopGuides/>
                </div>

                <h3 className="title">Random Guides</h3>
                <div className="row" style={{ marginTop: '10px' }}>
                    <RandomGuides/>
                </div>

                <div className="footer-info-text">
                    <a href="/#/guides"><font>Explore more guides <i class="fas fa-arrow-right"></i></font></a>
                </div>

                <div style={{ height: '60px' }}/>
            </div>
        </>
    };

};

export default Home;