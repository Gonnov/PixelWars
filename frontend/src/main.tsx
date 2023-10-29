import ReactDOM from "react-dom/client";
import "../build/style.css";
import Game from "./Game/Game";
import Login from "./Login/Login";
import { CookiesProvider } from "react-cookie";
import { NOT_LOGIN } from "./Login/Login";
import { create } from "zustand";
import AnimatedBackground from "./Background/AnimatedBackground/AnimatedBackground";
import BackgroundImage from "./Background/BackgroundImage/BackgroundImage";
export type LoginProps = {
    loginData: any;
    setLoginData: React.Dispatch<any>;
};

export const loginDataStore = create((set) => ({
    loginData: null as any,
    setLoginData: (newLoginData: any) => set({ loginData: newLoginData }),
}));

export interface LoginDataStoreInterface {
    loginData: any;
    setLoginData: (value: any) => void;
}

function Application(): JSX.Element {
    const { loginData } = loginDataStore() as LoginDataStoreInterface;
    return (
        <CookiesProvider>
            {loginData && loginData == NOT_LOGIN ? (
                <AnimatedBackground />
            ) : (
                <BackgroundImage />
            )}
            <Login />
            {loginData && loginData != NOT_LOGIN ? <Game /> : <></>}
        </CookiesProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <Application />
    </>
);
