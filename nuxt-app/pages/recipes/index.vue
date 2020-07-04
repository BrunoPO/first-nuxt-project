<template>
    <section class="recipes">
        <Recipe v-for="recipe in $store.state.recipes" :key="recipe.id"
        :id="recipe.id"
        :thumbnail="(recipe.thumbnail)"
        :title="recipe.title"
        :previewText="recipe.previewText" />
    </section>
</template>

<script>
    import Recipe from '@/components/Recipe'
    export default {
        components: {
            Recipe
        },
        async fetch ({ store }) {
            await store.dispatch('searchRecipes', {query: 'apple'})
        }
    }
</script>

<style scoped>
    .recipes {
        display: flex;
        flex-flow: row wrap;
    }
</style>
