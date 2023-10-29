import { colorStore } from "../Game";
import { ColorStoreInterface } from "../SetUpAndDisplayBoard/SetUpBoard/storeInterface";

function changeColor(data: any, setColorPut: (value: string) => void) {
    let newColor: string = data.target.className.substring(1);
    setColorPut(newColor);
}

function DisplayColorPanel(): JSX.Element {
    const { setColorPut } = colorStore() as ColorStoreInterface;
    return (
        <div className="grid grid-cols-8 h-5">
            <div
                className=" bg-white"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-black"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-blue-500"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-red-500"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-yellow-400"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-green-500"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-amber-800"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
            <div
                className=" bg-pink-500"
                onClick={(data) => {
                    changeColor(data, setColorPut);
                }}
            ></div>
        </div>
    );
}
export default DisplayColorPanel;
