import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccountInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Adiel Azaliwa</Text>
      <Text style={styles.accountNumber}>6779-8980-000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  accountNumber: {
    fontSize: 14,
    color: "white",
    textAlign: "right",
  },
});

export default AccountInfo;
