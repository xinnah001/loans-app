"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SingUpPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [pin, setPin] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false)
    const router = useRouter();

    const handleSignUp = () => {
        if (
            !userName || !password || !phoneNumber || !pin
        ) {
            alert("All Fields Required"); return;
        }

        const savedUsers = localStorage.getItem("users")
        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];
        const existingUser = users.find(
            (user: any) => user.userName === userName
        );
        if (existingUser) {
            alert("User Already Exists");
            return;
        }

        if (!acceptTerms) {
            alert("Please Accept The Terms & Conditions");
            return;
        }

        const newUser = {
            id: Date.now(),
            userName,
            password,
            pin,
            phoneNumber,
            loanLimit: 50000,
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem(
            "loggedIn", "true"
        );
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        router.push(`/dashboard/${newUser.id}`)
    };

    return (
        <div>
            <h1>SIGN UP</h1>
            <br />
            <input 
                value={userName}
                placeholder="Username"
                onChange={((e) => setUserName(e.target.value))}
            />
            
            <br />
            <br />
            
            <input 
                type="password"
                value={password}
                placeholder="Password"
                onChange={((e) => setPassword(e.target.value))}
            />
            
            <br />
            <br />

            <input 
                value={phoneNumber}
                placeholder="PhoneNumber"
                onChange={((e) => setPhoneNumber(e.target.value))}
            />
            
            <br />
            <br />
            <input 
                type="password"
                value={pin}
                placeholder="Pin"
                onChange={((e) => setPin(e.target.value))}
            />
            
            <br />
            <br />

            <label>
                <input 
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={((e) => setAcceptTerms(e.target.checked))}
                    
                />
                <Link 
                    href="/terms"
                    style={{ color: "blue"}}
                >
                    Terms & Conditions
                </Link>
            </label>
            
            <br />
            <br />

            <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
            
            <br />
            <br />
            <button onClick={() => router.push("/login")}
                style={styles.button}
                >Login</button>
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