import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "@rneui/base";
import {db} from "../config";
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, []);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View>
      <View style={styles.container}>
        <Input
          placeholder="Enter a chat name"
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={createChat}
          leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
        />
        <Button disabled={!input} onPress={createChat} title="Create new Chat" />
      </View>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: "10%",
        height: "100%",

    }
});
