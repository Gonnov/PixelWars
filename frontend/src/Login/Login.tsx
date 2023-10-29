import { useEffect } from "react";
import makeTokenExchange from "./makeTokenExchange/makeTokenExchange";
import { LoginPopUp } from "./LoginPopUp/LoginPopUp";
import { useCookies } from "react-cookie";
import axios from "axios";
import { LoginDataStoreInterface, loginDataStore } from "../main";
export const NOT_LOGIN = -1;

export function getDataWithCookies(
    accessToken: string,
    setLoginData: React.Dispatch<any>,
    setCookie: any
) {
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
            console.error("Error fetching data:", error);
            setCookie("access_token", "", { path: "/" });
            makeTokenExchange(setLoginData, setCookie);
        });
}

function Login(): JSX.Element {
    const { loginData, setLoginData } =
        loginDataStore() as LoginDataStoreInterface;
    const [cookies, setCookie] = useCookies(["access_token"]);
    useEffect(() => {
        if (cookies.access_token) {
            getDataWithCookies(cookies.access_token, setLoginData, setCookie);
        } else {
            makeTokenExchange(setLoginData, setCookie);
        }
    }, [cookies]);
    if (loginData === NOT_LOGIN) return <LoginPopUp />;
    return <></>;
}

export default Login;
