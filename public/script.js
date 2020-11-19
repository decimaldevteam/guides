/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */

window.highlight = () => {
    document.querySelectorAll('.js, .html, .json').forEach(hljs.highlightBlock);
    document.querySelectorAll('.bash').forEach(x => {
        x.innerHTML = x.innerHTML.replace(/\$/g, '<font style="color: rgb(255, 234, 74)">$</font>');
    });
};