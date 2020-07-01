<template>
    <section class="recipes">
        <Recipe v-for="recipe in recipes" :key="recipe.id"
        :thumbnail="(recipe.thumbnail || recipe.image)"
        :title="recipe.title || recipe.label"
        :previewText="recipe.previewText || recipe.source"
        :id="recipe.id" />
    </section>
</template>

<script>
    import Recipe from '@/components/Recipe'

    export default {
        components: {
            Recipe
        },
        asyncData() {
            // https://rapidapi.com/category/Food
            // return new Promise((resolve, reject) => {
            //     setTimeout(()=>{
            //         resolve({
            //             recipes: [{
            //                     id:1,
            //                     title:"Brigadeiro Async",
            //                     previewText:"Inhame",
            //                     thumbnail: ""
            //                 },{
            //                     id:2,
            //                     title:"Brigadeiro 2",
            //                     previewText:":3",
            //                     thumbnail: "https://i.pinimg.com/474x/1a/58/6f/1a586f2cc1bfe1e3adf83aeb3233a759.jpg"
            //                 }
            //             ]
            //         })
            //     }, 2000)
            // });
            return new Promise((resolve, reject) => {
                // return axios.get()
                fetch("https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=apple")
                .then((response)=> response.json())
                .then((data)=>{
                    var recipes = data.hits.map((obj, index) => {
                        obj.recipe.id = index;
                        return obj.recipe;
                    });
                    resolve({
                        recipes: recipes
                    })
                })
                .catch((error)=>{
                    console.log(error)
                })
            });
        }
    }
</script>

<style scoped>
.recipes {
    display: flex;
    flex-flow: row wrap;
}
</style>
