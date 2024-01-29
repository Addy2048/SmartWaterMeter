import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccountInfo = () => {
  return (
    <View>
      <Text style={styles.userName}>Osama Bin Laden</Text>
      <Text style={styles.accountNumber}>6779-8980-000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountNumber: {
    fontSize: 14,
  },
});

export default AccountInfo;
