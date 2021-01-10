import Loader from '../../components/Loader';
import Header from '../../components/Header';
import React from 'react';
import Markdown from 'react-showdown';
import Head from 'next/head';
import axios from 'axios';

function Guide({ guide, content }){

    if(!guide){
        React.useEffect(() => window.location.href = process.env.NODE_ENV == 'development' ? window.location.href : '/');
        return null;
    }

    const pages = content.split('---');
    const [page, setPage] = React.useState({ name: 'Loading...', content: '# Loading...' }); 

    function route(){
        let name = decodeURIComponent(window.location.hash.slice(2));
        let i = guide.pages.findIndex(x => x.name == name);
        setPage({ content: pages[i == -1 ? 0 : i], ...guide.pages[i == -1 ? 0 : i] });
    }

    function toggleSidebar(){
        document.querySelector('.guidespace').classList.toggle('open-sidebar');
    }

    function makePageMover(){
        let pageMover = document.querySelector('.page-mover');
        let pageMoverContent = '';
        let prev = guide.pages[(guide.pages.findIndex(x => x.name == page.name))-1];
        let next = guide.pages[(guide.pages.findIndex(x => x.name == page.name))+1];

        if(prev) pageMoverContent += `<a class="prev" href="/guide/${guide.file}/#/${encodeURIComponent(prev.name)}"><i class="fas fa-chevron-left fa-2x"></i><br/>${prev.name}<font class="pi">Page ${guide.pages.indexOf(prev)+1}</font></a>`;
        if(next) pageMoverContent += `<a class="next" href="/guide/${guide.file}/#/${encodeURIComponent(next.name)}"><i class="fas fa-chevron-right fa-2x"></i><br/>${next.name}<font class="pi">Page ${guide.pages.indexOf(next)+1}</font></a>`;

        pageMover.innerHTML = pageMoverContent;
    }

    React.useEffect(() => {
        route();
        if(window.innerWidth > 700) toggleSidebar();
        window.addEventListener('hashchange', route);
        document.getElementById('main-sidebar').innerHTML = '<h1>Pages</h1>' + guide.pages.map(x => `<a class="main-sidebar-link" href="/guide/${guide.file}/#/${encodeURIComponent(x.name)}">${x.name}</a>`).join('<br/>');
        document.querySelector('.header').style.position = 'fixed';
        document.querySelector('.header').style.zIndex = 10;
    }, []);

    React.useEffect(() => {
        let sidebarLinks = '';
        document.querySelectorAll('.guidearea h2').forEach(x => sidebarLinks += `<a onclick="document.getElementById('${x.id}').scrollIntoView()">${x.innerHTML}</a><br/>`);
        document.getElementById('sub-sidebar').innerHTML = sidebarLinks;
        document.querySelectorAll('pre code').forEach(hljs.highlightBlock);
        makePageMover();
    });

    return <>
        <Loader title={guide.name} description={guide.description} img={guide.thumbnail}/>
        <Header/>
        <Head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/highlight.min.js" integrity="sha512-8DnqlIcZT5O7kn55WxWs0PnFyhwCqVEnsDpyHqcadSNtP0eqae406JmIoo2cXT5A42jnlcCw013sdkmK3mEJcQ==" crossOrigin="anonymous"></script>
        </Head>

        <div className="guidespace">
            <div className="sidebar" id="sidebar">
                <div id="sub-sidebar"/>
                <div id="main-sidebar"/>
            </div>
            <div className="guidearea">
                <h1 className="title">{guide.name}</h1><hr/>
                <font style={{ opacity: 0.7 }}>{guide.description}</font>
                {page.youtube ? <iframe src={`https://www.youtube.com/embed/${page.youtube}`} className="yt-frame" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : ''}
                <hr/>
                <Markdown markdown={page.content}/>
                <div className="page-mover"></div>
            </div>
        </div>

        <a onClick={toggleSidebar} className="nav"><i className="fa fa-bars fa-2x"/></a>
    </>;

}

Guide.getInitialProps = async ctx => {
    try{
        const { data } = await axios.get(`${process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://guides.decimaldev.xyz'}/api/guide/${ctx.query.guide}`);
        return { guide: data.guide, content: data.content };
    }catch(e){
        console.log(e)
        return { guide: false };
    }
}

export default Guide;