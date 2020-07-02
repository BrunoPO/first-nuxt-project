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
        asyncData({params, store}) {
            return new Promise((resolve, reject) => {
                try {
                    if (store.state.recipes.length < params.id) {
                        store.dispatch('searchRecipes', {callback: (data) => {
                            resolve({
                                recipe: store.state.recipes[params.id]
                            })
                        }});
                    } else {
                        resolve({
                            recipe: store.state.recipes[params.id]
                        })
                    }
                } catch (err) {
                    reject(err)
                }
            });
        }
    }
</script>