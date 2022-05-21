## 메타마스크 지갑 연결 예제

`@web3-react/injected-connector`를 사용하여 웹브라우저에서 메타마스크를 연결하는 예제입니다.

* 실행방법  
  ```
  yarn install  
  ```
  수정할 부분  
  `src/utils/constants.js` JSON-RPC 설정 변경(이 예제에서는 사용되지 않지만 이벤트 구독 등의 용도로 나중에 필요)  
   ```
   yarn start
   ```  
  
* 메타마스크 연결
  우측 상단 CONNECT 버튼을 클릭하면 모달 팝업이 호출됩니다. 모달 팝업에서 메타마스크 연결 버튼을 클릭한 후 지갑을 열고 애플리케이션에 연결합니다.
  이미 지갑이 열려 있고 한번이라도 애플리케이션에 연결되어 있다면 자동으로 연결됩니다.  


* 네트워크가 Rinkeby가 아니라면 사용자에게 네트워크 변경을 요청합니다. [메타마스크 API 문서](https://docs.metamask.io/guide/rpc-api.html) 를 참고하세요. 
  ```
  if ((await injectedWeb3Connector.getChainId()) !== "0x4") {
        const p = await injectedWeb3Connector.getProvider();
        await p.send("wallet_switchEthereumChain", [{chainId: '0x4'} ]);
  }
  ```  
  
* 연결 종료  
  애플리케이션에서 지갑 연결을 종료하는 경우는 다음 두 가지 경우가 있습니다.   

  1. 메타마스크에서 지갑 연결 닫기
  2. 애플리케이션에 있는 DISCONNECT 버튼을 클릭하기     

  메타마스크에서 지갑을 닫는 경우는 메타마스크의 `accountChanged` 이벤트로 처리 가능합니다. 지갑이 닫히는 경우 리턴되는 계정이 없기 때문에 `@web3-react/injected-connector`에서는 
  `Web3ReactDeactivate` 이벤트가 발생합니다. 
  ```
  connector.on("Web3ReactDeactivate", deactivated);
  ```
  애플리케이션에 DISCONNECT 버튼을 클릭하는 것은 애플리케이션 레벨에서 연결 상태(계정, 계정 잔액, 컨트랙트 인스턴스 등)를 초기화하는 것입니다. 
  연결된 메타마스크의 지갑을 닫을 수는 없습니다.  


* 웹브라우저의 "새로고침(F5) 후에도 지갑 연결을 유지하기   
  프론트엔드 애플리케이션은 "새로고침"을 하면 서버에서 페이지를 다시 다운로드하기 때문에 모든 상태들이 초기화됩니다. 메타마스크의 
  계정과 계정 잔액에 대한 정보 역시 초기화되므로 사용자가 다시 연결해야 하는 불편함이 있습니다. 그래서 지갑이 열려있고 사용자가 연결을 
  종료하지 않은 경우 자동으로 지갑을 재연결해서 계정과 계정 잔액을 가져오도록 합니다.  
 
  이를 위해서 localStorage에 사용자의 연결종료 여부를 저장하고 이 정보를 바탕으로 새로고침에 의한 초기화인지 아니면 
  사용자의 애플리케이션 종료인지 구별합니다.
  ```
  if (!JSON.parse(localStorage.getItem("ALS.isOff"))) {
         const injectedConnector = new InjectedConnector({ supportedChainIds: [1,4] });

         injectedConnector.isAuthorized().then((isUnlocked) => {
               if (isUnlocked) {
                     injectedConnector.activate().then(() => {
                          setConnector(injectedConnector);  
                     });
               }
         });
  }
  ```  
  
* 메타마스크 계정 변경 또는 네트워크 변경
  메타마스크에서 계정이나 네트워크를 바꾸는 경우 애플리케이션에서 이벤트로 받을 수 있습니다. 
  `@web3-react/injected-connector`에서는 `Web3ReactUpdate`라는 이벤트로 두 경우를 받을 수 있습니다. 이벤트 콜백으로 전달되는 
  값이 다르기 때문에 두 이벤트를 구별할 수 있습니다.  


  