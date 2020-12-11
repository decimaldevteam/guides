/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from '../components/Header';
import LoginWindow from '../utils/PopupWindow';

export default class Account extends React.Component{

    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = { content: <h1 className="load-text" style={{ marginTop: '30vh' }}>Loading account details...</h1> };
    };

    componentWillMount(){
        if(this.token) this.withToken();
        else this.withoutToken();
    };

    withToken(){
        fetch(`https://api.github.com/user`, { headers: { Authorization: `token ${this.token}` } })
        .then(res => res.json(), this.withoutToken)
        .then(user => {
            console.log(user);
            this.setState({ content: <div className="account-info">
                <img src={user.avatar_url}></img>
                <h1 style={{ fontWeight: 'bolder' }}>{user.name}</h1>
                <h2>{user.login}</h2>
                <a className="signout" onClick={() => {
                    localStorage.removeItem('token');
                    alert('Signed out!');
                    this.withoutToken();
                }}>Sign Out</a>
            </div> });
        }, this.withoutToken)
    };

    withoutToken(){
        this.setState({ content: <div className="signin-box">
            <p>You have not login yet!</p>
            <a className="signin" onClick={this.signin.bind(this)}>Sign In</a>
        </div> });
    };

    signin(){
        let alertError = () => 'Failed login!';
        let loginPopup = LoginWindow.open('https://github.com/login/oauth/authorize?client_id=bf6ad8be3bf4e20026bf&redirect_uri=' + decodeURIComponent(`${window.location.origin}/login.html`), 'GitHub Authorization', 'height=100&width=600');
        loginPopup.promise.then(
            code => {
                fetch(`https://api.decimaldev.xyz/guidelogin?code=${code}`)
                .then(res => res.json(), alertError)
                .then(user => {
                    user = user.data;
                    localStorage.setItem('token', user);
                    alert('Login has been done!');
                    this.withToken();
                }, alertError)
        }, alertError)
    };

    render(){
        return <>
            <Header/>

            <div style={{ padding: '30px' }}>
                {this.state.content}
            </div>
        </>
    };

};