"use client"
import { useRouter } from "next/navigation";
export default function TermsPage() {
    const router = useRouter();
    return (
        <main style={styles.container}>
            <h1 style={styles.heading}>Terms & Conditions</h1>

            <p>Welcome Please Read Throught The Apps Terms & And Conditions Carefully.</p>
            <br />
            <br />

            <h1 style={styles.heading}>Signin In</h1>
            <p>
                Username: You are required to provide an eligable name as your username. <br />
                Password: The password you provide will be used when logging in to the app on a later date. <br />
                PhoneNumber: Please provide your phonenumber that will be linked to all the loans you receive. <br />
                Pin: The pin you create will be used to initiate loan application and loan repayment.
            </p>
            <br />
            <br />

            <h1 style={styles.heading}>Loan Application</h1>
            <p>
                Provide valid information to the destination in which the loan will be provided. <br />
                Each loan is alocated a maximum of thirty days as repayment period.The user may set a date they see fit aslong as it doesn't excced 30 days to the date of application. <br />
                On signing in each user is alocated a limit of Ksh 50000 which might be increased or reduced depending on the user's repayment habits
            </p>
            <br />
            <br />

            <h1 style={styles.heading}>Interest Rates</h1>
            <p>
                Every loan taken attracts an interest following the given criteria; <br />
                Ksh 10000 and below an interest of 10% on the amount borrowed, <br />
                Ksh 30000 and below an interest of 20% on the amount borrowed, <br />
                Any amont above Ksh 30000 attracts an interest of 30% on the amount borrowed.
            </p>
            <br />
            <br />

            <h1 style={styles.heading}>Repayment Policy</h1>
            <p>
                Loans must be repayed before the set due date. <br />
                Delay on repaying loans results in a penalty of reduction of loan limit by ksh 5000 where as loans repayed before the due date result in an increase on the loan limit by Ksh 5000. <br />
                Maximum loan limit can go upto Ksh 100000 whereas minimum loan limit can go down to Ksh 5000. <br />
                Loan repayment can either be partial or fully but the user is only eligable to an increase in the limit after full repayment.
            </p>

            <br />
            <br />
            <button 
                onClick={() => router.back()}
                style={styles.button}
            > Back </button>
        </main>
    );
}

const styles = {
    container: {
        padding: "30px",
        maxWidth: "900px",
        margin: "40px, auto",
        textAlign: "left" as const,
        fontFamily: "Arial, sans-serif"
    },

    heading: {
        color: "blue",
    },

    button: {
        background: "#0056d6",
        color: "white",
        border: "none",
        padding: "12px 25px",
        borderRadius: "8px",
        cursor: "pointer"
    },
}