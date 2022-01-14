## Simple NFT 프로젝트(예제)

* Rinkeby 이더  
  [https://www.rinkebyfaucet.com/](https://www.rinkebyfaucet.com/)

* API 키와 계정 및 소스파일 수정해야 하는 부분  
  - hardhat-config.js  
    `const keys = []` 배포 계정의 개인 키(⚠️유출되지 않도록 주의)  
    `networks: {rinkeby: {url: ...` Rinkeby 테스트넷에 연결할 수 있는 알케미 RPC-endpoint  
    `namedAccounts: {deployer: {rinkeby: ...` Rinkeby 배포 계정  
    `etherscan: { apiKey: ...` 이더스캔 API 키
  - `src/utils/constants.js`  
    알케미 RPC-endpoint  
    `OWNER` Rinkeby 배포 계정(토큰 발행 계정)
  

* 실행방법 
  1. 패키지를 설치합니다.  
     ```
     yarn install
     ```
  2. 컨트랙트 컴파일과 배포(Rinkeby 테스트넷) 
     `hardhat-config.js`에서 `solidity: "0.8.4"`로 되어 있는지 확인합니다(컴파일러 버전 0.8.0 이상).  
      - 컴파일을 수행합니다.
        ```
        npx hardhat compile
        ```
     - 배포를 수행합니다. 
      `hardhat-config.js`에서 `keys`에 Rinkeby 배포 계정의 개인키를 넣습니다. 그리고 `namedAccounts`의 `rinkeby` 항목에 
       배포 계정 주소를 넣습니다. 다음 배포 태스크를 실행합니다.
       ```
       npx hardhat deploy --network rinkeby
       ```
       ABI 파일을 복사합니다. 먼저 `src/contracts` 디렉토리를 만들고 다음 명령어를 실행하면 됩니다. 
       ```
       npx hardhat deploy --export .\app\src\contracts\ALSnft.json --network rinkeby 
       ```      
  3. 애플리케이션 실행  
     - app 디렉토리로 이동하여 패키지를 설치합니다.
       ```
       yarn install
       ```
     - 메타정보 파일 `meta.href.txt`을 `utils` 디렉토리로 복사합니다. 
     
     - 개발 서버를 실행합니다.
       ```
       yarn start
       ```
       크롬 브라우저로 localhost:3000에 접속합니다.
  4. 메타마스크 연결하기  
     Rinkeby 테스트넷으로 네트워크를 변경하여 Dapp에 접속합니다. 테스트넷이 보이지 않는 경우는 메타마스크의 설정으로 들어가서 "고급"에서 
     "Show test networks"를 켜면 됩니다.