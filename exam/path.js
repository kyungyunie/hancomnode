// Node.js의 path 모듈을 불러옵니다
const path = require('path');   

// path.join(): 여러 경로를 결합하여 하나의 경로로 만듭니다
// - 각 인자는 경로의 일부가 됩니다
// - 운영체제에 맞는 경로 구분자를 자동으로 사용합니다
// - 결과: '/a/b/c'
console.log(path.join('/a','/b','c'));      

// path.resolve(): 절대 경로를 생성합니다
// - 주어진 경로들을 절대 경로로 변환합니다
// - 현재 작업 디렉토리를 기준으로 절대 경로를 생성합니다
// - 결과: 'C:\a\b\c' (Windows) 또는 '/a/b/c' (Unix/Linux)
console.log(path.resolve('/a','/b','c'));
