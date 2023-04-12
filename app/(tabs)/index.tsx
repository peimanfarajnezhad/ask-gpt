import { get } from "radash";
import { useContext, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";

import { useApi } from "../../api";
import { StoreContext } from "../../store";
import { Text, View } from "../../components/Themed";
import { ChatInput } from "../../components/ChatInput";
import { ChatItem, MessageModel } from "../../components/ChatItem";

let uniqueId = 1;

export default function TabChatScreen() {
  const { organizationId: organizationId, apiKey } = useContext(StoreContext);
  const { request: requestFn } = useApi(organizationId, apiKey);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<MessageModel>>([]);

  const _keyExtractor = (m: MessageModel, i: number) => `item-${i}-${m.id}`;

  const _renderItem: ListRenderItem<MessageModel> = ({ item }) => (
    <ChatItem data={item} style={{ marginBottom: 16 }} />
  );

  const clearInput = () => {
    setValue("");
  };

  const request = async (q: string) => {
    const userMessage: MessageModel = {
      id: `${uniqueId++}`,
      content: q,
      role: "user",
      created: Date.now(),
    };

    try {
      setLoading(true);
      if (requestFn) {
        const requestMessage: ChatCompletionRequestMessage[] = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: q },
        ];

        const { data } = await requestFn(requestMessage);
        const m = data.choices[0].message;

        if (m) {
          const response: MessageModel = {
            id: data.id,
            created: data.created,
            ...m,
          };

          setMessages((oldMessages) => [...oldMessages, userMessage, response]);
          clearInput();
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
      <View style={{ ...styles.container, padding: 16 }}>
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

      <ChatInput
        value={value}
        loading={loading}
        placeholder="Ask you question..."
        onSubmitEditing={request}
        onChangeText={(val) => setValue(val)}
      />
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
