const express = require('express');
const app = express();
const next = require('next')({ dev: process.argv[2] == 'dev' });
const handle = next.getRequestHandler();

next.prepare().then(() => {

    app.use('/api', require('./routes/api'));

    app.get('*', (req, res) => {
        handle(req, res);
    })

    app.listen(3000, () => console.log(`[EVENT] - Web server is ready!`));
    
})
