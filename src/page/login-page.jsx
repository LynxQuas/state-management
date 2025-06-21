import { useState } from "react";
import useAuth from "../context/auth-context";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [isError, setIsError] = useState(false);
    const { handleLogin } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            setIsError(true);
            return;
        }
        handleLogin(username);
        setUsername("");
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-center text-3xl pt-20 font-bold">Login</h2>
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center h-[20rem]"
            >
                <div className="flex flex-col gap-10 w-full px-4 md:w-[25rem] rounded-md">
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIsError(false);
                            }}
                            placeholder="Username"
                            className={`p-4 w-full outline-none rounded-md border ${
                                isError && "border-red-500"
                            }`}
                        />

                        {isError && (
                            <span className="text-red-500">
                                Username is required.
                            </span>
                        )}
                    </div>

                    <button className="bg-violet-500 font-bold shadow-sm text-white p-4 rounded-md">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
