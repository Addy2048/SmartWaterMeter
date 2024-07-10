import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import dayjs from "dayjs";
import AccountInfo from "../components/account-info";
import UnitDisplay from "../components/unit-display";

export interface User {
  id?: string; // MongoDB ObjectId as a string
  uuid?: string;
  fullName?: string;
  phoneNumber?: string;
  countryCode?: string;
  countryCodeName?: string;
  email?: string; // optional property
  password?: string;
  passwordResetCode?: string;
  role?: number; // 1 System Admin, 2 Cashier
  available?: number; // optional property
  consumed?: number; // optional property
  createdAt?: Date; // Date object for createdAt
}

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [unitAmount, setUnitAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showLoginModal = !user ? true : false;

  const handlePurchase = async () => {
    try {
      const val = Number(unitAmount);

      const response = await fetch(
        `https://etag-api.onrender.com/api/user/buy-units?userId=${user?.uuid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ units: val }),
        }
      );

      if (!response.ok) {
        throw new Error("Error buying units. Please try again.");
      }

      const userRes: User = await response.json();
      setUser(userRes);
      closeModal();
      setUnitAmount("");
    } catch (err) {
      console.error({ err });
      Alert.alert("Oups", "Error buying units. Try again");
    }
  };

  const handleReload = async () => {
    try {
      const response = await fetch(
        `https://etag-api.onrender.com/api/user?userId=${user?.uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error reloading. Please try again.");
      }

      const userRes: User = await response.json();
      setUser(userRes);
      closeModal();
      setUnitAmount("");
    } catch (err) {
      console.error({ err });
      Alert.alert("Oups", "Error reloading. Try again");
    }
  };

  const handleLogin = async () => {
    try {
      const payload = { phoneNumber, password };

      const response = await fetch(
        "https://etag-api.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error logging in. Please try again.");
      }

      const user: User = await response.json();

      setUser(user);
    } catch (err) {
      console.error(err);
      Alert.alert("Oups", "Error logging in. Try again");
    }
  };

  const handleCancel = () => {
    setUnitAmount(""), closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AccountInfo user={user} />
        <View>
          <Text style={styles.location}>Dar es Salaam, Tanzania</Text>
          <Text style={styles.date}>{dayjs().format("MMMM DD, YYYY")}</Text>
        </View>
        <TouchableOpacity style={styles.notification} onPress={handleReload}>
          <Image
            style={styles.bell}
            source={require("../../assets/bell.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <UnitDisplay
          availableUnits={user?.available || 0}
          consumedUnits={user?.consumed || 0}
        />

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
      <Modal
        visible={showLoginModal}
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
              LOGIN
            </Text>

            <Text style={{ fontSize: 16 }}>Phone Number</Text>
            <TextInput
              placeholder="Phone Number (eg. 762..)"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={{
                borderWidth: 2,
                borderColor: "#192655", // Border color
                marginBottom: 20,
                paddingHorizontal: 15,
                paddingVertical: 5,
                height: 48,
                borderRadius: 4,
                fontSize: 16,
                marginTop: 12,
              }}
            />

            <Text style={{ fontSize: 16 }}>Password</Text>
            <TextInput
              placeholder="Password"
              // keyboardType="password"
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                borderWidth: 2,
                borderColor: "#192655", // Border color
                marginBottom: 20,
                paddingHorizontal: 15,
                paddingVertical: 5,
                height: 48,
                borderRadius: 4,
                fontSize: 16,
                marginTop: 12,
              }}
            />

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
              onPress={handleLogin}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
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
  loginView: {
    padding: 12,
  },
});

export default Home;
