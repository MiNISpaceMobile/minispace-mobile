import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import PostListItem from "./PostListItem/PostListItem";
import Post from "../../../../interfaces/Post";

interface PostListProps {
  route: any;
  navigation: any;
}

const PostList = ({ route, navigation }: PostListProps) => {
  const theme = useTheme();

  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPosts = async (page: number) => {
    if (isLastPage && page !== 0) {
      return;
    }

    setLoading(true);

    const response = await fetch(
      `http://192.168.0.18:8000/posts?page=${page}`,
      {
        method: "GET",
      },
    );

    if (response.ok) {
      const data = await response.json();

      if (data.length === 0) {
        setIsLastPage(true);
      }

      setPosts((oldPosts) => (page === 0 ? data : oldPosts.concat(data)));
      setIsError(false);
    } else {
      setCurrentPage(0);
      setIsError(true);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setIsLastPage(false);
    setCurrentPage(0);
    fetchPosts(0);
  };

  const fetchNextPage = () => {
    fetchPosts(currentPage + 1);
    setCurrentPage((oldCurrentPage) => oldCurrentPage + 1);
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  if (loading && currentPage === 0) {
    return (
      <View
        style={{
          padding: 30,
        }}
      >
        <ActivityIndicator
          animating={loading}
          size={48}
          color={theme.colors.secondary}
        />
      </View>
    );
  } else if (isError) {
    return (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <Text
          style={{
            padding: 30,
            minHeight: "100%",
            color: theme.colors.error,
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          Problem z wczytaniem danych.
        </Text>
      </RefreshControl>
    );
  } else if (posts.length === 0) {
    return (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <Text
          style={{
            padding: 30,
            minHeight: "100%",
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          Nie znaleziono żadnego postu.
        </Text>
      </RefreshControl>
    );
  } else {
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem post={item} route={route} navigation={navigation} />
        )}
        keyExtractor={(post: Post) => post.id}
        contentContainerStyle={{
          flexGrow: 1,
          overflow: "visible",
          minHeight: "100%",
          padding: 30,
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          !isLastPage ? (
            <ActivityIndicator
              animating={loading}
              size={48}
              color={theme.colors.secondary}
            />
          ) : null
        }
      />
    );
  }
};
export default PostList;
