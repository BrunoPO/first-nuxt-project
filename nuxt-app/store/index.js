"use strict";

export const state = () => ({
  recipes: [],
  query: ""
})

export const mutations = {
  updateRecipes(state, data) {
    state.query = data.query;
    state.recipes = data.recipes;
  }
}

export const actions = {
  async searchRecipes ({state, commit}, { query, callback, callbackErr}) {
    var query = query;
    var requestObj = {
        "operationName": null,
        "query": "{recipes(query: \"" + query + "\") {id title thumbnail previewText}}",
        "variables": {}
    }

    if (state.query != query) {
      await fetch(getUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObj)
      }).then((response) => response.json()
      ).then((response) => {
        var data = {
          query: query,
          recipes: response.data.recipes
        }
        commit('updateRecipes', data)
        callback && callback(data);
      }).catch((err) => {
        callbackErr && callbackErr(err);
      })
    }
  }
}

function getUrl(...args) {
  var url = "http://localhost:4000";
  args.forEach((curr, index) => {
    if (index % 2 == 0) {
      url += "&" + curr + "="
    } else {
      url += curr
    }
  });
  return url;
}
