const express = require('express');
const app = express();

app.set('port', 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/inde.html');
});

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
