import DisplayBoard from "../DisplayBoard/DisplayBoard";
import getBackendBoard from "./getBackendBoard";
import { isCooldownStore } from "../../Game";
import { colorStore } from "../../Game";
import {
    CooldownStoreInterface,
    ColorStoreInterface,
} from "../SetUpBoard/storeInterface";
import { loginDataStore, LoginDataStoreInterface } from "../../../main";
//import { resetArray } from "../../resetArray/resetArray";

export type PixelObject = {
    lineNumber: number;
    columnNumber?: number;
    PixelColor?: string;
    pixelArray: string[][];
    socket: WebSocket;
    isCooldown: boolean;
    setIsCooldown: (value: boolean) => void;
    colorPut: string;
    loginData: any;
};

function socketCloseError(socket: WebSocket) {
    socket.onerror = function (event) {
        console.error("WebSocket Error:", event);
    };
    socket.onclose = function (event) {
        console.log(
            `WebSocket closed. Code: ${event.code}, Reason: ${event.reason}`
        );
    };
}

function SetUpBoard() {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/pixels/0/`);
    //resetArray(socket); // ONLY UNCOMMENT TO RESET THE PIXEL ARRAY TO WHITE
    const pixelArray: string[][] = getBackendBoard(socket);
    socketCloseError(socket);
    const { isCooldown, setIsCooldown } =
        isCooldownStore() as CooldownStoreInterface;
    const { colorPut } = colorStore() as ColorStoreInterface;
    const { loginData } = loginDataStore() as LoginDataStoreInterface;
    return (
        <>
            {pixelArray.map((dataLine, lineNumber) => {
                let PixelObject: PixelObject = {
                    lineNumber: lineNumber,
                    pixelArray: pixelArray,
                    socket: socket,
                    isCooldown: isCooldown,
                    setIsCooldown: setIsCooldown,
                    colorPut: colorPut,
                    loginData: loginData,
                };
                return (
                    <ul key={lineNumber}>
                        {DisplayBoard(PixelObject, dataLine)}
                    </ul>
                );
            })}
        </>
    );
}

export default SetUpBoard;
