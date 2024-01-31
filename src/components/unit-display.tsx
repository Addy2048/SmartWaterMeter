import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

interface IProps {
  availableUnits: number;
  consumedUnits: number;
}

const UnitDisplay = ({ availableUnits, consumedUnits }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.unit}>
        <View>
          <Text style={styles.unitText}>Consumed Units</Text>
          <Text style={styles.consumed}>{consumedUnits.toString()}</Text>
        </View>
        <View>
          <Text style={styles.unitText}>Available Units</Text>
          <Text style={styles.available}>{availableUnits.toString()}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textDecorationColor: "#192655",
              textDecorationStyle: "solid",
              color: "#192655",
              fontWeight: "bold",
            }}
          >
            Info
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#192655",
    borderWidth: 3,
    width: "100%",
    height: 180,
    position: "relative",
    top: "-15%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 12,
  },
  unit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 12,
    alignItems: "baseline",
  },
  available: { fontSize: 70, textAlign: "center" },
  consumed: { fontSize: 70, textAlign: "center" },
  unitText: {
    fontWeight: "300",
    fontSize: 16,
  },
});

export default UnitDisplay;
