import requests from '@/helpers/requests';

export const state = () => ({
  recipes: [],
  wishlist: {},
  query: '',
});

export const mutations = {
  updateRecipes(_, params) {
    this.state.query = params.query;
    this.state.recipes = params.recipes;
  },
  addFavorite(_, params) {
    if (!this.state.wishlist[params.id]) {
      this.state.wishlist[params.id] = true;
    }
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
  addFavorite({ commit }, params) {
    commit('addFavorite', params);
  },
};
