const url = require('url');

const { URL } = url;
const myURL = new URL('http://15.164.232.204/tank.html');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');




