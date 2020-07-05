<template>
    <section class="single-recipe">
        <h1>{{recipe.title}} </h1>
        <div>
            <img :src="recipe.thumbnail" alt=""/>
        </div>
        <p>{{recipe.previewText}}</p>
    </section>
</template>

<style scoped>
    .single-recipe {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 30px;
    }
</style>

<script>
    export default {
        async asyncData ({store, params, redirect}) {
            if (params.id && store.state.query) {
                var requestObj = {
                    "operationName": null,
                    "query": "{recipe(query: \"" + store.state.query + "\", id: \"" + params.id + "\") {id title thumbnail previewText}}",
                    "variables": {}
                };
                return await fetch("http://localhost:4000", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestObj)
                }).then((response) => response.json())
                .then((response) => {
                    return {recipe: response.data.recipe};
                }).catch((err) => {
                    return {recipe: {}};
                });
            } else {
                redirect('/recipes');
            }
        }
    }
</script>