import axios from 'axios';

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

init().then(() => console.log('Loaded all pages!'));

export default (req, res) => {
    let page = pages.get(req.query.guide);
    if(!page) return res.json({ message: 'not found' });
    res.json({
        message: 'success',
        guide: data.find(x => x.file == req.query.guide),
        content: page
    })
}