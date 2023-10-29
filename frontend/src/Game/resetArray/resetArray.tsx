import { useEffect } from "react";

function firstCreateDBArray(): string[][] {
    let pixelArray: string[][] = [];
    for (let i = 0; i < 40; i++) {
        pixelArray[i] = [];
        for (let y = 0; y < 20; y++) {
            pixelArray[i][y] = "bg-white";
        }
    }
    return pixelArray;
}

export function resetArray(socket: WebSocket) {
    useEffect(() => {
        socket.onopen = function () {
            let pixelArray = firstCreateDBArray();
            const payload = JSON.stringify({
                pixelArray: pixelArray,
            });
            socket.send(payload);
        };
    }, []);
}
