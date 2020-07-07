import requests from '@/helpers/requests';

export const state = () => ({
  recipes: [],
  favorites: [],
  query: '',
});

export const mutations = {
  updateRecipes(_, params) {
    this.state.query = params.query;
    this.state.recipes = params.recipes;
  },
  addFavorite(_, favorites) {
    this.state.favorites = favorites;
  },
  updateFavorites(_, favorites) {
    this.state.favorites = favorites;
  },
};

export const actions = {
  async searchRecipes({ commit }, { query }) {
    if (this.state.query !== query) {
      const recipes = await requests.get.Recipes(query);
      const params = {
        query,
        recipes,
      };

      commit('updateRecipes', params);
    }
  },
  async loadMore({ commit }) {
    const recipes = await requests.get.Recipes(this.state.query, this.state.recipes.length);
    const params = {
      query: this.state.query,
      recipes: this.state.recipes.concat(recipes),
    };
    commit('updateRecipes', params);
  },
  async addFavorite({ commit }, { id }) {
    const favorites = await requests.add.Favorite(id);
    commit('updateFavorites', favorites);
  },
  async removeFavorite({ commit }, { id }) {
    const favorites = await requests.delete.Favorite(id);
    commit('updateFavorites', favorites);
  },
  updateFavorites({ commit }, { updateFavorites }) {
    commit('updateFavorites', updateFavorites);
  },
};
