export interface CooldownStoreInterface {
    isCooldown: boolean;
    setIsCooldown: (value: boolean) => void;
}

export interface ColorStoreInterface {
    colorPut: string;
    setColorPut: (value: string) => void;
}
