import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Text, StyleSheet, ActivityIndicator, View } from "react-native";
import Post from "./Post";

export default function Posts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>An error has occurred: {error.message}</Text>;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <Post item={item} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={200}
      contentContainerStyle={{
        padding: 16,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
