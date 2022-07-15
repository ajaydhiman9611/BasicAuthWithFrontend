import axios from 'axios'
import constants from '../../constants'
import Cookies from 'universal-cookie'

let cookies = new Cookies();
let callLoginAPI = async function(input) {
 try{
    let {data} = await axios.post(`${constants.API_ENDPOINT}/accounts/login`, input)
    console.log("Data in Login API : ", data);
    cookies.set("at", data.data.at, {path: "/", domain: "localhost"})
    cookies.set("aid", data.data.aid, {path: "/", domain: "localhost"})
    return data; 
 } catch(err){
    console.log("Error in Login API! ", err)
    return {success: false, message: err.message}
 }
}

let callGetUserAPI = async function(){
    try{
        let {data} = await axios.get(`${constants.API_ENDPOINT}/accounts/gt_usr`)
        console.log("Data in Get User API : ", data);
        return data;
    } catch(err){
        console.log("Error in Get User API! ", err)
        return {success: false, message: err.message}
    }
}

export {callLoginAPI, callGetUserAPI}