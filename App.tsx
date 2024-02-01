import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import Home from "./src/screens/home";

const firebaseConfig = {
  apiKey: "AIzaSyB0GLGAmxk2m5eX9ZlZ9wChcKmwvnpfkOw",
  authDomain: "smart-water-meter-fd55c.firebaseapp.com",
  databaseURL:
    "https://smart-water-meter-fd55c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smart-water-meter-fd55c",
  storageBucket: "smart-water-meter-fd55c.appspot.com",
  messagingSenderId: "145029242337",
  appId: "1:145029242337:web:c5e7a089a2f823b3bbc6a0",
};

const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#192655" style="light" />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    height: "100%",
    width: "100%",
  },
});
