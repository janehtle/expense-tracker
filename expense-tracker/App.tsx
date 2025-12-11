import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from "react-native";
import { ExpensesProvider } from "./src/context/ExpenseContext";
import { ExpenseForm } from "./src/components/ExpenseForm";
import { ExpenseList } from "./src/components/ExpenseList";

export default function App() {
  return (
    <ExpensesProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.header}>Expense Tracker</Text>
          <ExpenseForm />
          <ExpenseList />
        </View>
      </SafeAreaView>
    </ExpensesProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7fb" },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
});

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
