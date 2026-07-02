'use client';

import { useState, useEffect, } from "react";
import Balance from "../../components/Balance";
import LoanForm from "../../components/Loanform";
import LoanList from "../../components/Loanlist";
import styles from "../../styles/dashboard.module.css"
import { Loan } from "../../types/loans";
import { useRouter, useParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const [loanLimit, setLoanLimit] = useState(50000);
  const [authorised, setAuthorised] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loansLoaded, setLoansLoaded] = useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
      router.replace("/login");
      return;
    }

    const currentUser =
      localStorage.getItem("currentUser");

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const user =
      JSON.parse(currentUser);

    if (
      String(user.id) !==
      String(params.id)
    ) {
      router.replace("/login");
      return;
    }

    setAuthorised(true);
  }, [router, params.id]);

  useEffect(() => {
    const currentUser =
      localStorage.getItem("currentUser");

    if (!currentUser) return;

    const user =
      JSON.parse(currentUser);

    setUserName(user.userName);
    setPhoneNumber(user.phoneNumber);
    setLoanLimit(user.loanLimit || 50000);

    const savedLoans =
      localStorage.getItem(
        `loans-${user.id}`
      );

    if (savedLoans) {
      setLoans(
        JSON.parse(savedLoans)
      );
    }

    setLoansLoaded(true);
  }, []);

  // Save loans
  useEffect(() => {
    if (!loansLoaded) return;

    const currentUser =
      localStorage.getItem("currentUser");

    if (!currentUser) return;

    const user =
      JSON.parse(currentUser);

    localStorage.setItem(
      `loans-${user.id}`,
      JSON.stringify(loans)
    );
  }, [loans, loansLoaded]);

  const balance = 
    loanLimit - 
    loans
      .filter((loan) => loan.status === "active")
      .reduce((sum, loan) => sum + loan.amountBorrowed,
       0
    );

  const processLoan = (
    phoneNumber: string,
    amountBorrowed: number,
    pin: string,
    dueDate: string
  ) => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("No User Found"); return;
    }

    const user = JSON.parse(currentUser);

    if (pin !== user.pin) {
      alert("Invalid Pin")
      return;
    }

    if(amountBorrowed > balance) {
      alert("Insufficient funds")
      return;
    }

    const today = new Date();
    const selectedDate = new Date(dueDate);
    const maxDate = new Date();

    maxDate.setDate(
      maxDate.getDate() + 30
    );

    if (selectedDate <= today) {
      alert("Due Date Must Be After Date Of Loan Allocation");
      return;
    }

    if (selectedDate > maxDate) {
      alert("Due Date Can't Exceed 30 Days");
      return;
    }

    let interestRate = 0.1;

    if (amountBorrowed > 30000) {
      interestRate = 0.3;
    } else if (amountBorrowed > 10000) {
      interestRate = 0.2;
    }

    const interest = amountBorrowed * interestRate;

    const totalRepayable = amountBorrowed + interest;

    const newLoan: Loan = {
      id: Date.now(),
      phoneNumber,
      amountBorrowed,
      status: "active",
      dueDate,
      interest,
      totalRepayable,
      remainingBalance: totalRepayable
    };


    setLoans([
      newLoan,
      ...loans,
    ]);

  
  };

  if (!authorised) {
    return <p>Loading...</p>
  };


  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>
      <h1 className={styles.header}>Welcome, {userName}</h1>
      <h1 className={styles.header}>Phone.No: {phoneNumber}</h1>
      <h1 className={styles.card}>Loan Limit: Ksh {loanLimit}</h1>
      <br />
      <div className={styles.card}>
        <Balance balance={balance} />
      </div>
      <br />

      <div className={styles.card}>
        <LoanForm processLoan={processLoan} />
      </div>
      <br />

      <div className={styles.card}>
        <LoanList loans={loans}/>
      </div> 

      <br />
      <button 
        onClick={() => {localStorage.removeItem("loggedIn");
          localStorage.removeItem("currentUser");
         router.push("/login")}}
         className={styles.button}
        >Log Out</button>


    </main>
  );
};
