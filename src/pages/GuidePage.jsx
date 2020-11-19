/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../components/Header';
import Markdown from 'react-showdown';

let sidebarOpen = true;
if(innerWidth > 700) sidebarOpen = false;

const sidebar = _ => {
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

class GuidePage extends React.Component{

    constructor(props){
        super(props);
        this.state = { content: 'Loading guide...' };
        this.guide = { updated: '404' };
    };

    componentWillMount(){
        let guide = this.props.data.find(x => x.file === this.props.guide);
        if(!guide) return this.setState({ content: '404 - Not Found' });
        this.guide = guide;

        fetch(`/guides/${guide.file}.md`)
        .then(res => res.text())
        .then(content => {
            this.setState({ content });

            window.highlight();
            sidebar();
            window.addEventListener('resize', sidebar);

            let links = [];
            document.querySelectorAll('#doc-section h1, #doc-section h2').forEach(x => {
                links.push(
                    x.tagName === 'H1' ?
                    `<a class="large-sidebar-link" onclick="document.getElementById('${x.innerHTML.toLowerCase().replace(/[|&;$%@"<>()+,\-. ]/g, '')}').scrollIntoView()">${x.innerHTML}</a><br/>` :
                    `<a class="small-sidebar-link" onclick="document.getElementById('${x.innerHTML.toLowerCase().replace(/[|&;$%@"<>()+,\-. ]/g, '')}').scrollIntoView()">${x.innerHTML}</a><br/>`
                )
            });
            let sidebarLinks = `<div class="sidebar-links">${links.join('')}</div>`;

            document.getElementById('sidebar-link-handler').innerHTML = sidebarLinks;

            document.getElementById('writter').innerHTML = guide.contributors
            .map(x => `<a href="http://github.com/${x}">${x}</a>`)
            .join(', ')

            let oldHistory = localStorage.getItem('history');
            if(!oldHistory) return localStorage.setItem('history', guide.file);
            localStorage.setItem('history', `${oldHistory},${guide.file}`);
        });
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
                <div style={{ marginTop: '50px' }} id="sidebar-link-handler"></div>
            </div>

            <div className="padding-bottom display-area guide-page" id="doc-section">
                <Markdown
                    markdown={this.state.content}
                    options={{ tables: true }}
                />
                <hr/>
                <font className="credits">Written by <font id="writter">404</font></font><br/>
                <font className="muted">Last updated at {this.guide.updated}</font><br/>
                <a className="edit-btn" href={`https://github.com/decimaldevteam/website/tree/master/public/guides/${this.guide.file}`}>Edit this page <i class="fas fa-edit"></i></a>
                <div style={{ height: '90px' }}/>
            </div>

            <div id="nav-btn">
                <a onClick={sidebar}><i className="fa fa-bars fa-2x" aria-hidden="true"></i></a>
            </div>
        </>
    };

};

export default GuidePage;