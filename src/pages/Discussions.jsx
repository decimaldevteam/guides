/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-globals */
import React from 'react';
import Header from '../components/Header';
import moment from 'moment';

export default class Discussions extends React.Component{

    constructor(props){
        super(props);

        this.token = localStorage.getItem('token');
        this.state = { entry: <h3 style={{ textAlign: 'center' }}>Loading Discussions....</h3>, discussions: [] };
    };

    componentWillMount(){
        let alertError = () => alert('Api failed!');

        if(this.token){
            fetch(`https://api.github.com/user`, { headers: { Authorization: `token ${this.token}` } })
            .then(res => res.json(), alertError)
            .then(data => {
                this.login = data.login;
                this.loadDiscussions();

                this.setState({ entry: <>
                    <div className="new-discussion discussion">
                        <div><img src={data.avatar_url}></img></div>
                        <div className="d-side">
                            <div className="d-timestamp-handler">
                                <p className="d-name">{data.login} <font className="d-timestamp">Now</font></p>
                            </div>
                            <font className="d-content"><textarea id="nd-entry" placeholder="Your content here..."></textarea></font>
                            <a className="d-send" onClick={function() {
                                let content = document.getElementById('nd-entry').value;
                                let alertError = () => alert('Api Failed!');

                                fetch('https://api.decimaldev.xyz/discussions/new', { headers: { token: this.token, content } })
                                .then(res => res.json(), alertError)
                                .then(this.loadDiscussions.bind(this), alertError)

                                document.getElementById('nd-entry').value = '';
                            }.bind(this)}>Send <i class="fa fa-paper-plane" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </> });
            }, alertError)
        }else{
            this.setState({ entry: <div className="d-nosignin">
                 <p>You have not login yet!</p>
                 <a href="/#/account" className="signin">Sign in</a>
            </div> });
        }
    };

    loadDiscussions(){
        let alertError = () => alert('Api Failed!');

        fetch('https://api.decimaldev.xyz/discussions')
        .then(res => res.json(), alertError)
        .then(data => this.setState({ discussions: data.data.reverse() }), alertError);
    };

    render(){
        return <>
            <Header/>

            <div style={{ padding: '30px' }}>
                {this.state.entry}
                {this.state.discussions.map(x => <>
                    <div className="discussion">
                        <div><img src={x.avatar}></img></div>
                        <div className="d-side">
                            <div className="d-timestamp-handler">
                                <p className="d-name">{x.name} <font className="d-timestamp">{moment(x.ts).fromNow()}</font> {
                                    x.name === this.login ?
                                    <a className="d-delete-btn" onClick={() => {
                                        fetch('https://api.decimaldev.xyz/discussions/delete', { headers: { token: this.token, id: x.ts } })
                                        .then(res => res.json(), () => alert('Unauthorized!'))
                                        .then(this.loadDiscussions.bind(this), () => alert('Unauthorized'));
                                    }}>Delete?</a> :
                                    ''
                                }</p>
                            </div>
                            <font className="d-content">{x.content}</font>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    };

};