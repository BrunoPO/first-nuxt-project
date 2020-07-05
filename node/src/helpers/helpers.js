const axios = require('axios');

function getUrl(url, ...args) {
  let newURL = url;
  args[0].forEach((curr, index) => {
    if (index % 2 === 0) {
      newURL += `&${curr}=`;
    } else {
      newURL += curr;
    }
  });
  return newURL;
}

function requisition(url) {
  return axios.get(url)
    .then((response) => response.data).catch((error) => error);
}

function updateRecipes(hits, idx) {
  const inicialIndex = idx || 0;
  return hits.map((obj, index) => {
    const oriRecipe = obj.recipe;
    const [originalID, query] = oriRecipe.shareAs.match(/(?<=recipe\/).*/g)[0].split('/');
    oriRecipe.index = index + inicialIndex;
    oriRecipe.id = [oriRecipe.index, originalID, query].join('|');
    oriRecipe.thumbnail = oriRecipe.image;
    oriRecipe.previewText = oriRecipe.source;
    oriRecipe.title = oriRecipe.label;
    return oriRecipe;
  });
}

module.exports = {
  getUrl,
  requisition,
  updateRecipes,
};
