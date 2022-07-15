import React, { useEffect } from "react";
import {callGetUserAPI} from "../controllers/apis/auth"

export default function Dashboard(){
    useEffect(() => {
        
        callGetUserAPI()
        .then(data=>{
            console.log("Data :::::: ",data)
        })
    },[])
    return(
        <h1>You are logged in. Congratulations!</h1>
    )
}