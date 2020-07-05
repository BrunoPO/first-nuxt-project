<template>
    <nuxt-link :to="'/recipes/' + id">
        <article class="recipe" :id="id">
            <div class="thumbnail" :style="thumbnail ? {backgroundImage: 'url(' + thumbnail + ')'} : {}"></div>
            <h1>{{ title }}</h1>
            <p>{{ previewText }}</p>
        </article>
    </nuxt-link>
</template>

<script>
export default {
  props: ['thumbnail', 'title', 'previewText', 'id'],
};
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
        display: inline-flex;
    }
    .recipe {
        box-sizing: border-box;
        width: 280px;
        padding: 8px;
        border: 0px solid #ccc;
    }

    .thumbnail {
        background-image: url('https://i.pinimg.com/474x/1a/58/6f/1a586f2cc1bfe1e3adf83aeb3233a759.jpg');
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 200px;
    }
</style>
