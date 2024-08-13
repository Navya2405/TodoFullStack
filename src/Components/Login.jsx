import React, {useReducer} from 'react';
import {ApiCall} from "../helper/util";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            loginObj: {
                email: "",
                password: "",
            },
            error: false,
            InvalidEmailError: false,
        }
    )
    const handleChangeInput = (e, name) => {
        let loginObj = state.loginObj
        loginObj[name] = e.target.value
        setState({loginObj})
    }
    const handleSubmit = async () => {
        const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(state.loginObj.email);
        if (isEmail) {
            let resp = await ApiCall("userLogin", state.loginObj,"post")
            console.log("userLogin==>",resp)
            if (resp.status==="success"){
                sessionStorage.setItem("SessionObj", JSON.stringify(resp))
                navigate("/")
            }else{
                setState({error: true})
            }
        } else {
            setState({InvalidEmailError: true})
        }
    }
    return (
        <div>
            <div className="login">
                <h2>To-Do</h2>
                <p>Create, Update, Delete, Read</p>
                <input  autoComplete="nope" onChange={(e)=>handleChangeInput(e,"email")} value={state.loginObj.email} type="text" placeholder=""/>
                <input autoComplete="nope" onChange={(e)=>handleChangeInput(e,"password")} value={state.loginObj.password} type="password" placeholder=""/>
                {state.InvalidEmailError&& <p className="clrRed">Invalid email!</p>}
                <input type="button" className="loginbtn" onClick={handleSubmit} value="Log In"/>
                {state.error&& <p className="clrRed">Invalid Credentials!</p>}
            </div>
        </div>
    );
};

export default Login;