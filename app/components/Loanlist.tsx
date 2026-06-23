"use client";

import { Loan } from "../types/loans";
import { useRouter } from "next/navigation";

type Props = {
  loans: Loan[];
};

export default function LoanList({ loans }: Props) {
  const router = useRouter();

  const activeLoans = loans.filter(
    (loan) => loan.status === "active"
  );

  return (
    <main style={styles.container}>
      <ul style={styles.list}>
        {activeLoans.map((loan) => {
          const overdue = loan.dueDate && new Date() > new Date(loan.dueDate);

          return (
            <li key={loan.id} style={styles.listItems}>
              {loan.phoneNumber}

              <br />
              Ksh {loan.amount}

              <br />
              {loan.status}

              <br />
              Due: {new Date(loan.dueDate).toLocaleDateString()}

              <br />
              {overdue && (
                <p style={{ color: "red"}}>Overdue</p>
              )}

              <br />
              <button
                onClick={() =>
                  router.push(`/loans/${loan.id}/repay`)
                }
                style={styles.repayButton}
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

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
  },

  list: {
    marginTop: "20px",
    padding: 0,
  },

  listItems: {
    marginBottom: "10px",
    listStyle: "none",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
  },

  repayButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "0px 10px",
  },
};