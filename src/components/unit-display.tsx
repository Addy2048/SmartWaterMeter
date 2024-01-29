import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProps {
  availableUnits: number;
  consumedUnits: number;
}

const UnitDisplay = ({ availableUnits, consumedUnits }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.consumed}>{consumedUnits.toString()}</Text>
      <Text style={styles.available}>{availableUnits.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    alignItems: "baseline",
  },
  available: { fontSize: 48 },
  consumed: { fontSize: 100 },
});

export default UnitDisplay;
