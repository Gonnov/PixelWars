function sendToAuthentificationAPI() {
    window.location.href =
        "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-4e9fb12830eb69fbf2bdb66f3a20708aa9c8dfcaad1c5fd1d4fe36d0da102342&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&response_type=code";
}

export function LoginButton(): JSX.Element {
    return (
        <button
            type="submit"
            className=" bg-amber-400 px-4 py-2 rounded text-black font-bold"
            onClick={() => sendToAuthentificationAPI()}
        >
            <div className="flex">
                Login with
                <img
                    src="/img/42_Logo.svg.png"
                    alt="42 logo"
                    className="ml-2 h-6"
                />
            </div>
        </button>
    );
}
