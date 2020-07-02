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
  async searchRecipes ({state, commit}, { query, callback}) {
    var query = query || 'apple';

    if (state.query != query) {
      await fetch(getUrl("q", query))
      .then((response) => response.json()
      ).then((data) => {
        var data = {
          query: query,
          recipes: filterData(data.hits)
        }
        commit('updateRecipes', data)
        callback && callback(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}

function getUrl(...args) {
  var url = "https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9";
  args.forEach((curr, index) => {
    if (index % 2 == 0) {
      url += "&" + curr + "="
    } else {
      url += curr
    }
  });
  console.log(url)
  return url;
}

function filterData(hits) {
  if (!hits) {
    return undefined;
  }
  var hits = hits.map((obj, index) => {
      var orirecipe = obj.recipe
      return {
          id: index,
          thumbnail: orirecipe.image,
          previewText: orirecipe.source,
          title: orirecipe.label
      };
  });
  return hits;
}
