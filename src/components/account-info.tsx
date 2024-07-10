import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../screens/home";

interface Props {
  user?: User;
}

const AccountInfo = ({ user }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user?.fullName || ""}</Text>
      <Text style={styles.accountNumber}>{user?.phoneNumber || ""}</Text>
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
