import { Text, View, StyleSheet } from "react-native";

interface PostProps {
  item: {
    title: string;
    body: string;
  };
}

export default function Post({ item }: PostProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "antiquewhite",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 4,
  },
});
