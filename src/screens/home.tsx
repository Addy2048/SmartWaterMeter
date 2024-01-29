import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AccountInfo from "../components/account-info";
import dayjs from "dayjs";
import UnitDisplay from "../components/unit-display";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Water Meter App</Text>
      <View style={styles.top}>
        <AccountInfo />
        <View>
          <Text style={styles.date}>{dayjs().format("MMMM DD, YYYY")}</Text>
          <Text style={styles.location}>Dar es Salaam, Tanzania</Text>
        </View>
      </View>
      <View>
        <UnitDisplay availableUnits={0} consumedUnits={0} />
      </View>
      <View style={styles.buyContainer}>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>BUY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12,
  },
  top: {
    display: "flex",
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  location: {
    textAlign: "right",
  },
  date: {
    textAlign: "right",
  },
  buyContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buyBtn: {
    height: 100,
    width: 100,
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
