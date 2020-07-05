<template>
    <section body="body">
        <section class="search-bar">
            <input type="text" v-model="search" id="search">
            <button v-on:click="submitSearch">search</button>
        </section>
        <section class="recipes">
            <div>
                <Recipe v-for="recipe in $store.state.recipes" :key="recipe.id"
                :id="recipe.id"
                :thumbnail="(recipe.thumbnail)"
                :title="recipe.title"
                :previewText="recipe.previewText" />
            </div>
        </section>
    </section>
</template>

<script>
    import Recipe from '@/components/Recipe'
    import requests from '@/helpers/requests';

    export default {
        data: {
            search: ''
        },
        components: {
            Recipe
        },
        async fetch ({ store }) {
            await store.dispatch('searchRecipes', {query: 'apple'})
        }, 
        methods: {
            submitSearch: function (event) {
                this.$store.dispatch('searchRecipes', {query: this.search})
            }
        }
    }
</script>

<style scoped>
    .search-bar {
        margin: 1rem auto 3rem auto;
        display: table;
    }

    .recipes  {
        margin: 1rem auto 3rem auto;
        display: table;
    }

    .recipes div {
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
        flex-wrap: wrap;
        width: 53rem;
        height: 65rem;
    }
</style>
