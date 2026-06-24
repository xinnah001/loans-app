export type Loan = {
    id: number;
    phoneNumber: string;
    amountBorrowed: number;
    status: "active" | "paid";
    dueDate: string;
    repaidDate?: string;
    interest: number;
    totalRepayable: number;
};