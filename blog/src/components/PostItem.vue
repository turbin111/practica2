<template>
  <div>
    <h3>{{ post.title }}</h3>
    <button @click="deletePost(post.id)">Удалить пост</button>
    <button @click="openEditModal(post.title)">Изменить пост</button>
    <button @click="toggleComments(post.id)">
      {{ post.isShow ? 'Скрыть комментарии' : 'Показать комментарии' }}
    </button>

    <PostModal 
      v-if="showModal" 
      :initialTitle="post.title" 
      @close="closeEditModal" 
      @save="updatePost" 
    />

    <CommentList 
      v-if="post.isShow" 
      :comments="post.comments" 
      @addComment="addComment"
      @deleteComment="deleteComment" 
    />
  </div>
</template>

<script>
import PostModal from './PostModal.vue';
import CommentList from './CommentList.vue';

export default {
  components: {
    PostModal,
    CommentList
  },
  props: {
    post: Object
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    deletePost(postId) {
      this.$emit('deletePost', postId);
    },
    openEditModal(initialTitle) {
      this.showModal = true;
      this.initialTitle = initialTitle;
    },
    closeEditModal() {
      this.showModal = false;
    },
    updatePost(updatedTitle) {
      this.$emit('updatePost', this.post.id, updatedTitle);
      this.closeEditModal();
    },
    toggleComments(postId) {
      this.$emit('toggleComments', postId);
    },
    addComment(commentText) {
      this.$emit('addComment', this.post.id, commentText);
    },
    deleteComment(commentId) {
      this.$emit('deleteComment', this.post.id, commentId);
    }
  }
};
</script>
