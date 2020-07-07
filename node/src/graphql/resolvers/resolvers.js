const favorites = require('../queries/favorites');
const recipe = require('../queries/recipe');

module.exports = {
  Query: {
    ...recipe,
    ...favorites,
  },
};
