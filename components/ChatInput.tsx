import { FC, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { SendButton } from "./SendButton";
import { TextInput, View, useThemeColor } from "./Themed";

interface Props {
  value: string;
  loading: boolean;
  placeholder: string;
  onChangeText: (val: string) => void;
  onSubmitEditing: (q: string) => void;
}

export const ChatInput: FC<Props> = ({
  value,
  loading,
  placeholder,
  onChangeText,
  onSubmitEditing,
}) => {
  const textDisabledColor = useThemeColor({}, "textDisabled");

  const isDisabled = useMemo(
    () => loading || !(value && value.trim().length > 0),
    [value]
  );
  const textInputStyle = useMemo(
    () =>
      isDisabled ? { ...styles.input, color: textDisabledColor } : styles.input,
    [isDisabled]
  );

  const handleSubmitEditing = () => {
    if (value && value.length > 0) {
      onSubmitEditing(value);
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        editable={!loading}
        returnKeyType="search"
        style={textInputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmitEditing}
      />

      <SendButton
        loading={loading}
        disabled={isDisabled}
        onPress={handleSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#e2e2e2",
  },
  input: {
    padding: 12,
    flex: 1,
  },
});
