const { getUrl, requisition, updateRecipes } = require('../../helpers/helpers');

const searchRecipesUrl = 'https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9';

function treatRecipeId(id) {
  const array = id.split('|');
  return {
    index: array[0],
    externalId: array[1],
    query: array[2],
  };
}

const recipeAPI = {
  recipes: (_context, { query, from, pageSize }) => {
    let initialPage = 0;
    const UrlParams = ['q', query];

    if (typeof from === 'number') {
      UrlParams.push('from');
      UrlParams.push(from);
      initialPage = from;
    }

    if (typeof pageSize === 'number') {
      UrlParams.push('to');
      UrlParams.push(initialPage + pageSize);
    }

    const url = getUrl(searchRecipesUrl, UrlParams);

    return requisition(url).then((data) => {
      let response = [];
      if (data.count) {
        response = data.hits;
      }
      return updateRecipes(response, initialPage);
    });
  },
  recipe: (_context, { id }) => {
    const { index, query } = treatRecipeId(id);
    const url = getUrl(searchRecipesUrl, ['q', query, 'from', index, 'to', Number(index) + 1]);
    return requisition(url).then((data) => {
      if (data.count) {
        const response = updateRecipes(data.hits, index);
        if (response.length) {
          const recipe = response[0];
          recipe.id = id;
          return recipe;
        }
      }
      return undefined;
    });
  },
  getFavorites: (_context, _params, { req }) => {
    const favorites = req.session.favorites || {};
    const test = Object.keys(favorites).map((id) => recipeAPI.recipe(null, { id }));
    return test;
  },
  addFavorite: (_context, { id }, { req }) => {
    const favorites = req.session.favorites || {};
    if (!favorites[id]) {
      favorites[id] = true;
    }
    req.session.favorites = favorites;
    return Object.keys(favorites);
  },
  removeFavorite: (_context, { id }, { req }) => {
    const favorites = req.session.favorites || {};
    if (favorites[id]) {
      delete favorites[id];
    }
    req.session.favorites = favorites;
    return Object.keys(favorites);
  },
};

module.exports = recipeAPI;
