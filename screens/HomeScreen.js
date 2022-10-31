import { Avatar } from "@rneui/base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomListItem from "../components/CustomListItem";
import {db} from "../config";
import { getAuth } from "firebase/auth";
import {firebase} from "../config";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe= db.collection("chats").onSnapshot(snapshot=>(
      setChats(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })))
    ));
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 20,

      }}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>

      </View>
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  }

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
    <SafeAreaView>
      <ScrollView style={styles.container}>
      {
        chats.map(({id, data:{chatName}})=>(
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))
      }
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
