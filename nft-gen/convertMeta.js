// ipfs 형식의 URI를 http URL 로 변환하여 파일을 생성
const fs = require("fs");
const { convertGatewayUrl } = require("./file.js");
const META_FILE = "./meta.href.txt";

const TOTAL_NUMBER = 10;

for (let k=1; k<=TOTAL_NUMBER; k++) {
    convertGatewayUrl(k).then(uri => {
        fs.writeFileSync(META_FILE, uri + "\r\n", { flag: "a+" });
    });
}

