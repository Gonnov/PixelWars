import { PixelObject } from "../SetUpBoard/SetUpBoard";
import axios from "axios";

function putRequest(newPixelArray: string[][], PixelObject: PixelObject) {
    const payload = JSON.stringify({
        pixelArray: newPixelArray,
    });
    PixelObject.socket.send(payload);
}

function setTimer(user: string) {
    axios
        .get("http://localhost:8000/timer/start_timer/", {
            params: {
                user: user,
            },
        })
        .catch((error) => {
            console.error(error);
        });
}

function changeColor(PixelObject: PixelObject) {
    if (PixelObject.isCooldown === true) return;
    let newPixelArray = [...PixelObject.pixelArray];
    if (PixelObject.columnNumber !== undefined) {
        newPixelArray[PixelObject.lineNumber][PixelObject.columnNumber] =
            PixelObject.colorPut;
    }
    setTimer(PixelObject.loginData.login);
    putRequest(newPixelArray, PixelObject);
    PixelObject.setIsCooldown(true);
}

export default changeColor;
