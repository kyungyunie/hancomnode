const fs = require('fs').promises;

fs.readFile('test.py', 'utf8')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });


fs.writeFile('writeme.txt', '글자를 써보자', 'utf8')
    .then(() => {
        console.log('성공');
    })
    .catch((err) => {
        console.error(err);
    });
