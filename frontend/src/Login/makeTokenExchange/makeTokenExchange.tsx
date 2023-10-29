import React from "react";
import axios from "axios";
import { NOT_LOGIN } from "../Login";
import Cookies from "js-cookie";

function getData(accessToken: string, setLoginData: React.Dispatch<any>) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    axios
        .get("https://api.intra.42.fr/v2/me", config)
        .then((response) => {
            setLoginData(response.data);
        })
        .catch((error) => {
            setLoginData(NOT_LOGIN);
            console.log("FETCH DATA ERROR", error);
        });
}

function makeAuthentificationCodeRequest(
    csrfToken: any,
    authorizationCode: string | null,
    setLoginData: React.Dispatch<any>,
    setCookie: any
) {
    Cookies.set("csrftoken", csrfToken);
    axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

    axios
        .post("http://127.0.0.1:8000/authentification/get-auth-token", {
            code: authorizationCode,
            withCredentials: true,
        })
        .then((response) => {
            console.log(response);
            setCookie("access_token", response.data.access_token, {
                path: "/",
            });
            getData(response.data.access_token, setLoginData);
        })
        .catch((error) => {
            setLoginData(NOT_LOGIN);
            console.log("error with the authorization code", error);
        });
}

function makeTokenExchange(setLoginData: React.Dispatch<any>, setCookie: any) {
    const url = new URLSearchParams(window.location.search);
    let authorizationCode = url.get("code");
    if (authorizationCode == null) {
        setLoginData(NOT_LOGIN);
        return false;
    }
    axios
        .get("http://127.0.0.1:8000/authentification/get-csrf-token")
        .then((response) => {
            const csrfToken = response.data.csrfToken;
            makeAuthentificationCodeRequest(
                csrfToken,
                authorizationCode,
                setLoginData,
                setCookie
            );
        })
        .catch((error) => {
            console.log("get csrf token error", error);
        });
}

export default makeTokenExchange;
