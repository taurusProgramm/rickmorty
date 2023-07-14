<template>
    <div class="card">
        <div class="img"
        :style="{
            'background-image': `url(${ imgUrl })`,
        }"
        ></div>
        <div class="info">
            <div class="name"> <h1>{{ name }}</h1> </div>
            <div class="species"> <h3>{{ species }}</h3> </div>
            <div class="episode"> Episodes: 
                <span v-for="episode in episodes" :key="episode.id"> {{ episode.id }}. {{ episode.name }}</span>    
            </div>
        </div>
    </div>
</template>

<script setup >
const props = defineProps({
    name: String,
    species: String,
    imgUrl: String,
    episodes: Array
})
</script>

<style lang="scss" scoped>
  .card{
    height: 200px;
    width: 700px;
    border-radius: 15px;
    background-color: white;
    margin: 30px auto 0;
    padding: 20px;
    display: flex;
    gap: 30px;
    .img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        background-color: antiquewhite;
        cursor: pointer;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .info{
        padding: 10px;
        height: 150px;
        width: 450px;
        // background-color: antiquewhite;
        display: flex;
        flex-direction: column;
        align-items: center;
        // gap: 10px;
        justify-content: space-between;
        .name{
            cursor: pointer;
            h1:hover{
                text-decoration: underline;
            }
        }
        .episode{
            align-self: self-start;
            span{
                margin-right: 10px;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
  }
  
</style>