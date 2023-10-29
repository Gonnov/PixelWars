import { useState, useEffect } from "react";
import { CooldownStoreInterface } from "../SetUpAndDisplayBoard/SetUpBoard/storeInterface";
import { isCooldownStore } from "../Game";
import { LoginDataStoreInterface, loginDataStore } from "../../main";
import axios from "axios";

type TimerState = {
    isCooldown: boolean;
    setIsCooldown: (value: boolean) => void;
    loginData: any;
    second: number;
    setSecond: React.Dispatch<React.SetStateAction<number>>;
};

function constructTimerState(): TimerState {
    const { isCooldown, setIsCooldown } =
        isCooldownStore() as CooldownStoreInterface;
    const { loginData } = loginDataStore() as LoginDataStoreInterface;
    const [second, setSecond] = useState(0);

    const timerState: TimerState = {
        isCooldown: isCooldown,
        setIsCooldown: setIsCooldown,
        loginData: loginData,
        second: second,
        setSecond: setSecond,
    };
    return timerState;
}

function convertSecondToMinute(time: number): string {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    let fulltime: string = minute.toString() + ":" + second.toString();
    return fulltime;
}

function getTimer(timerState: TimerState): void {
    axios
        .get("http://localhost:8000/timer/timer_status/", {
            params: {
                user: timerState.loginData.login,
            },
        })
        .then((response) => {
            timerState.setSecond(response.data.time_left);
            if (response.data.time_left > 0) {
                timerState.setIsCooldown(true);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function timerDecrementaion(timerState: TimerState) {
    if (timerState.isCooldown === false) return;
    const id = setTimeout(() => {
        if (timerState.second === 1 && timerState.isCooldown === true) {
            timerState.setIsCooldown(false);
            timerState.setSecond(0);
            return;
        } else if (timerState.second > 1) {
            timerState.setSecond((second) => {
                second -= 1;
                return second;
            });
            return;
        }
    }, 1000);
    return () => {
        clearTimeout(id);
    };
}

function DisplayTimer(): JSX.Element {
    const timerState = constructTimerState();
    useEffect(() => {
        getTimer(timerState);
        // console.log(timerState.second);
    }, [timerState.isCooldown]);
    useEffect(() => {
        if (timerState.isCooldown === true) {
            // console.log("timer decr", timerState.second);
            timerDecrementaion(timerState);
        }
    }, [timerState.second]);
    if (timerState.isCooldown === false)
        return (
            <div className="flex justify-center text-amber-100 bg-zinc-900">
                You can put a pixel
            </div>
        );
    return (
        <div className="flex justify-center text-amber-100 bg-zinc-900">{`${convertSecondToMinute(
            timerState.second
        )}`}</div>
    );
}

export default DisplayTimer;
