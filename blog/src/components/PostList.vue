<template>
  <div>
    <AddPost @addPost="handleAddPost" />
    <div v-for="post in posts" :key="post.id">
      <PostItem 
        :post="post" 
        @deletePost="handleDeletePost"
        @updatePost="handleUpdatePost"
        @toggleComments="handleToggleComments"
        @addComment="handleAddComment"
        @deleteComment="handleDeleteComment"
      />
    </div>
  </div>
</template>

<script>
import { useDiaryStore } from '@/store/diaryStore';
import PostItem from './PostItem.vue';
import AddPost from './AddPost.vue';

export default {
  components: {
    PostItem,
    AddPost
  },
  setup() {
    const diaryStore = useDiaryStore();

    const handleAddPost = (newPost) => {
      diaryStore.addPost(newPost);
    };

    const handleDeletePost = (postId) => {
      diaryStore.deletePost(postId);
    };

    const handleUpdatePost = (postId, updatedTitle) => {
      diaryStore.updatePost(postId, updatedTitle);
    };

    const handleToggleComments = (postId) => {
      diaryStore.toggleComments(postId);
    };

    const handleAddComment = (postId, commentText) => {
      diaryStore.addComment(postId, commentText);
    };

    const handleDeleteComment = (postId, commentId) => {
      diaryStore.deleteComment(postId, commentId);
    };

    return { 
      posts: diaryStore.posts, 
      handleAddPost,
      handleDeletePost,
      handleUpdatePost,
      handleToggleComments,
      handleAddComment,
      handleDeleteComment 
    };
  }
};
</script>
