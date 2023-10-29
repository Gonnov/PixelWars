import { useState, useEffect } from "react";

function getBackendBoard(socket: WebSocket): string[][] {
    const [pixelArray, setPixelArray] = useState([]);

    useEffect(() => {
        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            setPixelArray(data.pixelArray);
        };
    }, []);

    return pixelArray;
}

export default getBackendBoard;
