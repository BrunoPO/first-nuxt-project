import requests from '@/helpers/requests';

export const state = () => ({
  recipes: [],
  query: '',
});

export const mutations = {
  updateRecipes(_state, data) {
    this.state.query = data.query;
    this.state.recipes = data.recipes;
  },
};

export const actions = {
  async searchRecipes({ commit }, { query }) {
    if (this.state.query !== query) {
      const recipes = await requests.get.Recipes(query);
      const data = {
        query,
        recipes,
      };

      commit('updateRecipes', data);
    }
  },
  async loadMore({ commit }) {
    const recipes = await requests.get.Recipes(this.state.query, this.state.recipes.length);
    const data = {
      query: this.state.query,
      recipes: this.state.recipes.concat(recipes),
    };

    commit('updateRecipes', data);
  },
};
