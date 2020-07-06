<template>
    <section body="body">
        <h1>Your favorites</h1>
        <section class="recipes">
            <div>
                <Recipe v-for="recipe in recipes" :key="recipe.id"
                :id="recipe.id"
                :thumbnail="(recipe.thumbnail)"
                :title="recipe.title"
                :previewText="recipe.previewText" />
            </div>
        </section>
    </section>
</template>

<script>
import requests from '@/helpers/requests';
import Recipe from '@/components/recipes/RecipeTile';

export default {
  data: () => ({
    search: '',
  }),
  components: {
    Recipe,
  },
  async asyncData({ store }) {
    const recipes = await requests.get.Favorites(store);
    return { recipes };
  },
};
</script>

<style>
    h1 {
        text-align: center;
    }
</style>
