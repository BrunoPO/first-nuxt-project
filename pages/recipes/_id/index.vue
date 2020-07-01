<template>
    <section class="single-recipe">
        <h1>{{recipe.title || recipe.label}} </h1>
        <div>
            <img :src="recipe.thumbnail || recipe.image" alt=""/>
        </div>
        <p>{{recipe.previewText || recipe.source}}</p>
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
//{{$route.params.id}}
    export default {
        asyncData(context) {
            // return new Promise((resolve, reject) => {
            //     setTimeout(()=>{
            //         resolve({
            //             recipe: [{
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
            //             ].find(el => el.id == context.params.id)
            //         })
            //     }, 2000)
            // });
            return new Promise((resolve, reject) => {
                // return axios.get()
                fetch("https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=apple")
                .then((response)=> response.json())
                .then((data)=>{
                    var recipe = data.hits[context.params.id].recipe;
                    console.log(recipe);
                    resolve({
                        recipe: recipe
                    })
                })
                .catch((error)=>{
                    console.log(error)
                })
            });
        }
    }
</script>