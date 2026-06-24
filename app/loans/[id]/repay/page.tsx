"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loan } from "@/app/types/loans";

export default function RepayLoanPage() {
  const params = useParams();
  const router = useRouter();

  const loanId = Number(params.id);

  const [loan, setLoan] = useState<Loan | null>(null);

  const [sourcePhoneNumber, setSourcePhoneNumber] =
    useState("");

  const [pin, setPin] =
    useState("");



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
    if (!sourcePhoneNumber) {
      alert(
        "Enter source account number"
      );
      return;
    }
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("No User Found");
      return;
    }
    const user = JSON.parse(currentUser);

    if (sourcePhoneNumber !== user.phoneNumber) {
      alert("Invalid Source")
      return;
    }

    if (pin !== user.pin) {
      alert("Invalid PIN");
      return;
    }

    const savedLoans = localStorage.getItem(`loans-${user.id}`);

    if (!savedLoans) return;

    const loans: Loan[] = JSON.parse(savedLoans)
    
    const updatedLoans =
      loans.map((loan: Loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: "paid",
              repaidDate: new Date().toISOString(),
            }
          : loan
      );
    const repaidLoan =
      updatedLoans.find(
        (loan) => loan.id === loanId
      );

    if (!repaidLoan) return;

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

    localStorage.setItem(
      `loans-${user.id}`,
      JSON.stringify(updatedLoans)
    );

    alert(
      "Loan repaid successfully"
    );

    router.push(`/dashboard/${user.id}`);
  };

  if (!loan) {
    return <h2>Loan not found</h2>;
  }

  return (
    <main>
      <h1>Repay Loan</h1>

      <h3>
        Destination Account:
        {" "}
        {loan.phoneNumber}
      </h3>

      <h3>
        Amount Borrowed:
        {" "}
        Ksh {loan.amountBorrowed}
      </h3>

      <h3>
        Interest:
        {" "}
        Ksh {loan.interest}
      </h3>

      <h3>
        Total Repayable:
        {" "}
        Ksh {loan.totalRepayable}
      </h3>

      <h3>
        Status:
        {" "}
        {loan.status}
      </h3>

      <br />

      <input
        type="text"
        placeholder="Phone Number"
        value={sourcePhoneNumber}
        onChange={(e) =>
          setSourcePhoneNumber(
            e.target.value
          )
        }
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
      />

      <br />
      <br />

      <button
        onClick={
          handleRepayment
        }
        style={styles.button}
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
        style={styles.button}
        >Cancel</button>
    </main>
  );
};

const styles = {
     button: {
        padding: " 10px 20px",
        background: "blue",
        color: "white"
    },
};