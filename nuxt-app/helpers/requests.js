import CONSTANTS from '@/helpers/constants';

const requests = {
  generic: {
    query(query) {
      const requestObj = {
        operationName: null,
        variables: {},
        query,
      };

      return fetch(CONSTANTS.API_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'localhost:3000',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(requestObj),
      }).then((response) => response.json()).catch(() => undefined);
    },
  },
  get: {
    async Recipe({ store, params }) {
      if (params.id && store.state.query) {
        const query = `{recipe(id: "${params.id}") {id title thumbnail previewText}}`;
        return requests.generic.query(query)
          .then((response) => response.data.recipe);
      }
      return undefined;
    },
    async Recipes(searchQuery, originalFrom) {
      const from = originalFrom || 0;
      const query = `{recipes(query: "${searchQuery}", from:${from} , pageSize: 12) {id title thumbnail previewText}}`;
      return requests.generic.query(query)
        .then((response) => response.data.recipes);
    },
    async Favorites() {
      const query = 'query {getFavorites{id title thumbnail previewText}}';
      return requests.generic.query(query)
        .then((response) => response.data?.getFavorites);
    },
  },
  add: {
    async Favorite(id) {
      const query = `query {addFavorite(id: "${id}")}`;
      return requests.generic.query(query)
        .then((response) => response.data.addFavorite);
    },
  },
  remove: {
    async Favorite(id) {
      const query = `query {removeFavorite(id: "${id}")}`;
      return requests.generic.query(query)
        .then((response) => response.data.removeFavorite);
    },
  },
};

export default requests;
