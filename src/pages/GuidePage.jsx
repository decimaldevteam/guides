/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../components/Header';
import Markdown from 'react-showdown';

let sidebarOpen = Boolean(innerWidth < 800);

const sidebar = () => {
    if(!sidebarOpen){
        sidebarOpen = true;
        document.getElementById('doc-section').style.width = (innerWidth - 250) + 'px';
        document.getElementById('doc-sidebar').style.display = 'block';
    }else{
        sidebarOpen = false;
        document.getElementById('doc-sidebar').style.display = 'none'
        document.getElementById('doc-section').style.width = '100%'
    };
};

const makeSidebarLinks = () => {
    let links = [];
    document.querySelectorAll('#doc-section h1, #doc-section h2').forEach(x => {
        links.push(
            x.tagName === 'H1' ?
            `<a class="large-sidebar-link" onclick="document.getElementById('${x.innerHTML.toLowerCase().replace(/[|&;$%@"<>()+,\-. ]/g, '')}').scrollIntoView()">${x.innerHTML}</a>` :
            `<a class="small-sidebar-link" onclick="document.getElementById('${x.innerHTML.toLowerCase().replace(/[|&;$%@"<>()+,\-. ]/g, '')}').scrollIntoView()">${x.innerHTML}</a>`
        );
    });

    document.getElementById('sub-sidebar').innerHTML = `<div class="sidebar-links">${links.join('<br/>')}</div>`;
};

class GuidePage extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: 'Loading guide...' };
        this.guide = { updated: '404' };
        this.content = [];
    };

    componentWillMount(){
        let guide = this.props.data.find(x => x.file === this.props.guide);
        if(!guide) return this.setState({ content: '404 - Not Found' });
        this.guide = guide;

        fetch(`https://raw.githubusercontent.com/decimaldevteam/guides/main/public/guides/${guide.file}.md`)
        .then(res => res.text())
        .then(content => {
            this.content = content.split('---');
            this.setState({ content: this.content[0] });
            window.guidepage = this;

            window.highlight();
            sidebar();
            window.addEventListener('resize', sidebar);

            let links = [];
            let paginator = [];
            for(let i = 0; i < guide.sidebar.length; i++) {
                links.push(`<a class="large-sidebar-link" onclick="window.guidepage.setState({ content: window.guidepage.content[${i}] })">${guide.sidebar[i]}</a>`);
                paginator.push(`<a class="paginator-link" onclick="window.guidepage.setState({ content: window.guidepage.content[${i}] })">${i+1}</a>`);
            };

            document.getElementById('sidebar-link-handler').innerHTML = `<div class="sidebar-links"><h2>Pages</h2><br/><a onclick="window.saveGuide('${guide.file}')" id="vl-btn">Add to viewlist?</a><br/>${links.join('<br/>')}</div>`;
            document.getElementById('paginator').innerHTML = paginator.join('\n');
            document.getElementById('writter').innerHTML = guide.contributors.map(x => `<a href="http://github.com/${x}">${x}</a>`).join(', ')

            let oldHistory = localStorage.getItem('history');
            if(!oldHistory) return localStorage.setItem('history', guide.file);
            localStorage.setItem('history', `${oldHistory},${guide.file}`);
        });
    };

    componentDidUpdate(){
        makeSidebarLinks();
        window.highlight();
    };

    componentWillUnmount(){
        window.removeEventListener('resize', sidebar);
    };

    componentDidMount(){
        window.darkMode = true;
        window.dark();
    };

    render(){
        return <>
            <Header/>
            
            <div id="doc-sidebar">
                <div id="sub-sidebar"></div>
                <div id="sidebar-link-handler"></div>
            </div>

            <div className="padding-bottom display-area guide-page" id="doc-section">
                <Markdown markdown={this.state.content}/>
                <div id="paginator"/><hr/>
                <font className="credits">Written by <font id="writter">404</font></font><br/>
                <font className="muted">Last updated at {this.guide.updated}</font><br/>
                <a className="edit-btn" href={`https://github.com/decimaldevteam/guides/blob/main/public/guides/${this.guide.file}.md`}>Edit this guide <i class="fas fa-edit"></i></a>
                <div style={{ height: '90px' }}/>
            </div>

            <div id="nav-btn">
                <a onClick={sidebar}><i className="fa fa-bars fa-2x" aria-hidden="true"></i></a>
            </div>
        </>
    };

};

export default GuidePage;