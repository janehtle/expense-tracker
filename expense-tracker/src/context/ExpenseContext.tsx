import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Expense } from "../types";
import { loadExpenses, saveExpenses } from "../utils/storage";

type State = {
    expenses: Expense[];
    loaded: boolean;
};

type Action =
    | { type: "LOAD"; payload: Expense[] }
    | { type: "ADD"; payload: Expense }
    | { type: "REMOVE"; payload: string }
    | { type: "CLEAR" };

const initialState: State = { expenses: [], loaded: false };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOAD":
            return { ...state, expenses: action.payload, loaded: true };
        case "ADD":
            return { ...state, expenses: [action.payload, ...state.expenses] };
        case "REMOVE":
            return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
        case "CLEAR":
            return { ...state, expenses: [] };
        default:
            return state;
    }
};

type ContextType = {
    state: State;
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    clearExpenses: () => void;
};

const ExpensesContext = createContext<ContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

  //load on mount
    useEffect(() => {
        (async () => {
        const stored = await loadExpenses();
        dispatch({ type: "LOAD", payload: stored });
        })();
    }, []);

    useEffect(() => {
        if (state.loaded) {
        saveExpenses(state.expenses);
        }
    }, [state.expenses, state.loaded]);

    const addExpense = (expense: Expense) => dispatch({ type: "ADD", payload: expense });
    const removeExpense = (id: string) => dispatch({ type: "REMOVE", payload: id });
    const clearExpenses = () => dispatch({ type: "CLEAR" });

    return (
        <ExpensesContext.Provider value={{ state, addExpense, removeExpense, clearExpenses }}>
        {children}
        </ExpensesContext.Provider>
    );
};

export const useExpenses = () => {
    const ctx = useContext(ExpensesContext);
    if (!ctx) throw new Error("useExpenses must be used within ExpensesProvider");
    return ctx;
};
