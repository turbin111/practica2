// src/store/diaryStore.js
import { defineStore } from 'pinia';

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    posts: [
      {
        id: 1,
        title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
        comments: [
          { id: 1, text: "Самый яркий комментарий в этом посте" },
          { id: 2, text: "Один из бессмысленный комментарий в этом посте" }
        ],
        isShow: false
      },
      {
        id: 2,
        title: "Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока.",
        comments: [
          { id: 1, text: "Очень научно и непонятно" },
        ],
        isShow: false
      }
    ]
  }),
  actions: {
    addPost(newPost) {
      this.posts.push(newPost);
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
    updatePost(postId, updatedTitle) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.title = updatedTitle;
      }
    },
    toggleComments(postId) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.isShow = !post.isShow;
      }
    },
    addComment(postId, commentText) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        const newComment = {
          id: post.comments.length + 1,
          text: commentText
        };
        post.comments.push(newComment);
      }
    },
    deleteComment(postId, commentId) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId);
      }
    }
  }
});
