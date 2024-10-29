<template>
  <div>
    <h1>Дневник постов</h1>
    
    <div>
      <input v-model="newPostTitle" placeholder="Введите заголовок поста" />
      <button @click="addPost">Добавить пост</button>
    </div>

    <div v-for="post in diaryStore.posts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <button @click="toggleComments(post.id)">Показать/Скрыть комментарии</button>
      <button @click="editPost(post.id)">Изменить пост</button>
      <button @click="deletePost(post.id)">Удалить пост</button>

      <div v-if="post.isShow">
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <p>{{ comment.text }}</p>
          <button @click="deleteComment(post.id, comment.id)">Удалить комментарий</button>
        </div>
        
        <input v-model="newCommentText" placeholder="Введите текст комментария" />
        <button @click="addComment(post.id)">Добавить комментарий</button>
      </div>
    </div>
    
    <div v-if="modalVisible">
      <textarea v-model="editPostTitle"></textarea>
      <button @click="savePost">Сохранить</button>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDiaryStore } from '../store/diaryStore';

export default {
  name: 'BlogHome',
  setup() {
    const diaryStore = useDiaryStore();
    const newPostTitle = ref('');
    const newCommentText = ref('');
    const modalVisible = ref(false);
    const editPostId = ref(null);
    const editPostTitle = ref('');

    const addPost = () => {
      const newPost = {
        id: Date.now(), // Генерация уникального ID
        title: newPostTitle.value,
        comments: [],
        isShow: false,
      };
      diaryStore.addPost(newPost);
      newPostTitle.value = ''; // Очищаем поле ввода
    };

    const deletePost = (postId) => {
      diaryStore.deletePost(postId);
    };

    const editPost = (postId) => {
      const post = diaryStore.posts.find(p => p.id === postId);
      if (post) {
        editPostId.value = postId;
        editPostTitle.value = post.title;
        modalVisible.value = true;
      }
    };

    const savePost = () => {
      diaryStore.updatePost(editPostId.value, editPostTitle.value);
      closeModal();
    };

    const closeModal = () => {
      modalVisible.value = false;
      editPostId.value = null;
      editPostTitle.value = '';
    };

    const toggleComments = (postId) => {
      diaryStore.toggleComments(postId);
    };

    const addComment = (postId) => {
      if (newCommentText.value) {
        diaryStore.addComment(postId, newCommentText.value);
        newCommentText.value = ''; // Очищаем поле ввода
      }
    };

    const deleteComment = (postId, commentId) => {
      diaryStore.deleteComment(postId, commentId);
    };

    return {
      diaryStore,
      newPostTitle,
      newCommentText,
      modalVisible,
      editPostTitle,
      addPost,
      deletePost,
      editPost,
      savePost,
      closeModal,
      toggleComments,
      addComment,
      deleteComment,
    };
  }
};
</script>

<style>
.post {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}

.comment {
  margin-left: 20px;
}
</style>
