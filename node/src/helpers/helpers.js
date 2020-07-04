const axios = require('axios');

function getUrl(url, ...args) {
    args[0].forEach((curr, index) => {
        if (index % 2 == 0) {
        url += "&" + curr + "="
        } else {
        url += curr
        }
    });
    return url;
}

function requisition(url) {
    return axios.get(url)
    .then(response => {
        return response.data;
    }).catch(error => {
        return error;
    });
}

function updateRecipes(hits) {
    return hits.map((obj, index) => {
        var oriRecipe = obj.recipe;
        oriRecipe.id = index;
        oriRecipe.thumbnail = oriRecipe.image;
        oriRecipe.previewText = oriRecipe.source;
        oriRecipe.title = oriRecipe.label
        return oriRecipe;
    });
}

module.exports = {
    getUrl: getUrl,
    requisition: requisition,
    updateRecipes: updateRecipes
}
