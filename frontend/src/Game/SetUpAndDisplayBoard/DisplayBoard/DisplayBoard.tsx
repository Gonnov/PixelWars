import changeColor from "./changeColor";
import { PixelObject } from "../SetUpBoard/SetUpBoard";

function DisplayPixel(PixelObject: PixelObject): JSX.Element {
    let hoverColor: string = "hover:".concat(PixelObject.colorPut);
    return (
        <div
            onClick={() => changeColor(PixelObject)}
            className={`${PixelObject.PixelColor} h-4 w-4 ${hoverColor}`}
        ></div>
    );
}

function DisplayBoard(
    PixelObject: PixelObject,
    dataLine: string[]
): JSX.Element {
    return (
        <ul className=" flex">
            {dataLine.map((PixelColor, columnNumber) => {
                let NewPixelObject = { ...PixelObject };
                NewPixelObject.PixelColor = PixelColor;
                NewPixelObject.columnNumber = columnNumber;

                return (
                    <li key={`${PixelObject.lineNumber}-${columnNumber}`}>
                        {DisplayPixel(NewPixelObject)}
                    </li>
                );
            })}
        </ul>
    );
}

export default DisplayBoard;
