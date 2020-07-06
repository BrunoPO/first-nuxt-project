<template>
    <section body="body">
        <section class="centralize-content search-bar">
            <input type="text" v-model="search" id="search">
            <button v-on:click="submitSearch">search</button>
        </section>
        <section class="centralize-content recipes">
            <div>
                <Recipe v-for="recipe in $store.state.recipes" :key="recipe.id"
                :id="recipe.id"
                :thumbnail="(recipe.thumbnail)"
                :title="recipe.title"
                :previewText="recipe.previewText" />
            </div>
        </section>
        <section class="centralize-content load-more">
            <button v-on:click="loadMore">load more</button>
        </section>
    </section>
</template>

<script>
import Recipe from '@/components/recipes/RecipeTile';

export default {
  data: () => ({
    search: '',
  }),
  components: {
    Recipe,
  },
  methods: {
    submitSearch() {
      this.$store.dispatch('searchRecipes', { query: this.search });
    },
    loadMore() {
      this.$store.dispatch('loadMore', { query: this.$store.state.query });
    },
  },
  async fetch({ store }) {
    await store.dispatch('searchRecipes', { query: 'apple' });
  },
};
</script>

<style scoped>
    .centralize-content{
        margin: 1rem auto 3rem auto;
        display: table;
    }
</style>
