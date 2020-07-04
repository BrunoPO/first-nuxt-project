const {getUrl, requisition, updateRecipes} = require('../../helpers/helpers');

module.exports = {
    recipes: (_context, {query}) => {
        const urlOri = "https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9";
        url = getUrl(urlOri, ["q", query]);

        return requisition(url).then(data => {
            var response = [];
            if (data.count) {
                response = data.hits;
            }
            return updateRecipes(response);
        });
    },
    recipe: (_context, {query, id}) => {
        const urlOri = "https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9";
        url = getUrl(urlOri, ["q", query, "from", id, "to", Number(id) + 1]);
        return requisition(url).then(data => {
            if (data.count) {
                var response = updateRecipes(data.hits);
                if (response.length) {
                    var recipe = response[0];
                    recipe.id = id;
                    return recipe;
                }
            }
            return undefined;
        });
    }
}
