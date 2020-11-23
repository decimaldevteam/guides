/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */

// if(location.protocol === 'http:') location.href = location.href.replace('http', 'https');

window.highlight = () => {
    document.querySelectorAll('.js, .html, .json').forEach(hljs.highlightBlock);
    document.querySelectorAll('.bash').forEach(x => {
        x.innerHTML = x.innerHTML.replace(/\$/g, '<font style="opacity: 0.7">$</font>');
    });
};

window.saveGuide = x => {
    localStorage.setItem('saved', `${localStorage.getItem('saved')},${x}`);
    document.getElementById('vl-btn').innerHTML = 'Added to viewlist!';
};