<template>
  <div class="recipe" :id="id">
    <div class="badge">
      <button v-on:click="addFavorite(id)">Favorite</button>
    </div>
    <nuxt-link :to="'/recipes/' + id">
      <article>
          <div class="thumbnail" :style="thumbnail ? {backgroundImage: 'url(' + thumbnail + ')'} : {}"></div>
          <h1>{{ title }}</h1>
          <p>{{ previewText }}</p>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['thumbnail', 'title', 'previewText', 'id'],
  methods: {
    addFavorite(id) {
      this.$store.dispatch('addFavorite', { id });
    },
  },
};
</script>

<style scoped>
  .badge {
    position: absolute;
  }

  .recipe {
    display: inline-flex;
    width: fit-content;
    padding: 8px;
  }

  .recipe a {
    text-decoration: none;
    color: black;
  }

  .recipe article{
    box-sizing: border-box;
    width: 280px;
    border: 0px solid #ccc;
    display: flexbox;
    flex-flow: row wrap;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .thumbnail {
    background-image: url('https://i.pinimg.com/474x/1a/58/6f/1a586f2cc1bfe1e3adf83aeb3233a759.jpg');
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 200px;
  }
</style>
