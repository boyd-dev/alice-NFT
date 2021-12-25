import data from "./meta.href.txt";

// 메타정보의 위치를 파일에서 읽어서 IPFS에 요청하여 가져온다.
// 시간 지연이 발생할 수 있다.
const getMetadata = (index) => {
    
    return new Promise((resolve, reject) => {
        
        fetch(data)
            .then(r => r.text())
            .then(text => {
                const regexp = new RegExp("(\r?\n)?" + index + "=(.*)\/metadata\.json", "g");
                const result = text.toString().match(regexp);
            
                if (result != null) {
                    fetch(result[0].slice(result[0].indexOf("=")+1))
                        .then(res => res.json())
                        .then(data => {
                            //console.log(data.image);
                            resolve({"image": data.image.toString().replaceAll("ipfs://", "https://dweb.link/ipfs/"),
                                     "attributes": data.attributes});
                        });
                    
                } else {
                    reject("Failed to fetch metadata from uri");
                }
            });
    })
    
}

// 토큰 발행할때 메타정보 위치를 파일에서 읽어서 리턴한다.
const getTokenURI = (index) => {
    
    return new Promise((resolve, reject) => {
        
        fetch(data)
            .then(r => r.text())
            .then(text => {
                const regexp = new RegExp("(\r?\n)?" + index + "=(.*)\/metadata\.json", "g");
                const result = text.toString().match(regexp);
                
                if (result != null) {
                    resolve(result[0].slice(result[0].indexOf("=")+1));
                    
                } else {
                    reject("Failed to fetch TokenURI");
                }
            });
    })
}

// 이미 발행한 토큰의 정보를 localStorage에 저장한다.
const saveMintedItems = (tokenId) => {
    
    const previousMinted = localStorage.getItem("ALS.minted");
    
    if (previousMinted === null) {
        localStorage.setItem("ALS.minted", tokenId);
    } else {
        const mintedArray = previousMinted.toString().split(",");
        if (mintedArray.indexOf(tokenId.toString()) < 0) {
            localStorage.setItem("ALS.minted", previousMinted + "," + tokenId);
        }
    }
    console.log(`Saved ${tokenId}`);
}

// localStorage에 저장된 정보를 바탕으로 발행여부를 확인한다.
const isMintedItems = (tokenId) => {
    
    const previousMinted = localStorage.getItem("ALS.minted");
    let result = false;
    if (previousMinted !== null) {
        const mintedArray = previousMinted.split(",");
        if (mintedArray.indexOf(tokenId.toString()) >= 0) {
            result = true;
        }
    }
    return result;
}

export {
    getMetadata,
    getTokenURI,
    saveMintedItems,
    isMintedItems
}
