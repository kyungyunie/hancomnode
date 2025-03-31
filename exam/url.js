const url = require('url');

const { URL } = url;
const myURL = new URL('http://3.35.233.100/index.html');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');




