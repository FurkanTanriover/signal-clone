import {
  KeyboarKeyboardAvoidingView,
  dAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { Button } from "@rneui/base";

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.helloContainer}>
        <Text style={{ fontSize: 20 }}> Hello</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {user.name}</Text>
      </View>
      <Button containerStyle={styles.button} onPress={signOutUser}>
        {" "}
        Log out
      </Button>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helloContainer: {
    flexDirection: "row",
  },
  button: {
    width: 200,
    borderWidth: 1,
    borderColor: "#2C6BED",
    marginTop: 10,
    borderRadius: 20,
  },
});
