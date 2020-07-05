"use strict";

import requests from '@/helpers/requests';

export const state = () => ({
  recipes: [],
  query: "",
})

export const mutations = {
  updateRecipes(state, data) {
    state.query = data.query;
    state.recipes = data.recipes;
  }
}

export const actions = {
  async searchRecipes ({ state, commit }, { query }) {
    if (state.query != query) {
      var recipes = await requests.get.Recipes(query)
      var data = {
        query: query,
        recipes: recipes
      }

      commit('updateRecipes', data)
    }
  },
  async loadMore ({ commit }) {
    var recipes = await requests.get.Recipes(this.state.query, this.state.recipes.length);
    var data = {
      query: this.state.query,
      recipes: this.state.recipes.concat(recipes)
    }

    commit('updateRecipes', data)
  }
}
