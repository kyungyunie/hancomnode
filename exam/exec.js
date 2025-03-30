const exec = require('child_process').exec;
// Windows에서는 dir 명령어 사용, 인코딩을 utf8로 지정
var process = exec('dir', { encoding: 'utf8' });

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) {
    console.error(data.toString());
});
