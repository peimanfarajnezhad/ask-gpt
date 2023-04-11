import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, Button } from "react-native";

import { Text, View } from "../components/Themed";
import { getFromStore, saveToStore, StoreKeysEnum } from "../utils/store";

export default function ModalScreen() {
  const navigation = useNavigation();

  const [orgnazationId, setOrganazationId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const initData = async () => {
    getFromStore(StoreKeysEnum.ORGANIZATION_ID).then(setOrganazationId);
    getFromStore(StoreKeysEnum.API_KEY).then(setApiKey);
  };

  const saveKeys = async () => {
    await saveToStore(StoreKeysEnum.ORGANIZATION_ID, orgnazationId);
    await saveToStore(StoreKeysEnum.API_KEY, apiKey);
    navigation.goBack();
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organization ID: </Text>
      <TextInput
        value={orgnazationId}
        style={styles.textInput}
        onChangeText={(val) => setOrganazationId(val)}
        placeholder="Enter your organization ID from OpenAI dashboard"
      />

      <Text style={styles.title}>API Key: </Text>
      <TextInput
        value={apiKey}
        style={styles.textInput}
        onChangeText={(val) => setApiKey(val)}
        placeholder="Enter you api key from OpenAi dashboard"
      />

      <View style={styles.button}>
        <Button onPress={saveKeys} title="Save" />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: "normal",
  },
  textInput: {
    marginTop: 8,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 16,
  },
});
