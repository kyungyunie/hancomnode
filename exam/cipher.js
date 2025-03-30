const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('tommy', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화:', result);

// 다른 키와 IV 사용
const decipherkey = 'abcdefghijklmnopqrstuvwxyz123456';  // 원래 키 사용
const decipheriv = '1234567890123456';  // 원래 IV 사용

const decipher = crypto.createDecipheriv(algorithm, decipherkey, decipheriv);   
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화:', result2);
