<template>
    <div class="character">
        <div class="img"
        :style="{
            'background-image': `url(${ character?.image })`,
        }"
        ></div>
        <div class="info">
            <h1>{{ character?.name }}</h1>
        <h2>{{ character?.species }}</h2>
        <h3>{{ character?.location.name }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ICharacter from '@/models/characterModel'

    const {id} = useRoute().params
    const character = ref<ICharacter>()
    const url = 'https://rickandmortyapi.com/api/character/'

    const fetchPerson = async () => {
        character.value = await $fetch(url+String(id)) 
        console.log(character.value); 
    }

    onMounted(() => {
        fetchPerson()
    })
</script>

<style lang="scss" scoped>
    .character{
        height: 500px;
        width: 300px;
        margin: 100px auto;
        border-radius: 20px;
        background-color: white;
        overflow: hidden;
        .img{
            height: 300px;
            width: 100%;
            background-color: white;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .info{
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
        }
    }
</style>