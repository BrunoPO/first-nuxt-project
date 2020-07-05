import CONSTANTS from '@/helpers/constants';

export default {
  get: {
    async Recipe({ store, params }) {
      if (params.id && store.state.query) {
        const requestObj = {
          operationName: null,
          query: `{recipe(id: "${params.id}") {id title thumbnail previewText}}`,
          variables: {},
        };

        return fetch(CONSTANTS.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestObj),
        }).then((response) => response.json())
          .then((response) => response.data.recipe).catch(() => undefined);
      }
      return undefined;
    },
    async Recipes(query, originalFrom) {
      const from = originalFrom || 0;
      const requestObj = {
        operationName: null,
        query: `{recipes(query: "${query}", from:${from} , pageSize: 12) {id title thumbnail previewText}}`,
        variables: {},
      };

      return fetch(CONSTANTS.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObj),
      }).then((response) => response.json())
        .then((response) => response.data.recipes).catch(() => undefined);
    },
  },
};
