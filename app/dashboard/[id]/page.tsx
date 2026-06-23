'use client';

import { useState, useEffect, } from "react";
import Balance from "../../components/Balance";
import LoanForm from "../../components/Loanform";
import LoanList from "../../components/Loanlist";
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
      .reduce((sum, loan) => sum + loan.amount,
       0
    );

  const processLoan = (
    phoneNumber: string,
    amount: number,
    pin: string,
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

    if(amount > balance) {
      alert("Insufficient funds")
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); 

    console.log(dueDate.toISOString());
  
    const newLoan: Loan = {
      id: Date.now(),
      phoneNumber,
      amount,
      status: "active",
      dueDate: dueDate.toISOString(),
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
    <main>
      <h1>Dashboard</h1>
      <h1>Welcome, {userName}</h1>
      <h1>{phoneNumber}</h1>
      <h1>Loan Limit: Ksh {loanLimit}</h1>
      <Balance balance={balance} />

      <LoanForm
        processLoan={processLoan} 
      />

      <LoanList
        loans={loans}
      />
      <br />
      <button 
        onClick={() => {localStorage.removeItem("loggedIn");
          localStorage.removeItem("currentUser");
         router.push("/login")}}
        style={styles.button}
        >Log Out</button>


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