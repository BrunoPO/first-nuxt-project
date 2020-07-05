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
    import requests from '@/helpers/requests';

    export default {
        async asyncData ({store, params, redirect}) {
            var recipe = await requests.get.Recipe({store, params});

            if (recipe) {
                return {recipe}
            } else {
                redirect('/recipes');
            }
        }
    }
</script>