<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <CommentItem :comment="comment" @deleteComment="deleteComment" />
    </div>
    <input v-model="newComment" placeholder="Напишите комментарий" />
    <button @click="addComment">Добавить комментарий</button>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue';

export default {
  components: {
    CommentItem
  },
  props: {
    comments: Array
  },
  data() {
    return {
      newComment: ''
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.$emit('addComment', this.newComment);
        this.newComment = '';
      }
    },
    deleteComment(commentId) {
      this.$emit('deleteComment', commentId);
    }
  }
};
</script>
