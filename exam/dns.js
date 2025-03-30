import dns from 'dns/promises';

const ip = await dns.lookup('m95.co.kr');
console.log('IP', ip);

const a = await dns.resolve('m95.co.kr', 'A');
console.log('A', a);

const mx = await dns.resolve('m95.co.kr', 'MX');
console.log('MX', mx);

const any = await dns.resolve('m95.co.kr', 'ANY');
console.log('ANY', any);

const cname = await dns.resolve('www.gilbut.co.kr', 'CNAME');
console.log('CNAME', cname);



