const { face, body, background } = require("./traits.js");
const { create } = require("./create.js");
//const { makeCSV } = require("./file.js");

const NUM_OF_FACES = 100;
const NUM_OF_BODY = 5;
const NUM_OF_BACKGROUND = 2;

// 500개 발행
const TARGET_NUM_OF_NFT = 500;

const RARE_TRAIT = 77;
const MAX_NUM_OF_RARITY = 2;

let NFTs = [];
let totalCountOfRareTrait = 0;


// 난수 발생
const fnRng = (limit) => {
    return Math.floor(Math.random() * limit);
}


// 중복 검사후 생성
const fnGenerateWithoutRedundancy = () => {
    let nftTobe = [];
    
    nftTobe.push(fnCheckRareTrait(face[fnRng(NUM_OF_FACES)].id));
    nftTobe.push(body[fnRng(NUM_OF_BODY)].id);
    nftTobe.push(background[fnRng(NUM_OF_BACKGROUND)].id);
    
    if (NFTs.length > 0) {
        for (let i=0; i<NFTs.length; i++) {
            if (JSON.stringify(NFTs[i]) === JSON.stringify(nftTobe)) {
                return  null;
            }
        }
    }
    return nftTobe;
}

// 특정 trait 를 가진 토큰이 일정수량을 넘지 못하도록 조절
const fnCheckRareTrait = (t) => {
    if (NFTs.length > 0 && t === RARE_TRAIT) {
        totalCountOfRareTrait++;
        if (totalCountOfRareTrait > MAX_NUM_OF_RARITY) {
            totalCountOfRareTrait--;
            return fnCheckRareTrait(face[fnRng(NUM_OF_FACES)].id);
        }
        return t;
    } else {
        return t;
    }
}

while (NFTs.length < TARGET_NUM_OF_NFT) {
    const n = fnGenerateWithoutRedundancy();
    if (n !== null) {
        NFTs.push(n);
        //if (n[0] === 77) console.log(`RARITY=${NFTs.length}`);
    }
}

console.log(`TOTAL_NUM_OF_NFT = ${NFTs.length}`);
console.log(`TOTAL_NUM_OF_RARITY = ${totalCountOfRareTrait}`);


(async () => {
    console.log("Creating...");
    //for (let i=0; i<NFTs.length; i++) {
    for (let i=0; i<10; i++) {
        await create(NFTs[i], i);
    }
})();
