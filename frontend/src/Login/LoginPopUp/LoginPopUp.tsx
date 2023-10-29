import { LoginPopupContent } from "./LoginPopupContent";
import { LoginButton } from "./LoginButton";

function BlackBackground(): JSX.Element {
    return <div className="bg-black opacity-50 fixed inset-0"></div>;
}

export function LoginPopUp(): JSX.Element {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 mx-2">
            <BlackBackground />
            <div className="bg-white rounded-lg p-4 z-10 text-center">
                <LoginPopupContent />
                <LoginButton />
            </div>
        </div>
    );
}
