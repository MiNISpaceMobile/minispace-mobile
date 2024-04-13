import { useEffect } from "react";

import EmptyListStatus from "./EmptyListStatus/EmptyListStatus";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import LoadingStatus from "./LoadingStatus/LoadingStatus";
import RenderedFlatList from "./RenderedFlatList/RenderedFlatList";
import { usePostsStore } from "../../../../zustand/posts";

interface PostListProps {
  route: any;
  navigation: any;
}

const PostList = ({ route, navigation }: PostListProps) => {
  const posts = usePostsStore((state) => state.posts);
  const error = usePostsStore((state) => state.error);
  const loading = usePostsStore((state) => state.loading);
  const page = usePostsStore((state) => state.page);
  const isLastPage = usePostsStore((state) => state.isLastPage);
  const refresh = usePostsStore((state) => state.refresh);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  const onRefresh = () => {
    refresh();
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading && page === 0) {
    return <LoadingStatus loading={loading} />;
  } else if (error) {
    return <ErrorStatus refreshing={loading} onRefresh={onRefresh} />;
  } else if (posts.length === 0) {
    return <EmptyListStatus refreshing={loading} onRefresh={onRefresh} />;
  } else {
    return (
      <RenderedFlatList
        route={route}
        navigation={navigation}
        posts={posts}
        refreshing={loading}
        onRefresh={onRefresh}
        fetchNextPage={fetchPosts}
        isLastPage={isLastPage}
        loading={loading}
      />
    );
  }
};
export default PostList;
