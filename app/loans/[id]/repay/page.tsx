"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loan } from "@/app/types/loans";
import styles from "@/app/styles/repay.module.css"

export default function RepayLoanPage() {
  const params = useParams();
  const router = useRouter();
  const loanId = Number(params.id);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [sourcePhoneNumber, setSourcePhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [repayableAmount, setRepayableAmount] = useState("");
    
  useEffect(() => {
    const currentUser =
      localStorage.getItem("currentUser");

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const user =
      JSON.parse(currentUser);

    const savedLoans =
      localStorage.getItem(
        `loans-${user.id}`
      );

    if (!savedLoans) {
      router.push(`/dashboard/${user.id}`);
      return;
    }
    const loans: Loan[] =
      JSON.parse(savedLoans);

    const selectedLoan =
      loans.find(
        (loan) =>
          loan.id === loanId
      );

    if (!selectedLoan) {
      alert("Loan not found");

      router.push(
        `/dashboard/${user.id}`
      );

      return;
    }

    setLoan(selectedLoan);
  }, [loanId, router]);

  const handleRepayment = () => {
    
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("No User Found");
      return;
    }
    const user = JSON.parse(currentUser);

    if (pin !== user.pin) {
      alert("Invalid PIN");
      return;
    }

    const savedLoans = localStorage.getItem(`loans-${user.id}`);

    if (!savedLoans) return;

    const loans: Loan[] = JSON.parse(savedLoans)
    
    const amountPaid = Number(repayableAmount);

    if (isNaN(amountPaid) || amountPaid <= 0) {
      alert("Enter Amount")
      return;
    }

    const updatedLoans = 
      loans.map((loan: Loan) => {
        if (loanId !== loan.id) {
          return loan;
        }

        if (amountPaid > loan.remainingBalance) {
          alert(`Debt is Ksh ${loan.remainingBalance}`);
          return loan;
        }

        const newBalance = loan.remainingBalance - amountPaid;

        const fullyPaid = newBalance <= 0;

        return {
          ...loan,
          remainingBalance: Math.max(newBalance, 0),
          status: 
            fullyPaid
              ? "paid"
              : "active",
          repaidDate: 
            fullyPaid
              ? new Date().toISOString()
              : undefined,
        };
      });

    const repaidLoan =
      updatedLoans.find(
        (loan) => loan.id === loanId
      );

    if (!repaidLoan) return;

    if (repaidLoan.status === "paid") {
      const repaidOnTime =
        new Date(repaidLoan.repaidDate!) <=
        new Date(repaidLoan.dueDate);

      if (!user.loanLimit) {
        user.loanLimit = 50000;
      }

      if (repaidOnTime) {
        user.loanLimit = Math.min(
          user.loanLimit + 5000,
          100000
        );
      } else {
        user.loanLimit = Math.max(
          user.loanLimit - 5000,
          5000
        );
      };

      localStorage.setItem("currentUser", JSON.stringify(user));

      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const updatedUsers = users.map(
        (u: any) =>
          u.id === user.id ? user : u
      );

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );
    };

    localStorage.setItem(
      `loans-${user.id}`,
      JSON.stringify(updatedLoans)
    );

    alert(
      repaidLoan.status === "paid"
        ? "Loan Fully Paid"
        : "Partial Loan Paid"
    );

    router.push(`/dashboard/${user.id}`);
  };

  if (!loan) {
    return <h2>Loan not found</h2>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Repay Loan</h1>

      <h3 className={styles.header}>
        Destination Account:
        {" "}
        {loan.phoneNumber}
      </h3>

      <h3 className={styles.card}>
        Amount Borrowed:
        {" "}
        Ksh {loan.amountBorrowed}
      </h3>

      <h3 className={styles.card}>
        Interest:
        {" "}
        Ksh {loan.interest}
      </h3>

      <h3 className={styles.card}>
        Total Repayable:
        {" "}
        Ksh {loan.totalRepayable}
      </h3>

      <h3 className={styles.card}>
        Balance:
        {" "}
        Ksh {loan.remainingBalance}
      </h3>

      <h3 className={styles.card}>
        Status:
        {" "}
        {loan.status}
      </h3>

      <br />

      <br />
      <br />
      
      <input
        type="text"
        placeholder="Repayment Amount"
        value={repayableAmount}
        onChange={(e) =>
          setRepayableAmount(
            e.target.value
          )
        }
        className={styles.input}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) =>
          setPin(
            e.target.value
          )
        }
        className={styles.input}
      />

      <br />
      <br />

      <button
        onClick={
          handleRepayment
        }
        className={styles.button}
      >
        Repay Loan
      </button>

      <br />
      <br />

      <button 
        onClick={() => {
          const currentUser = localStorage.getItem("currentUser");
          if (!currentUser) return;

          const user = JSON.parse(currentUser);

          router.push(`/dashboard/${user.id}`);
        }}
        className={styles.button}
        > Cancel </button>
    </main>
  );
};