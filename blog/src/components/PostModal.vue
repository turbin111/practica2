<template>
  <div class="modal">
    <textarea v-model="title"></textarea>
    <button @click="savePost">Сохранить</button>
    <button @click="$emit('close')">Закрыть</button>
  </div>
</template>

<script>
export default {
  props: {
    initialTitle: String
  },
  data() {
    return {
      title: this.initialTitle
    };
  },
  methods: {
    savePost() {
      this.$emit('save', this.title);
    }
  }
};
</script>

<style>
.modal {
  /* Стили для модального окна */
}
</style>
