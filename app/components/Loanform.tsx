"use client";

import React, { useState } from "react"; 

type Props = {
  processLoan: (
    accountNumber: string,
    amount: number,
    pin: string
  ) => void;
};

export default function LoanForm({processLoan}: Props) {
    const [ accountNumber, setAccountNumber] = useState("");
    const [ amount, setAmount ] = useState("");
    const [pin, setPin] = useState("");

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!accountNumber || !amount) return;

        processLoan(
            accountNumber,
            Number(amount),
            pin
        );
        setAccountNumber("");
        setAmount("");
        setPin("");
    };

    return (
        <form onSubmit={handleSubmit} style={stlyes.inputContainer}>
            <input 
                type="text"
                value={accountNumber}
                placeholder="AccountNumber"
                onChange={(e) => setAccountNumber(e.target.value)}
                style={stlyes.input} 
            />  
            
            <input 
                type="text"
                value={amount}
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)} 
                style={stlyes.input}
            />
            
            <input
                type="password"
                value={pin}
                placeholder="Enter PIN"
                onChange={(e) => setPin(e.target.value)}
                style={stlyes.input}
            />

            <button type="submit" style={stlyes.button}>Add Loan</button>
        </form>
  
    );

};

const stlyes = {
    inputContainer: {
        gap: "25px",
        padding: "1opx"
    },

    button: {
        padding: " 10px 20px",
        background: "blue",
        color: "white"
    },

    input: {
        flex: 1,
        padding: "10px"
    },
};