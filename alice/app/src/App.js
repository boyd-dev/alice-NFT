import React, {Fragment, useState, createContext, useEffect} from "react";
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { ethers } from "ethers";
import WalletModal from "./modals/WalletModal";
import {isEmpty} from "lodash";

import artifact from "./contracts/ALSnft.json";

import { RPC_ENDPOINT_RINKEBY_ALCHEMY } from "./utils/constants";
import AlsList from "./list/AlsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Context = createContext();
const Provider = Context.Provider;


function App() {
    
    const CONNECT_TEXT = "connect wallet";
    const DISCONNECT_TEXT = "disconnect";
    
    const [open, setOpen] = useState(false);
    const [web3, setWeb3] = useState({});
    
    const [account, setAccount] = useState("0x");
    const [balance, setBalance] = useState("0");
    const [btnText, setBtnText] = useState(CONNECT_TEXT);
    
    const [alsNft, setAlsNft] = useState(null);
    
    const defaultProvider = ethers.getDefaultProvider(RPC_ENDPOINT_RINKEBY_ALCHEMY);
    
    const handleOpen = async () => {
        if (btnText === DISCONNECT_TEXT) {
            setWeb3(null);
            setBalance(0);
            setAccount("0x");
            setBtnText(CONNECT_TEXT);
            setAlsNft(null);

            window.location.href = "/";
            
        } else {
            setOpen(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        
        if (!isEmpty(web3)) {

            web3.getSigner(0).getAddress().then(v=>setAccount(v));
            web3.getSigner(0).getBalance().then(v=>setBalance(parseFloat(ethers.utils.formatEther(v)).toFixed(3)));

            const als = new ethers.Contract(artifact.contracts.ALSnft.address,
                                            artifact.contracts.ALSnft.abi,
                                            web3.getSigner());
            
            setAlsNft(als);
            setOpen(false);
            setBtnText(DISCONNECT_TEXT);
        }
        
    }, [web3]);
    
    
    return (
        
        <Fragment>
            <Provider value={{setWeb3, alsNft, defaultProvider}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Alice Loves Sea NFT
                        </Typography>
                        <Box sx={{paddingRight: "20px"}}>
                            <Typography sx={{fontSize: "medium"}}>
                                {account}
                            </Typography>
                        </Box>
                        <Box sx={{paddingRight: "20px"}}>
                            <Typography sx={{fontSize: "medium"}}>
                                Balance Ξ<b>{balance}</b>
                            </Typography>
                        </Box>
                        <Button color="info" variant="contained" onClick={handleOpen}>{btnText}</Button>
                    </Toolbar>
                </AppBar>
                
    
                <Box sx={{paddingLeft: "20px", paddingTop: "20px"}}>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route path=":pageNo" element={<AlsList />} />
                                <Route path="" element={<AlsList />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    
                </Box>
                <WalletModal open={open} close={handleClose}/>
            </Provider>
        </Fragment>
    
    );
}

export default App;


export {
    Context
}
