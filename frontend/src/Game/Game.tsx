import SetUpBoard from "./SetUpAndDisplayBoard/SetUpBoard/SetUpBoard";
import DisplayColorPanel from "./DisplayColorPanel/DisplayColorPanel";
import DisplayTimer from "./DisplayTimer/DisplayTimer";
import { create } from "zustand";

export const colorStore = create((set) => ({
    colorPut: "bg-white",
    setColorPut: (newColor: string) => set({ colorPut: newColor }),
}));

export const isCooldownStore = create((set) => ({
    isCooldown: false,
    setIsCooldown: (newCooldown: boolean) => set({ isCooldown: newCooldown }),
}));

function Game() {
    return (
        <main
            className="fixed top-1/2 left-1/2 aspect-square
            -translate-x-1/2 -translate-y-1/2 shadow-2xl mt-4"
        >
            <SetUpBoard />
            <DisplayColorPanel />
            <DisplayTimer />
        </main>
    );
}

export default Game;
