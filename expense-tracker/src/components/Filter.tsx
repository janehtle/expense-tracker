import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Category } from "../types";

type Props = {
    options: (Category | "All")[];
    selected: Category | "All";
    onSelect: (value: Category | "All") => void;
    wrap?: boolean;
};

export const CategoryFilter: React.FC<Props> = ({ options, selected, onSelect, wrap = true }) => {
    return (
        <View style={[styles.row, wrap ? styles.wrap : undefined]}>
        {options.map(opt => {
            const isActive = opt === selected;
            return (
            <TouchableOpacity
                key={opt}
                onPress={() => onSelect(opt)}
                accessibilityRole="button"
                style={[styles.button, isActive ? styles.active : styles.inactive]}
            >
                <Text style={[styles.label, isActive ? styles.activeLabel : styles.inactiveLabel]}>
                {opt}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: { 
        flexDirection: "row", 
        gap: 8 
    },
    wrap: { flexWrap: "wrap" },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 6,
        borderWidth: 1,
    },
    active: {
        backgroundColor: "#ffffff",
        borderColor: "#333",
    },
    inactive: {
        backgroundColor: "transparent",
        borderColor: "#ccc",
    },
    label: { fontSize: 13 },
    activeLabel: { fontWeight: "700" },
    inactiveLabel: { color: "#555" },
});
