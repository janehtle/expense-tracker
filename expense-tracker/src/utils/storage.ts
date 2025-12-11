import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types";

const KEY = "EXPENSES_V1";

export const saveExpenses = async (expenses: Expense[]) => {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(expenses));
    } catch (e) {
        console.error("Cannot save expenses", e);
    }
};

export const loadExpenses = async (): Promise<Expense[]> => {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Expense[];
    } catch (e) {
        console.error("Cannot load expenses", e);
        return [];
    }
};
