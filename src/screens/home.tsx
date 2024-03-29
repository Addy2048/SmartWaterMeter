import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
} from "react-native";
import dayjs from "dayjs";
import { doc, updateDoc, onSnapshot, getFirestore } from "firebase/firestore";
import AccountInfo from "../components/account-info";
import UnitDisplay from "../components/unit-display";

const Home = () => {
  const db = getFirestore();

  const [showModal, setShowModal] = useState(false);
  const [unitAmount, setUnitAmount] = useState("");
  const [available, setAvailable] = useState(0);
  const [consumed, setConsumed] = useState(10);
  const [user, setUser] = useState({
    accountName: "Adiel Azaliwa",
    accountNumber: "999-999-999",
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePurchase = async () => {
    const val = Number(unitAmount) + available;
    setAvailable(val);
    closeModal();
    setUnitAmount("");
    // const docToUpdate = {
    //   availableUnits: 15,
    //   updatedAt: dayjs().format(),
    // };

    // try {
    //   const docRef = doc(db, "unitBalance", user.accountNumber);

    //   await updateDoc(docRef, { ...docToUpdate });

    //   console.log(docRef);
    //   console.log("report saved successfully");
    //   closeModal();
    // } catch (error) {
    //   console.log(error, "failed to save report");
    //   closeModal();
    // }
  };

  const handleCancel = () => {
    setUnitAmount(""), closeModal();
  };

  useEffect(() => {
    const docRef = doc(db, "unitBalance", user.accountNumber);

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const userData = snapshot.data();
      if (userData) {
        setAvailable(userData.availableUnits || 0);
      }
    });

    return () => unsubscribe();
  }, [db, user.accountNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AccountInfo />
        <View>
          <Text style={styles.location}>Dar es Salaam, Tanzania</Text>
          <Text style={styles.date}>{dayjs().format("MMMM DD, YYYY")}</Text>
        </View>
        <TouchableOpacity style={styles.notification}>
          <Image
            style={styles.bell}
            source={require("../../assets/bell.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <UnitDisplay availableUnits={available} consumedUnits={consumed} />

        <View style={styles.buyContainer}>
          <TouchableOpacity style={styles.buyBtn} onPress={openModal}>
            <Text style={styles.buyText}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showModal}
        onAccessibilityEscape={closeModal}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end", // Align to the bottom
            backgroundColor: "rgba(25, 38, 85, 0.8)", // Modal shadow color
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              shadowColor: "#192655", // Shadow color
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
              elevation: 5, // For Android
              height: "45%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                margin: 8,
              }}
            >
              BUY UNITS
            </Text>

            {/* TextInput for unit amount */}
            <TextInput
              placeholder="Enter units"
              keyboardType="numeric"
              value={unitAmount}
              onChangeText={(text) => setUnitAmount(text)}
              style={{
                borderWidth: 2,
                borderColor: "#192655", // Border color
                marginBottom: 20,
                paddingHorizontal: 15,
                paddingVertical: 5,
                height: 48,
                borderRadius: 4,
                fontSize: 16,
              }}
            />

            {/* Display unit cost */}
            <Text>Unit Cost: TZS 100 per unit</Text>
            <TextInput>
              Total Cost: TZS {`${Number(unitAmount) * 100}`}/-
            </TextInput>

            {/* Buttons for completing purchase and canceling */}
            <View
              style={{
                // flexDirection: "row",
                // justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#192655",
                  height: 48,
                  minWidth: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  borderRadius: 4,
                }}
                onPress={handlePurchase}
              >
                <Text style={{ color: "white" }}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 48,
                  minWidth: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleCancel}
              >
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textDecorationColor: "red",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: "100%",
    // padding: 12,
  },
  top: {
    // display: "flex",
    width: "100%",
    height: "30%",
    // justifyContent: "flex-end",
    // alignItems: "center",
    // flexDirection: "row",
    backgroundColor: "#192655",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  bottom: {
    width: "100%",
    height: "70%",
    paddingHorizontal: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  location: {
    textAlign: "right",
    color: "white",
    fontWeight: "bold",
  },
  date: {
    textAlign: "right",
    color: "white",
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
    borderColor: "#192655",
    borderWidth: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#192655",
  },
  notification: {
    position: "absolute",
    left: "5%",
    top: "30%",
  },
  bell: {
    height: 32,
    width: 32,
  },
});

export default Home;
