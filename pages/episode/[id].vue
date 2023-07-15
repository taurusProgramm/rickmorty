<template>
    <div class="episode">
        <div class="info">
            <h2>Episode {{ episode?.id }}: {{ episode?.name }}</h2>
            <h3>Air date: {{ episode?.air_date }}</h3>
        </div>
        <hr>
        <h3 style="margin-top: 20px;">List of characters: </h3>
        <div class="characters-grid">
            <div class="character-img" 
            v-for="character of characters"
            :key="character.id"
            :style="{
            'background-image': `url(${ character?.image })`,
            }" 
            @click="handleRouting(character.id)" 
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import IEpisode from '@/models/episodeModel'
    import ICharacter from '@/models/characterModel'

    const {id} = useRoute().params
    const router = useRouter();
    const episode = ref<IEpisode>()
    const characters = ref<ICharacter[]>([])

    const url = 'https://rickandmortyapi.com/api/episode/'

    const fetchEpisode = async () => {
        episode.value = await $fetch(url + String(id))
        let requests = episode.value!.characters.map(link => $fetch(link))
        characters.value = await Promise.all(requests) as ICharacter[]
    }
    fetchEpisode()

    const handleRouting = (id: number) => {
        router.push(`/character/${id}`)
    }

</script>

<style lang="scss" scoped>
    .episode{
        margin: 50px auto;
        width: 600px;
        min-height: 300px;
        background-color: white;
        padding: 30px;
        .info{
            display: flex;
            justify-content: space-between;
        }
        .characters-grid{
            margin-top: 15px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            .character-img{
                height: 100px;
                width: 100px;
                cursor: pointer;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }

</style>