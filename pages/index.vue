<template>
    <div class="wrapper">
        <div v-for="(character, i) in characters" :key="character.id">
            <TheCharacterCard 
            :name="character.name"
            :species="character.species"
            :img-url="character.image"
            :episodes="episodes[i]"
            />
        </div>
        <div ref="observer" class="observer"></div>
    </div>
</template>

<script setup lang="ts">
    import ICharacter from '@/models/characterModel'
    import IPageResponse from '@/models/pageResponse'
    import IEpisode from '@/models/episodeModel'

    const characters = ref<ICharacter[]>([])
    const episodes = ref<IEpisode[][]>([])
    const page = ref(1)
    const observer = ref()
    
    const urlCharacters = `https://rickandmortyapi.com/api/character?page=`

    const fetchCharacters = async () => {
        const res = await $fetch(urlCharacters + String(page.value)) as IPageResponse
        characters.value = res.results 
        for (let character of characters.value){
            character.episode = character.episode.slice(0, 5) 
            let requests = character.episode.map(item => $fetch(item))
            let responses = await Promise.all(requests) as IEpisode[]
            episodes.value.push(responses)
        }
    }

    const fetchMoreCharacters = async () => {
        page.value = page.value + 1
        const res = await $fetch(urlCharacters + String(page.value)) as IPageResponse
        characters.value = [...characters.value, ...res.results] 
        for (let character of characters.value){
            character.episode = character.episode.slice(0, 5) 
            let requests = character.episode.map(item => $fetch(item))
            let responses = await Promise.all(requests) as IEpisode[]
            episodes.value = [...episodes.value, responses]
        }
    }

    
    onMounted(()=>{
        fetchCharacters()
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = function(entries:any, observer:any) {
            if(entries[0].isIntersecting){
                fetchMoreCharacters()
                console.log('Пересёк'); 
            }
        };
        const intersectionObserver = new IntersectionObserver(callback, options);
        intersectionObserver.observe(observer.value)
    })
</script>

<style lang="scss" scoped>
    .wrapper{
        .observer{
            height: 30px;
            width: auto;
            background-color: transparent;
        }
    }
</style>