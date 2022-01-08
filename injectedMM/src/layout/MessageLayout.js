import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

const MessageLayer = styled.div`
  margin-top: 70px;
  height: 80px;
  width: ${props => props.width || '0px'};
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: lightblue;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: hidden;
  padding-top: 12px;
  padding-left: 0px;
  padding-right: 0px;
  transition: 0.3s;
`;


const MessageLayout = (props) => {
    
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setShow(props.flag);
    }, [props.flag]);
    
    return (
        <MessageLayer width={show?`${320}px`:"0px"}>
            <Box>
                {props.children}
            </Box>
        </MessageLayer>
    )
}

export default MessageLayout;
