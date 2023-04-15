import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View } from "../../components/Themed";
import { ExternalLink } from "../../components/ExternalLink";

const GithubLinkButton = () => {
  return (
    <ExternalLink
      style={{ marginTop: 24, fontSize: 14 }}
      href="https://github.com/peimanfarajnezhad/ask-gpt"
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text darkColor="#0969da" lightColor="#0969da">
          Source Code
        </Text>
        <FontAwesome
          name="github"
          size={16}
          style={{ marginStart: 8, color: "#0969da" }}
        />
      </View>
    </ExternalLink>
  );
};

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Author: <Text style={{ fontWeight: "bold" }}>Peiman Farajnezhad</Text>
      </Text>

      <GithubLinkButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "normal",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
