"use client";

import React, { useState } from "react"; 
import styles from "../styles/loanform.module.css"

type Props = {
  processLoan: (
    accountNumber: string,
    amount: number,
    pin: string,
    dueDate: string
  ) => void;
};

export default function LoanForm({processLoan}: Props) {
    const [ accountNumber, setAccountNumber] = useState("");
    const [ amount, setAmount ] = useState("");
    const [pin, setPin] = useState("");
    const [dueDate, setDueDate] = useState("")

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!accountNumber || !amount) return;


        processLoan(
            accountNumber,
            Number(amount),
            pin,
            dueDate
        );
        setAccountNumber("");
        setAmount("");
        setPin("");
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className={styles.container}
        > 
            <input 
                type="text"
                value={amount}
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)} 
                className={styles.input}
            />

            <input
                type="date"
                value={dueDate}
                min={
                    new Date()
                        .toISOString()
                        .split("T")[0]
                }
                max={
                    new Date(
                        Date.now() + 
                        30 * 24 * 60 * 60 * 1000
                    )
                        .toISOString()
                        .split("T")[0]   
                }
                onChange={(e) => setDueDate(e.target.value)}
                className={styles.input}
            />
            
            <input
                type="password"
                value={pin}
                placeholder="Pin"
                onChange={(e) => setPin(e.target.value)}
                className={styles.input}
            />

            <button type="submit" className={styles.button} >Add Loan</button>
        </form>
  
    );

};