const { getUrl, requisition, updateRecipes } = require('../../helpers/helpers');

const searchRecipesUrl = 'https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9';

module.exports = {
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
  recipe: (_context, { query, id }) => {
    const url = getUrl(searchRecipesUrl, ['q', query, 'from', id, 'to', Number(id) + 1]);
    return requisition(url).then((data) => {
      if (data.count) {
        const response = updateRecipes(data.hits, id);
        if (response.length) {
          const recipe = response[0];
          recipe.id = id;
          return recipe;
        }
      }
      return undefined;
    });
  },
};
