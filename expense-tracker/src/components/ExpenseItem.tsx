import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Expense } from "../types";
import { useExpenses } from "../context/ExpenseContext";

export const ExpenseItem: React.FC<{ item: Expense }> = ({ item }) => {
    const { removeExpense } = useExpenses();

    const onDelete = () => {
        Alert.alert("Delete", "Remove this expense?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => removeExpense(item.id) },
        ]);
    };

    const date = new Date(item.date);
    return (
        <View style={styles.row}>
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.description}</Text>
            <Text style={styles.meta}>
            {item.category} · {date.toLocaleDateString()}
            </Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: { 
        flexDirection: "row", 
        padding: 12, 
        borderBottomWidth: 1, 
        borderColor: "#eee", 
        alignItems: "center" 
    },
    title: { fontWeight: "600" },
    meta: { 
        color: "#666", 
        marginTop: 4 },
    amount: { 
        fontWeight: "700", 
        marginLeft: 12 
    },
});
