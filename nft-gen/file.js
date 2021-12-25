/*
파일 저장을 위한 함수들

 */
const fs = require("fs");
const { toGatewayURL } = require("nft.storage");

const CSV_FILE = "./distribution.csv";
const META_FILE = "./meta.txt";



if (fs.existsSync(CSV_FILE)) {
    fs.rmSync(CSV_FILE, {force: true});
}

if (fs.existsSync(CSV_FILE)) {
    fs.rmSync(CSV_FILE, {force: true});
}

// 토큰 조합의 분포를 보기위해 csv 파일로 생성하기
const makeCSV = (NFTs) => {
    for (let i=0; i<NFTs.length; i++) {
        fs.writeFileSync(CSV_FILE, NFTs[i].toString() + "\r\n", { flag: "a+" });
    }
}

// IPFS 에 업로드한 후 URI 정보를 파일에 저장하기
const saveMetadataUri = (uri) => {
    fs.writeFileSync(META_FILE, uri + "\r\n", { flag: "a+" });
}

// 파일에서 인덱스 index 에 해당하는 토큰을 찾아서 토큰 URI 문자열 가져오기
// 인덱스는 0부터 시작하고 토큰 번호는 1부터 시작한다.
const readMetadataUri = async (index) => {
    
    const buffer = await fs.readFileSync(META_FILE);
    let tokenUri = "";
    
    let regexp = new RegExp("(\r?\n)?" + index + "=(.*)\/metadata\.json", "g");
    let result = buffer.toString().match(regexp);
    
    if (result != null) {
        tokenUri = result[0].slice(result[0].indexOf("=")+1);
        //console.log(uri);
    }
    return tokenUri;
}

// ipfs: 형식의 URI를 http URL 로 변환하여 파일을 생성
const convertGatewayUrl = async (index) => {
    
    const buffer = await fs.readFileSync(META_FILE);
    let tokenUri = "";
    
    let regexp = new RegExp("(\r?\n)?" + index + "=(.*)\/metadata\.json", "g");
    let result = buffer.toString().match(regexp);
    
    if (result != null) {
        tokenUri = result[0].slice(result[0].indexOf("=")+1);
    }
    return `${index}=${toGatewayURL(tokenUri).href}`;
}


module.exports = {
    makeCSV,
    saveMetadataUri,
    readMetadataUri,
    convertGatewayUrl
}
