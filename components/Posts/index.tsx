import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Text, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Post from "./Post";

const apiUrl = "https://jsonplaceholder.typicode.com";
const perPage = 10;

export default function Posts() {
  const insets = useSafeAreaInsets();

  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    console.log("pageParam: ", pageParam);
    try {
      const response = await fetch(
        `${apiUrl}/posts?_page=${pageParam}&_limit=${perPage}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>An error has occurred: {error.message}</Text>;
  }

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  const posts = data?.pages.flatMap((page) => page);

  const keyExtractor = (item: any) => item.id.toString();

  return (
    <FlashList
      data={posts}
      renderItem={Post}
      keyExtractor={keyExtractor}
      estimatedItemSize={200}
      contentContainerStyle={{
        padding: 16,
        paddingTop: insets.top,
      }}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
    />
  );
}
