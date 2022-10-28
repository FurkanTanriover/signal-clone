import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Button, Input, Text } from "@rneui/base";
import { firebase } from "../config";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        firebase.auth.currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:process.env.FIREBASE_AUTH_DOMAIN
        })
      })
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name: fullName,
            email: email,
          })
          .then(() => {
            navigation.navigate("Login");
            alert("User Created");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          onSubmitEditing={register}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
      </View>
      <Button style={styles.button} raised onPress={register} title="Register" />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
  },
});
