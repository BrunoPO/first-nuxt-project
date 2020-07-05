import CONSTANTS from '@/helpers/constants';

export default {
    get: {
        async Recipe ({store, params}) {
            if (params.id && store.state.query) {
                var requestObj = {
                    "operationName": null,
                    "query": "{recipe(query: \"" + store.state.query + "\", id: \"" + params.id + "\") {id title thumbnail previewText}}",
                    "variables": {}
                };
    
                return await fetch(CONSTANTS.API_URL, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestObj)
                }).then((response) => response.json())
                .then((response) => {
                    return response.data.recipe;
                }).catch((_err) => {
                    return undefined;
                });
            } else {
                return undefined;
            }
        },
        async Recipes (query) {
            var requestObj = {
                "operationName": null,
                "query": "{recipes(query: \"" + query + "\") {id title thumbnail previewText}}",
                "variables": {}
            }
    
            return await fetch(CONSTANTS.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestObj)
            }).then((response) => response.json())
            .then((response) => {
                return response.data.recipes;
            }).catch((_err) => {
                return undefined;
            });
        }
    }
}