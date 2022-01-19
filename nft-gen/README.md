## NFT 이미지 생성과 메타정보 업로드

속성 이미지들을 조합하여 하나의 이미지를 생성합니다. 각 속성 이미지들은 `images` 디렉토리에 있습니다. 이미지는 500x500 픽셀의 PNG 파일입니다. 
이미지는 포토샵에서 쉽게 만들 수 있습니다(배경을 "Transparent"로 설정).

* images/Face
* images/Body
* images/Background
  
완성 이미지가 저장되는 곳은 `images/_Final`입니다. `_Final` 폴더를 미리 만드세요.

* 실행방법    
  ```
  node index
  ```
  속성 이미지 3개를 조합하여 최종 이미지를 생성하고 IPFS에 업로드한 후 메타정보를 `meta.txt` 파일로 저장합니다. 아래 파일들은 
  `index.js`에서 사용하는 파일들입니다.  


* trait.js  
  각 속성 이미지들의 이름이 저장되어 있습니다. 예를 들어 face는 100개인데 `id`가 1번 부터 100번까지 부여되고 
  각 속성은 `name`을 가지고 있습니다. 예를 들어 다음과 같은 형식입니다.
  ```
  const face = [
     {id: 1, name: 'one'}
    ,{id: 2, name: 'two'}
    ,{id: 3, name: 'three'}
    ,{id: 4, name: 'four'}
    ...
    ,{id: 100, name: 'onezerozero'}
  ```

* create.js  
  이미지 조합 하나를 받아서 canvas 라이브러리를 이용하여 최종 이미지를 만들고 IPFS에 업로드한 후 메타정보 URI를 파일에 기록합니다.
  IPFS에 업로드하려면 [NFT Storage](https://nft.storage)에서 API 키를 발급받아서 `apiKey`에 넣으면 됩니다.  


* file.js  
  각 토큰의 메타정보 URI를 파일로 저장할 때 사용하는 함수들이 작성되어 있습니다.  


* convertMeta.js  
  생성된 메타정보 URI 파일 `meta.txt`을 읽어서 `ipfs://bafy...5ysiy/metadata.json` 형식을 `https://dweb.link/ipfs/bafy...5ysiy/metadata.json` 형식으로 변환하여 새로운 파일 `meta.href.txt`에 저장합니다.
  `node convertMeta`로 실행하면 됩니다.
