export type Loan = {
    id: number;
    phoneNumber: string;
    amount: number;
    status: "active" | "paid";
    dueDate: string;
    repaidDate?: string;
};