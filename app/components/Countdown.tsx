"use client"
import { useState, useEffect } from "react"

type Props = {
    dueDate: string;
};

export default function Countdown({dueDate,}: Props) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now()
            const due = new Date(dueDate).getTime();

            const difference = due - now;

            if (difference <= 0) {
                setTimeLeft("Loan Overdue");
                return;
            }

            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );

            const seconds = Math.floor(
                (difference % (1000 * 60)) / 1000
            );

            setTimeLeft(
                `${days}d ${hours}h ${minutes}m ${seconds}s`
            );
        }, 1000);
        
        return () => clearInterval(timer);
    }, [dueDate]);

    const color = 
        timeLeft === "Loan Overdue"
        ? "red"
        : timeLeft.startsWith("0d")
        ? "orange"
        : "green";
    
    return (
        <p style={{ color }}>
            Time Remaining: {timeLeft}
        </p>
    )
}