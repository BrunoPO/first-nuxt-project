<template>
    <nuxt-link :to="'/recipes/' + id">
        <article class="recipe">
            <div class="thumbnail" :style="thumbnail ? {backgroundImage: 'url(' + thumbnail + ')'} : {}"></div>
            <h1>{{ title }}</h1>
            <p>{{ previewText }}</p>
        </article>
    </nuxt-link>
</template>

<script>
    export default {
        props: ['thumbnail', 'title', 'previewText', 'id']
    }
</script>


<style scoped>
a {
    text-decoration: none;
    color: black;
}
.recipe {
    box-sizing: border-box;
    width: 280px;
    padding: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #aaa;
}

.thumbnail {
    background-image: url('https://i.pinimg.com/474x/1a/58/6f/1a586f2cc1bfe1e3adf83aeb3233a759.jpg');
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 200px;
}
</style>