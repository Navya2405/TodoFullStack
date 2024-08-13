import axios from "axios";
const baseURL ="http://localhost:5900/"


export async function ApiCall(apiRoute, requestObject = {},method) {
    const reqURL = baseURL + apiRoute;
    let responseObj = {};
    requestObject.token=""
    let SessionObj = JSON.parse(sessionStorage.getItem("SessionObj"));
    if (SessionObj !==null) {
        if (SessionObj.token !== "") {
            requestObject.token=SessionObj.token
        }
    }
    try {
        responseObj = await axios[method](reqURL, requestObject,).then(resp => {
            if (resp.data.hasOwnProperty("sessionExpire")){
                if (resp.data.sessionExpire){
                    sessionStorage.setItem("SessionObj", JSON.stringify({token:""}))
                    window.location.href="/Login"
                }
            }else{
                return resp.data;
            }
        });
    }catch (e) {
        console.log("error",e)
    }


    return responseObj;
}