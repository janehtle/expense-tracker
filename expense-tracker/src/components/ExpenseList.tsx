import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import { ExpenseItem } from "./ExpenseItem";
import { Category } from "../types";

const categories: (Category | "All")[] = ["All", "Food", "Transport", "Shopping", "Bills", "Other"];

export const ExpenseList: React.FC = () => {
    const { state, clearExpenses } = useExpenses();
    const [filter, setFilter] = useState<Category | "All">("All");

    const filtered = useMemo(() => {
        return filter === "All" ? state.expenses : state.expenses.filter(e => e.category === filter);
    }, [state.expenses, filter]);

    const total = filtered.reduce((s, e) => s + e.amount, 0);

    return (
        <View style={{ flex: 1 }}>
        <View style={styles.filterRow}>
            {categories.map(cat => (
            <Button
                key={cat}
                title={cat}
                onPress={() => setFilter(cat as (Category | "All"))}
                color={filter === cat ? undefined : "#888"}
            />
            ))}
        </View>

        <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({filtered.length}):</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ExpenseItem item={item} />}
            ListEmptyComponent={<Text style={{ padding: 12, color: "#666" }}>No expenses yet.</Text>}
        />

        <View style={{ padding: 12 }}>
            <Button title="Clear all" onPress={() => clearExpenses()} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    filterRow: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-between", 
        padding: 8 
    },
    totalRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        padding: 12, 
        alignItems: "center" 
    },
    totalLabel: { fontWeight: "600" },
    totalAmount: { 
        fontWeight: "700", 
        fontSize: 16 
    },
});
