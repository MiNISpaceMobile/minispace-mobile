import { useEffect, useState } from "react";

import EmptyListStatus from "./EmptyListStatus/EmptyListStatus";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import LoadingStatus from "./LoadingStatus/LoadingStatus";
import RenderedFlatList from "./RenderedFlatList/RenderedFlatList";
import Post from "../../../../interfaces/Post";

interface PostListProps {
  route: any;
  navigation: any;
}

const PostList = ({ route, navigation }: PostListProps) => {
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

    try {
      const response = await fetch(
        // TODO: change to backend URL and use auth
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
        throw new TypeError("Network request failed");
      }
    } catch {
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
    return <LoadingStatus loading={loading} />;
  } else if (isError) {
    return <ErrorStatus refreshing={refreshing} onRefresh={onRefresh} />;
  } else if (posts.length === 0) {
    return <EmptyListStatus refreshing={refreshing} onRefresh={onRefresh} />;
  } else {
    return (
      <RenderedFlatList
        route={route}
        navigation={navigation}
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        fetchNextPage={fetchNextPage}
        isLastPage={isLastPage}
        loading={loading}
      />
    );
  }
};
export default PostList;
