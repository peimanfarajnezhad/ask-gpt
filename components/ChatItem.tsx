import { FC, PropsWithChildren, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

import { View, Text } from "./Themed";
import { useLocal } from "../utils/useLocal";
import OpenAiIcon from "../assets/svg/openai.svg";
import UserCircleIcon from "../assets/svg/user-circle.svg";

export interface MessageModel {
  id: string;
  content: string;
  created: number;
  role: ChatCompletionRequestMessageRoleEnum;
  isLoading?: boolean;
}

interface Props {
  data: MessageModel;
  style?: ViewStyle;
  key?: string;
}

interface ParentProps {
  assistant: boolean;
  key?: string;
  style?: ViewStyle;
}

const ChatParent: FC<PropsWithChildren<ParentProps>> = ({
  assistant,
  key,
  style = {},
  children,
}) => {
  return (
    <View
      key={key}
      style={{
        ...styles.parent,
        flexDirection: assistant ? "row-reverse" : "row",
        ...style,
      }}
    >
      <View style={styles.avatar}>
        {assistant ? (
          <OpenAiIcon style={{ margin: 2 }} width={34} height={34} />
        ) : (
          <UserCircleIcon width={38} height={38} />
        )}
      </View>

      <View
        style={{
          ...styles.messageContainer,
          marginStart: assistant ? 0 : 8,
          marginEnd: assistant ? 8 : 0,
          alignItems: assistant ? "flex-start" : "flex-end",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export const ChatItem: FC<Props> = ({ data, style = {}, key }) => {
  const local = useLocal();

  const isAssistant = useMemo(() => data.role === "assistant", [data]);
  const dateTime = useMemo(() => {
    const date = new Date(isAssistant ? data.created * 1000 : data.created);
    return date.toLocaleDateString(local, {
      dateStyle: "short",
      timeStyle: "short",
    });
  }, [data, isAssistant]);

  if (data.isLoading) {
    return (
      <ChatParent style={style} assistant={isAssistant} key={key}>
        <Text style={styles.message}>Responding...</Text>
      </ChatParent>
    );
  }

  return (
    <ChatParent style={style} assistant={isAssistant} key={key}>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>{data.content}</Text>
      </View>
      <Text style={styles.time}>{dateTime}</Text>
    </ChatParent>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: "flex",
  },
  messageContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  messageWrapper: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e2e2e2",
    width: "100%",
  },
  message: {
    fontSize: 14,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: 38,
    alignSelf: "flex-start",
    borderColor: "#e2e2e2",
  },
});
