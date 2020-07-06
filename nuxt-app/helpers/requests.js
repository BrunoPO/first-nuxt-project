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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObj),
      }).then((response) => response.json())
        .catch(() => undefined);
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
    async Favorites(store) {
      let query = '';
      Object.keys(store.state.wishlist).forEach((curr, index) => {
        query += `Index${index}: recipe(id: "${curr}") {id title thumbnail previewText}`;
      });
      query = `{${query}}`;
      return requests.generic.query(query)
        .then((response) => Object.values(response.data));
    },
  },
};

export default requests;
