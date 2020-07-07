const recipeAPI = require('./recipe');

const favoriteAPI = {
  getFavorites: (_context, _params, { req }) => {
    const favorites = req.session.favorites || {};
    return Object.keys(favorites).map((id) => recipeAPI.recipe(null, { id }));
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

module.exports = favoriteAPI;
