import React, {useEffect, useState} from 'react';

import {getMetadata} from "../utils";
import {CardActionArea, CardContent, CardMedia} from "@mui/material";

function Metadata(props) {
    
    const [image, setImage] = useState("");
    const [attributes, setAttributes] = useState("");
    
    useEffect(() => {
    
        getMetadata(props.id).then(v => {
            setImage(v.image);
            if (v.attributes instanceof Array) {
                setAttributes(v.attributes.map((o,k)=> (<p key={k}>{o.trait_type}: {o.value}</p>)));
            }
        });
        
    }, []);
    
    
    return (
        <CardActionArea>
            <CardMedia component="img" image={image}/>
            <CardContent>
                Token ID: {props.id}
                <br/>
                {attributes}
            </CardContent>
        </CardActionArea>
    );
}

export default Metadata;
