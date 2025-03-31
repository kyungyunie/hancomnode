const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const MEMOS_DIR = './memos';

// 메모 저장 디렉토리 생성
async function initDirectory() {
    try {
        await fs.mkdir(MEMOS_DIR, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

// 메인 메뉴 표시
function showMainMenu() {
    console.clear();
    console.log('===== 간단한 메모장 =====');
    console.log('1. 새 메모 작성');
    console.log('2. 메모 목록 보기');
    console.log('3. 메모 읽기');
    console.log('4. 종료');
    console.log('======================');
}

// 메모 목록 표시
async function showMemoList() {
    console.clear();
    console.log('===== 메모 목록 =====');
    try {
        const files = await fs.readdir(MEMOS_DIR);
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
        console.log('===================');
    } catch (err) {
        console.error('메모 목록을 불러오는데 실패했습니다:', err);
    }
}

// 새 메모 작성
async function createMemo(title, content) {
    const fileName = `${Date.now()}_${title}.txt`;
    const filePath = path.join(MEMOS_DIR, fileName);
    try {
        await fs.writeFile(filePath, content);
        console.log('메모가 저장되었습니다:', fileName);
    } catch (err) {
        console.error('메모 저장에 실패했습니다:', err);
    }
}

// 메모 읽기
async function readMemo(fileName) {
    const filePath = path.join(MEMOS_DIR, fileName);
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log('\n===== 메모 내용 =====');
        console.log(content);
        console.log('===================\n');
    } catch (err) {
        console.error('메모를 읽는데 실패했습니다:', err);
    }
}

// 사용자 입력 처리
async function processUserInput() {
    showMainMenu();
    
    rl.question('원하는 작업을 선택하세요 (1-4): ', async (choice) => {
        switch (choice) {
            case '1':
                rl.question('메모 제목을 입력하세요: ', (title) => {
                    rl.question('메모 내용을 입력하세요: ', async (content) => {
                        await createMemo(title, content);
                        setTimeout(processUserInput, 1000);
                    });
                });
                break;
                
            case '2':
                await showMemoList();
                rl.question('\n메인 메뉴로 돌아가려면 엔터를 누르세요...', () => {
                    processUserInput();
                });
                break;
                
            case '3':
                await showMemoList();
                rl.question('\n읽을 메모 번호를 선택하세요: ', async (index) => {
                    const files = await fs.readdir(MEMOS_DIR);
                    if (index > 0 && index <= files.length) {
                        await readMemo(files[index - 1]);
                    } else {
                        console.log('잘못된 메모 번호입니다.');
                    }
                    rl.question('\n메인 메뉴로 돌아가려면 엔터를 누르세요...', () => {
                        processUserInput();
                    });
                });
                break;
                
            case '4':
                console.log('프로그램을 종료합니다.');
                rl.close();
                break;
                
            default:
                console.log('잘못된 선택입니다. 다시 선택해주세요.');
                setTimeout(processUserInput, 1000);
                break;
        }
    });
}

// 프로그램 시작
async function main() {
    try {
        await initDirectory();
        await processUserInput();
    } catch (err) {
        console.error('프로그램 실행 중 오류가 발생했습니다:', err);
        rl.close();
    }
}

// 프로그램 실행
main();

// 프로그램 종료 시 처리
rl.on('close', () => {
    process.exit(0);
});


    
