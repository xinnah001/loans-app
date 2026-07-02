"use client";

import { Loan } from "../types/loans";
import { useRouter } from "next/navigation";
import  Countdown  from "./Countdown"
import styles from "../styles/loanlist.module.css"

type Props = {
  loans: Loan[];
};

export default function LoanList({ loans }: Props) {
  const router = useRouter();

  const activeLoans = loans.filter(
    (loan) => loan.status === "active"
  );

  return (
    <main className={styles.loanCard}>
      <ul className={styles.list}>
        {activeLoans.map((loan) => {
          const overdue = loan.dueDate && new Date() > new Date(loan.dueDate);

          return (
            <li key={loan.id} className={styles.listItems}>
              {loan.phoneNumber}

              <br />
              Amount Borrowed: Ksh {loan.amountBorrowed}

              <br />
              Interest: Ksh {loan.interest}

              <br />
              Total: Ksh {loan.totalRepayable}

              <br />
              Balance: Ksh {loan.remainingBalance}

              <br />
              {loan.status}

              <br />
              Due: {new Date(loan.dueDate).toLocaleDateString()}

              <br />
              <Countdown dueDate={loan.dueDate}/>
                
              <br />
              {overdue && (
                <p style={{ color: "red"}}>Overdue</p>
              )}

              <br />
              <button
                onClick={() =>
                  router.push(`/loans/${loan.id}/repay`)
                }
                className={styles.repayButton}
              >
                Repay
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};