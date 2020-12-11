/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Markdown from 'react-showdown';
import Header from '../components/Header';
import Entry from '../components/Entry';
import LoginWindow from '../utils/PopupWindow';

export default class SubmitPage extends React.Component{

    constructor(props){
        super(props);
        this.state = { markdown: 'Type something in the content box!' };
        this.edit = false;
    }

    componentWillMount(){
        let guide = this.props.route[2];
        if(guide){
            this.edit = true;
            guide = this.props.data.find(x => x.file === guide);
            if(!guide) return;
            fetch(`https://raw.githubusercontent.com/decimaldevteam/guides/main/public/guides/${guide.file}.md`)
            .then(res => res.text())
            .then(body => {
                document.getElementById('title-entry').value = guide.name;
                document.getElementById('description-entry').value = guide.description;
                document.getElementById('thumbnail-entry').value = guide.thumbnail;
                document.getElementById('content-entry').value = body;
            });
        };
    };

    render(){

        function makeMarkdown(){
            let ouputElement = document.getElementById('content-entry');

            this.setState({ markdown: <>
                {ouputElement.value.split('---').map((x, i) => {
                    return <>
                        <h2>Page {i+1}</h2>
                        <div className="output-page-box">
                            <Markdown markdown={x}/>
                        </div>
                    </>
                })}
            </> })
        };

        function submit(){
            let data = {
                name: document.getElementById('title-entry').value,
                description: document.getElementById('description-entry').value,
                avatar: document.getElementById('thumbnail-entry').value,
                content: document.getElementById('content-entry').value,
                author: null
            };

            if(!data.name) return alert('Name field is required!');
            if(!data.description) return alert('Description field is required!');
            if(data.content.length < 100) return alert(`The content field should be ${100 - data.content.length} characters more lengthier!`)

            let alertError = () => alert('Login fialed!');
            let token = localStorage.getItem('token');

            if(token){
                data.author = token;
                fetch(`https://api.decimaldev.xyz/submitguide`, { headers: { data: JSON.stringify(data) } })
                .then(res => res.status, submitByLogin)
                .then(() => alert('Guide has been submitted! It will take upto 1 to 5 days for the team to review the guide and apply it! Else you can try to make a github pull request too!'), submitByLogin)
            }
            else submitByLogin();

            function submitByLogin(){
                let loginPopup = LoginWindow.open('https://github.com/login/oauth/authorize?client_id=bf6ad8be3bf4e20026bf&redirect_uri=' + decodeURIComponent(`${window.location.origin}/login.html`), 'GitHub Authorization', 'height=100&width=600');
                loginPopup.promise.then(
                    code => {
                        fetch(`https://api.decimaldev.xyz/guidelogin?code=${code}`)
                        .then(res => res.json(), alertError)
                        .then(user => {
                            data.author = user.data;
                            localStorage.setItem('token', data.author);
                            fetch(`https://api.decimaldev.xyz/submitguide`, { headers: { data: JSON.stringify(data) } });
                            alert('Guide has been submitted! It will take upto 1 to 5 days for the team to review the guide and apply it! Else you can try to make a github pull request too!');
                        }, alertError)
                    },
                    () => alert('Login failed!')
                )
            };
        };

        return <>
            <Header/>

            <div className="coverpage">
                <div className="coverpage-content">
                    <h2>{this.edit ? 'Edit' : 'New Guide'}</h2>
                    <p>Thanks for the contribution!</p>
                </div>
            </div>

            <div style={{ padding: '30px' }}>
                <Entry name="Title"/>
                <Entry name="Thumbnail"/>
                <Entry name="Description"/>

                <div className="entry-box">
                    <h1>Content:</h1>
                    <textarea
                        type="text"
                        id="content-entry"
                        placeholder="Your guide content here..."
                        onKeyPress={makeMarkdown.bind(this)}
                    />
                </div>

                <div className="entry-box">
                    <h1>Output:</h1>
                    <a onClick={() => this.setState({ markdown: '' })}>Collapse?</a>
                    <div id="output-box" className="guide-page">{this.state.markdown}</div>
                </div>

                <div className="submit">
                    <a id="submit-btn" onClick={submit.bind(this)}>SUBMIT</a>
                    <p>You will be doing a github login to submit the changes!</p>
                </div>
            </div>
        </>
    };

};