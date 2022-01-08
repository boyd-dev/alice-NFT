import React, { useState, createContext, useEffect, useReducer } from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { InjectedConnector, UserRejectedRequestError} from "@web3-react/injected-connector";

import { ethers } from "ethers";
import WalletModal from "./modals/WalletModal";
import { isEmpty, has } from "lodash";
import artifact from "./contracts/ALSnft.json";

import { RPC_ENDPOINT_RINKEBY_ALCHEMY } from "./utils/constants";
import MessageLayout from "./layout/MessageLayout";

const Context = createContext();
const Provider = Context.Provider;


function App() {

    const defaultProvider = ethers.getDefaultProvider(RPC_ENDPOINT_RINKEBY_ALCHEMY);

    const CONNECT_TEXT = "connect wallet";
    const DISCONNECT_TEXT = "disconnect";
    
    const [open, setOpen] = useState(false);
    const [connector, setConnector] = useState({});
    const [flag, setFlag] = useState(false);
    const [msg, setMsg] = useState("");

    const initialState = {account: "0x",
                          balance: "0",
                          contract: null,
                          btnText: CONNECT_TEXT,
                          provider: null};

    const reducer = (state, action) => {
        console.log(`ACTION=${action.type}`);
        switch (action.type) {
            case "CONNECTED" :
                return {
                    ...state,
                    account: action.payload.account,
                    balance: action.payload.balance,
                    contract: action.payload.contract,
                    btnText: action.payload.btnText,
                    provider: action.payload.provider
                };
            case "DISCONNECTED" :
                return {
                    ...state,
                    ...initialState
                };
            case "BALANCE" :
                return {
                    ...state,
                    balance: action.payload
                }
            default :
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleOpen = async () => {

        if (state.btnText === DISCONNECT_TEXT) { // 지갑 연결 종료

            // refresh 의 경우는 지갑이 아직 열린 상태라면 자동으로 다시 연결한다.
            // refresh 와 연결 종료를 구별할 수 없어서 localStorage 에 플래그를 저장해둔다.
            // ALS.isOff = false 연결 중
            // ALS.isOff = true 연결 종
            localStorage.setItem("ALS.isOff", "true");
            dispatch({type: 'DISCONNECTED', payload: null});

            window.location.href = "/";
            
        } else { // 지갑 연결
            setOpen(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
    }

    const setWeb3 = async (connector) => {
         const p = await connector.getProvider();
         const provider = new ethers.providers.Web3Provider(p);
         const account = await provider.getSigner(0).getAddress();
         let balance = await provider.getSigner(0).getBalance();
         balance = parseFloat(ethers.utils.formatEther(balance)).toFixed(3);

         const als = new ethers.Contract(artifact.contracts.ALSnft.address,
                artifact.contracts.ALSnft.abi,
                provider.getSigner(0));

         return {account, balance, contract: als, btnText: DISCONNECT_TEXT, provider}
    }

    useEffect(() => {

        if (!isEmpty(connector)) {
            //console.log("Connector is ready!");
            console.log(connector);

            // 연결하면 false
            localStorage.setItem("ALS.isOff", "false");

            setWeb3(connector).then(result => {
                dispatch({type: 'CONNECTED', payload: result});
            });

            setOpen(false);

            // 이벤트 등록
            connector.on("Web3ReactUpdate", handleEvents);
            connector.on("Web3ReactDeactivate", deactivated);

        } else {

            // 사용자가 직접 MM 의 연결을 종료하지 않은 경우에는 다시 연결한다.
            if (!JSON.parse(localStorage.getItem("ALS.isOff"))) {
                const injectedConnector = new InjectedConnector({ supportedChainIds: [1,4] });

                injectedConnector.isAuthorized().then((isUnlocked) => {
                    console.log(`User locked the wallet ${isUnlocked}`);
                    if (isUnlocked) {
                        injectedConnector.activate().then(() => {
                            setConnector(injectedConnector);
                        });
                    }
                });
            }
        }

    }, [connector]);

    const handleEvents = (v) => {
        console.log(v);
        if (has(v, "chainId")) {
            console.log(`Changed the network to ${v.chainId}`);
            if (v.chainId !== '4') {
                setFlag(true);
                setMsg("Please change the network to Rinkeby!");
            } else {
                setFlag(false);
            }
        }

        if (has(v, "account")) {
            //console.log("Changed the account");
            setWeb3(connector).then(result => {
                dispatch({type: 'CONNECTED', payload: result});
            });
        }
    }

    const deactivated = async () => {
        localStorage.setItem("ALS.isOff", "true");
        dispatch({type: 'DISCONNECTED', payload: null});
        //window.location.href = "/";
    }

    useEffect(() => {
        if (state.account !== '0x') {
            setInterval(async () => {
                const b = await state.provider.getSigner(0).getBalance();
                dispatch({type: 'BALANCE', payload: parseFloat(ethers.utils.formatEther(b)).toFixed(3)});
            }, 3000);
        }
    }, [state.account]);


    return (
        
        <>
            <Provider value={{setConnector, defaultProvider}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Alice Loves Sea NFT
                        </Typography>
                        <Box sx={{paddingRight: "20px"}}>
                            <Typography sx={{fontSize: "medium"}}>
                                {state.account}
                            </Typography>
                        </Box>
                        <Box sx={{paddingRight: "20px"}}>
                            <Typography sx={{fontSize: "medium"}}>
                                Balance Ξ<b>{state.balance}</b>
                            </Typography>
                        </Box>
                        <Button color="info" variant="contained" onClick={handleOpen}>{state.btnText}</Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{paddingLeft: "20px", paddingTop: "20px"}}>
                    {/* Something to do */}
                </Box>
                <WalletModal open={open} close={handleClose}/>
                <MessageLayout flag={flag}>
                    <div style={{marginLeft: "16px", whiteSpace: "nowrap", overflow: "hidden"}}>
                        {msg}
                    </div>
                </MessageLayout>
            </Provider>
        </>
    );
}

export default App;

export {
    Context
}
