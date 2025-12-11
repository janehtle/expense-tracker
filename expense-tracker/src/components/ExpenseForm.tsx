import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../types";

const categories: Category[] = ["Food", "Transport", "Shopping", "Bills", "Other"];

export const ExpenseForm: React.FC = () => {
    const { addExpense } = useExpenses();
    const [description, setDescription] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const [category, setCategory] = useState<Category>("Food");

    const onSubmit = () => {
        const amount = parseFloat(amountStr);
        if (!description.trim() || isNaN(amount) || amount <= 0) {
        Alert.alert("Invalid input", "Please provide a description and amount greater than 0");
        return;
    }

    const newExpense = {
        id: uuidv4(),
        description: description.trim(),
        amount,
        date: new Date().toISOString(),
        category,
    };

    addExpense(newExpense);
    setDescription("");
    setAmountStr("");
    setCategory("Food");
};

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Description</Text>
        <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
        />

        <Text style={styles.label}>Amount (USD)</Text>
        <TextInput
            value={amountStr}
            onChangeText={setAmountStr}
            keyboardType="numeric"
            style={styles.input}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
            {categories.map(cat => (
            <Button
                key={cat}
                title={cat}
                onPress={() => setCategory(cat)}
                color={cat === category ? undefined : "#888"}
            />
            ))}
        </View>

        <View style={{ marginTop: 10 }}>
            <Button title="Add Expense" onPress={onSubmit} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 12, 
        backgroundColor: "#fff", 
        borderRadius: 8, 
        marginBottom: 16 
    },
    label: { 
        fontWeight: "600", 
        marginBottom: 4 
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        borderRadius: 6,
        marginBottom: 8,
    },
    categoryRow: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        gap: 6, 
        justifyContent: "space-between" 
    } as any,
});
