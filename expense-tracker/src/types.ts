export type Category = "Food" | "Transport" | "Shopping" | "Bills" | "Other";

export type Expense = {
    id: string;
    description: string;
    amount: number;
    date: string; 
    category: Category;
};
