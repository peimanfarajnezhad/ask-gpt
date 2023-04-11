import { get } from "radash";
import { useContext, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { StyleSheet, FlatList, ListRenderItem, TextInput } from "react-native";

import { useApi } from "../../api";
import { StoreContext } from "../../store";
import { Text, View } from "../../components/Themed";
import { SendButton } from "../../components/SendButton";

export default function TabChatScreen() {
  const { organizationId: organizationId, apiKey } = useContext(StoreContext);
  const { request: requestFn } = useApi(organizationId, apiKey);

  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<ChatCompletionRequestMessage>>(
    []
  );

  const _keyExtractor = (m: ChatCompletionRequestMessage, i: number) =>
    `item-${i}`;

  const _renderItem: ListRenderItem<ChatCompletionRequestMessage> = ({
    item,
  }) => {
    if (item.role === "assistant") {
      return <Text style={styles.assistantItem}>{item.content}</Text>;
    } else {
      return <Text style={styles.userItem}>{item.content}</Text>;
    }
  };

  const request = async () => {
    try {
      setLoading(true);
      if (requestFn) {
        const newMessages: ChatCompletionRequestMessage[] = [
          ...messages,
          { role: "user", content: q },
        ];

        const { data } = await requestFn(newMessages);
        const response = data.choices[0].message;

        if (response) {
          setMessages([...newMessages, response]);
          setQ("");
        }
      }
    } catch (e) {
      alert(get(e, "message", "Unknown Error"));
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey || !organizationId) {
    return (
      <View style={styles.container}>
        <Text>Please save your Organization and ApiKey in setting</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        style={styles.list}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />

      <View style={styles.inputWrapper}>
        <TextInput
          value={q}
          editable={!loading}
          returnKeyType="search"
          onSubmitEditing={request}
          placeholder="Please ask ..."
          onChangeText={(q) => setQ(q)}
          style={loading ? { ...styles.input, color: "#e2e2e2" } : styles.input}
        />

        <SendButton
          loading={loading}
          onPress={request}
          disabled={!(q && q.trim().length > 0)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  list: {},
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#e2e2e2",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  assistantItem: {
    marginBottom: 12,
  },
  userItem: {
    marginBottom: 12,
  },
  input: {
    padding: 12,
    flex: 1,
  },
});
