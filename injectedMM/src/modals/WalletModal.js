import React, { useContext } from "react";
import {Box, Button, Modal} from "@mui/material";
import { InjectedConnector, UserRejectedRequestError as UserRejectedRequestErrorMM} from "@web3-react/injected-connector";

import { Context } from "../App";
import { metamask }from "../images/logo";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    backgroundColor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

const injectedWeb3Connector = new InjectedConnector({ supportedChainIds: [1,4] });

function WalletModal(props) {
    
    const setConnector = useContext(Context).setConnector;
    
    const handleConnectMM = async () => {
        
        try {
            
            await injectedWeb3Connector.activate();

            if ((await injectedWeb3Connector.getChainId()) !== "0x4") {
                const p = await injectedWeb3Connector.getProvider();
                await p.send("wallet_switchEthereumChain", [{chainId: '0x4'} ]);
            }
            setConnector(injectedWeb3Connector);
            
        } catch (err) {
        
            if (err instanceof UserRejectedRequestErrorMM) {
                console.log("UserRejectedRequest...");
                props.close();
            }
        }
    }


    return (
        <Modal open={props.open} onClose={props.close}>
            <Box sx={style}>
                <Button variant="outlined" size="large" onClick={handleConnectMM} startIcon={metamask}>
                    metamask
                </Button>

            </Box>
        </Modal>
    );
}

export default WalletModal;
