const {getUrl, requisition, updateRecipes} = require('../../helpers/helpers');
const searchRecipesUrl = "https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9";

module.exports = {
    recipes: (_context, { query, from, pageSize }) => {
        var initialPage = 0;
        var UrlParams = ["q", query];

        if (typeof from == "number") {
            UrlParams.push("from");
            UrlParams.push(from);
            initialPage = from;
        }

        if (typeof pageSize == "number") {
            UrlParams.push("to");
            UrlParams.push(initialPage + pageSize);
        }

        url = getUrl(searchRecipesUrl, UrlParams);

        return requisition(url).then(data => {
            var response = [];
            if (data.count) {
                response = data.hits;
            }
            return updateRecipes(response, initialPage);
        });
    },
    recipe: (_context, {query, id}) => {
        url = getUrl(searchRecipesUrl, ["q", query, "from", id, "to", Number(id) + 1]);
        return requisition(url).then(data => {
            if (data.count) {
                var response = updateRecipes(data.hits, id);
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
