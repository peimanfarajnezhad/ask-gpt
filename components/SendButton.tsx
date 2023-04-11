import { FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, View } from "react-native";

type Props = {
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
};

export const SendButton: FC<Props> = ({ loading, disabled, onPress }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginStart: 8,
            padding: 4,
          }}
        >
          {loading ? (
            <ActivityIndicator size={22} />
          ) : (
            <MaterialCommunityIcons
              size={22}
              name="send"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
