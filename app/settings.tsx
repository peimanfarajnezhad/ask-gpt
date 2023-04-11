import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, TextInput, Button } from "react-native";

import { StoreContext } from "../store";
import { Text, View } from "../components/Themed";
import { getFromStore, saveToStore, StoreKeysEnum } from "../utils/store";

export default function ModalScreen() {
  const navigation = useNavigation();
  const {
    apiKey,
    organizationId: orgnazationId,
    setApiKey,
    setOrganizationId: setOrgnazationId,
  } = useContext(StoreContext);

  const [apiVal, setApiVal] = useState<string | undefined>(apiKey);
  const [orgVal, setOrgVal] = useState<string | undefined>(orgnazationId);

  const initData = async () => {
    getFromStore(StoreKeysEnum.ORGANIZATION_ID).then(setOrgnazationId);
    getFromStore(StoreKeysEnum.API_KEY).then(setApiKey);
  };

  const saveKeys = async () => {
    await saveToStore(StoreKeysEnum.API_KEY, apiVal ?? "");
    await saveToStore(StoreKeysEnum.ORGANIZATION_ID, orgVal ?? "");

    setApiKey && setApiKey(apiVal ?? "");
    setOrgnazationId && setOrgnazationId(orgVal ?? "");

    navigation.goBack();
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organization ID: </Text>
      <TextInput
        value={orgVal}
        style={styles.textInput}
        onChangeText={(val) => setOrgVal(val)}
        placeholder="Enter your organization ID from OpenAI dashboard"
      />

      <Text style={styles.title}>API Key: </Text>
      <TextInput
        value={apiVal}
        style={styles.textInput}
        onChangeText={(val) => setApiVal(val)}
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
