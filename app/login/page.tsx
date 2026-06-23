"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const savedUsers = localStorage.getItem("users");
        if(!savedUsers) {
            alert("No Account Found Please Sign up"); return;
        }

        const users= JSON.parse(savedUsers);
        const matchedUser = 
            users.find((user: {
                userName: string;
                password: string;
            }) => user.userName === userName && user.password === password)

        if (matchedUser) {
            localStorage.setItem(
                "loggedIn",
                "true"
            );
            localStorage.setItem("currentUser", JSON.stringify(matchedUser))
            
            router.push(`/dashboard/${matchedUser.id}`);
        
        }else {
            alert("Invalid Logins");
        };
    };

    return (
        <div>
            <h1>LOGIN</h1>

            <input
                value={userName}
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleLogin} style={styles.button}>Login</button>

            <br />
            <br />

            <button onClick={() => router.push("/")} style={styles.button}>Create Account</button>

        </div>
    );
};
const styles = {
     button: {
        padding: " 10px 20px",
        background: "blue",
        color: "white"
    },
};