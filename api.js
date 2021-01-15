const app = require('express').Router();
const axios = require('axios');
const pages = new Map();
const data = [];

async function init(){
    const guides = await axios.get('https://raw.githubusercontent.com/decimaldevteam/guides/main/api.json');
    data.push(...guides.data);

    for(let i = 0; i < guides.data.length; i++){
        let x = guides.data[i];
        let guide = await axios.get(`https://raw.githubusercontent.com/decimaldevteam/guides/main/guides/${x.file}.md`);
        pages.set(x.file, guide.data);
    };
}

init().then(() => console.log(`[EVENT] - Loaded api!`));

app.get('/guide/:guide', (req, res) => {
    let page = pages.get(req.params.guide);
    if(!page) return res.json({ message: 'not found' });
    res.json({
        message: 'success',
        guide: data.find(x => x.file == req.params.guide),
        content: page
    })
})

module.exports = app;
